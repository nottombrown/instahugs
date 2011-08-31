var shortcodes
var hugTemplate
var panelTemplate   

var nextTestImageURL = function(){                    
    var _index = 0;    
    return function(){       
        var _index = Math.floor(Math.random() * shortcodes.length )  
        var url = "http://instagr.am/p/"+shortcodes[_index]+"/media/?size=m";     
        return url
    }
}();   

var initialize = function(){
    // Initialize width 
    var rows = 5;
    var cols = 3;
     
    hugTemplate = $(".hug-container").clone();
    panelTemplate = $(".panel").clone();
    $(".hug-container").remove(); 
    $(".panel").remove();    
                      
    for (i=1;i<=rows;i++){
        for (j=1;j<=cols;j++){     
            initializeNewHug();    
        
        }
    } 
    
    panels = $("#container .panel")
    
    setTimeout(function(){
        $.each(panels, function(i, panel){  
            
            addInstagram($(panel).find(".back .instagram"));   
            // Bind to on toggle      
         
        });                  
    }, 2000);
                            
}     
  
function addInstagram(elt){
    $(elt).attr("src", nextTestImageURL());
}

function initializeNewHug(newShortcode){            
    
    var panel = panelTemplate.clone().show();    
    
    addInstagram($(panel).find(".front .instagram"));
    panel.appendTo($("#container"));  
    
    
       

   $(panel).toggle(function(){  
       // Flip to back  

       // Flip the tile   
		$(this).addClass('flipping').addClass('flip');  
		that = this;    
		setTimeout(function(){
                $(that).removeClass("flipping"); 
                // addInstagram($(panel).find(".front .instagram")) 
          },400);         
	},function(){ 
	    // Flip to front


		$(this).addClass('flipping').removeClass('flip');  
		that = this;   
		setTimeout(function(){
                $(that).removeClass("flipping");   
                // $(panel).find(".back .instagram").attr("src", nextTestImageURL())  
          },400);   
	});    
    
    
}  

$(function(){ 
    // set up click/tap panels   
    $.get("get_hugs", function(data){  
        shortcodes = data;  
        initialize();                                                                                    
       
    });
});

 