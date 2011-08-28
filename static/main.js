var shortcodes
var hugTemplate
var panelTemplate   
var _nextImage;   
    
var nextImage = function(){  
    // Get next image, prepare the subsequent one
    toReturn = _nextImage.show();
    _nextImage = "test"
    return toReturn;
};   
 
 
var nextTestImageURL = function(){      
    // we keep a buffer of 50 total hugs
    // replenish the buffer when it goes below 25
    var _index = 0; 
    
    return function(){                                           
        var url = "http://instagr.am/p/"+shortcodes[_index]+"/media/?size=m";
        _index++;
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
            newHug();    
        
        }
    }                  
}     

function newHug(newShortcode){            
    
    var panel = panelTemplate.clone().show();    
    var url = nextTestImageURL() 
    
    panel.find(".instagram").attr("src", url) 
    
    console.log(panel)
    // Bind to on toggle              
    panel.toggle(function(){   
        that = this;
         
        // Add new image
        // console.log($(this));
        // $(this).find(".back").append(nextImage());     
        
        // Flip the tile   
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

$(function(){ 
    // set up click/tap panels   
    $.get("get_hugs", function(data){  
        shortcodes = data;  
        initialize()   
        // _nextImage = $("body").append("<img class='instagram' src='" + nextTestImageURL() + "'>"); 
       
    });
});

 