$(function(){  
    
    
    // Models
    window.Panel = Backbone.Model.extend({
        
        defaults: function(){
            return {
                flipped: false,
            };
        },
        
        toggle: function(){
            this.save({flipped: !this.get("flipped")});
        },
        
    });
    
    
    // Collections
    
    window.PanelList = Backbone.Collection.extend({
        
        model:Panel,
        
        localStorage: new Store("panels"),    
        
        flipped: function(){
            return this.filter(function(panel){ return panel.get("flipped"); })
        }   
    });
    
    
    // Global collection of Panels
    window.Panels = new PanelList;
    
    // Panel View
    
    window.PanelView = Backbone.View.extend({ 
        
        tagName: 'div',
        
        template: _.template($("#panel-template").html()),  
        
        events: {
            "click" : "toggle"
        },
        
        initialize: function(){
            this.model.bind("change", _.bind(this.render, this)); 
            $(this.el).html(this.template(this.model.toJSON()));
        },     
        
        render: function(){     
            var flipped = this.model.get("flipped")     
            if (flipped){
               $(this.el).children().addClass("flip"); 
            } else{
               $(this.el).children().removeClass("flip"); 
            }           
            return this   
        },
               
        toggle: function(){
            this.model.toggle(); 
        }
    });

    // Application View
    
    window.AppView = Backbone.View.extend({   
        
        el: $("#container"),      
        
        initialize: function(){      
            // make a number of panels   
            
            for (i=0; i<15; i+=1){
                Panels.create({flipped: false});    
            }
  
            this.addAll(); 
            
            
        },
        
        addOne: function(panel){
            var view = new PanelView({model: panel});
            $("#container").append(view.render().el);   
        },
        
        addAll: function(){
            Panels.each(this.addOne)
        }                                            
        
    });
     
    window.App = new AppView
    
    $("#panel-template").hide();
                        
   
 
    
});