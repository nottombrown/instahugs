import os
import logging

from pyramid.config import Configurator
from pyramid.events import NewRequest
from pyramid.events import subscriber
from pyramid.events import ApplicationCreated
from pyramid.httpexceptions import HTTPFound
from pyramid.session import UnencryptedCookieSessionFactoryConfig
from pyramid.view import view_config
   
import json    
import urllib2

from paste.httpserver import serve
import sqlite3                      




logging.basicConfig()
log = logging.getLogger(__file__)

here = os.path.dirname(os.path.abspath(__file__))

# views
@view_config(route_name="get_hugs", renderer="json")
def get_hugs_view(request):
    rs = request.db.execute("select id, shortcode from hugs")
    hugs = [row[1] for row in rs.fetchall()]
    return hugs
  
@view_config(route_name="hugs", renderer="hugs.mako")
def hugs_view(request): 
    # For now we 
    rs = request.db.execute("select id, shortcode from hugs")
    shortcodes = [row[1] for row in rs.fetchall()]
    return {"shortcodes":str(shortcodes)}    

next_max_tag_id = 48122924    
@view_config(route_name="fetch_hugs", renderer="string")
def fetch_hugs(request):
    global next_max_tag_id
    url = "https://api.instagram.com/v1/tags/hug/media/recent?client_id=164413c65ebe413ebba621192521154e&max_tag_id=%s" % next_max_tag_id
    f = urllib2.urlopen(url)  
    jsonobjs = json.loads(f.read())  
    next_max_tag_id = jsonobjs["pagination"]["next_max_tag_id"]  
    
    shortcodes = []
    for obj in jsonobjs["data"]:
        link = obj["link"]      
        try:
            shortcode = link.split("/")[-2]   
            request.db.execute("insert into hugs (shortcode, tag) values (?, ?)",
                               [shortcode, "hug"])
            request.db.commit()  
            shortcodes.append(shortcode)
        except:
            pass
        
    return "next_max: %s   ----    added: %s" %(next_max_tag_id, shortcodes)
    


@view_config(route_name="add_hug", renderer="string")
def add_hug_view(request):    
    if request.method == "GET":   
        # GET sends the challenge               
        """http://localhost:8080/add_hug?hub.mode=subscribe&hub.challenge=15f7d1a91c1f40f8a748fd134752feb3&hub.verify_token=myVerifyToken"""
        # Echo back the challenge when pinged  
        challenge = request.str_GET["hub.challenge"]
        return challenge  
        
    if request.method == "POST": 
        
        pass
                                          


@view_config(route_name="close")
def close_view(request):
    task_id = int(request.matchdict["id"])
    request.db.execute("update tasks set closed = ? where id = ?", (1, task_id))
    request.db.commit()
    request.session.flash("Task was successfully closed!")
    return HTTPFound(location=request.route_url("list"))

@view_config(context="pyramid.exceptions.NotFound", renderer="notfound.mako")
def notfound_view(self):
    return {}

# subscribers
@subscriber(NewRequest)
def new_request_subscriber(event):
    request = event.request
    settings = request.registry.settings
    request.db = sqlite3.connect(settings["db"])
    request.add_finished_callback(close_db_connection)

def close_db_connection(request):
    request.db.close()
    
@subscriber(ApplicationCreated)
def application_created_subscriber(event):
    log.warn("Initializing database...")
    f = open(os.path.join(here, "schema.sql"), "r")
    stmt = f.read()
    settings = event.app.registry.settings
    db = sqlite3.connect(settings["db"])
    db.executescript(stmt)
    db.commit()
    f.close()

if __name__ == "__main__":
    # configuration settings
    settings = {}
    settings["reload_all"] = True
    settings["debug_all"] = True
    settings["mako.directories"] = os.path.join(here, "templates")
    settings["db"] = os.path.join(here, "hugs.db")
    # session factory
    session_factory = UnencryptedCookieSessionFactoryConfig("itsaseekreet")
    # configuration setup
    config = Configurator(settings=settings, session_factory=session_factory)
    # routes setup
    config.add_route("hugs", "/")           
    config.add_route("get_hugs", "/get_hugs") 
    config.add_route("add_hug", "/add_hug") 
    config.add_route("fetch_hugs", "/fetch_hugs")     
    # static view setup
    config.add_static_view("static", os.path.join(here, "static"))
    # scan for @view_config and @subscriber decorators
    config.scan()
    # serve app
    app = config.make_wsgi_app()
    serve(app, host="0.0.0.0")