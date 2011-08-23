$(function(){ 
    

    
    
    
    // set up click/tap panels
           

    var hugTemplate = $(".hug-container").clone();
    var panelTemplate = $(".panel").clone();
    $(".hug-container").remove(); 
    $(".panel").remove();    

        
    
    function newHug(newShortcode){          
        var panel = panelTemplate.clone().show();    
        var url = nextTestImageURL() 
        
        panel.find(".instagram").attr("src", url)               
        panel.toggle(function(){  
            that = this;
    		$(this).addClass('flipping').addClass('flip');
    		setTimeout(function(){
                     $(that).removeClass("flipping");
               },400);         
    	},function(){
    		$(this).addClass('flipping').removeClass('flip');  
    		that = this;   
    		setTimeout(function(){
                     $(that).removeClass("flipping");
               },400);
    	});
        panel.appendTo($("#container"))
    }  
    function replaceHug(oldHug, newShortcode){
        
    }                                                  
    
    var initialize = function(){
        // Initialize width 
        var rows = 5;
        var cols = 3;
                    
        for (i=1;i<=rows;i++){
            for (j=1;j<=cols;j++){     
                newHug();    
            
            }
        }
    }     

    var nextTestImageURL = function(){  
        
        // we keep a buffer of 50 total hugs
        // replenish the buffer when it goes below 25
        var shortcodes
        $.get("get_hugs", function(data){   
            shortcodes = data;   
            initialize()
        });             
        var _index = 0; 
        
        return function(){                                           
            var url = "http://instagr.am/p/"+shortcodes[_index]+"/media/?size=m";
            _index++;
            return url
        }
    }();

}); 