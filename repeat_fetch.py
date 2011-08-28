import urllib2
                                        
for i in xrange(400):
    url = "http://localhost:8080/fetch_hugs"
    f = urllib2.urlopen(url) 
    print f.read() 
    
    print i