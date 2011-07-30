$(function(){ 
    
    var nextShortcode = function(){
        var shortcodes = new Array("I3J6P",
        "I3Q1Y",
        "I3QOm",
        "I3PTL",
        "I3FCW",                    
        "I3ST-",
        "I3QUN",
        "I3QSi",
        "IxPf7",
        "I3QB3",
        "I3Pkq",
        "GKu-T",
        "I3Ku8",
        "I3FdC",
        "I3Hhp",
        "I24pE",
        "I26r8",
        "I2ZMH",
        "I23_Z",
        "I23cH");
        var _shortcodeIndex = 0; 
        
        return function(){
            sc = shortcodes[_shortcodeIndex];
            _shortcodeIndex++;
            return sc
        }
    }();  
    
    // set up click/tap panels
           

    var smileTemplate = $(".smile-container").clone();
    var panelTemplate = $(".panel").clone();
    $(".smile-container").remove(); 
    $(".panel").remove();    

        
    
    function newSmile(newShortcode){          
        var panel = panelTemplate.clone().show();  
        var url = "http://instagr.am/p/"+newShortcode+"/media/?size=m";      
        
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
    function replaceSmile(oldSmile, newShortcode){
        
    }                                                  

    // Initialize width 
    var rows = 5;
    var cols = 3;
                    
    for (i=1;i<=rows;i++){
        for (j=1;j<=cols;j++){     
            newSmile(nextShortcode());    
            
        }
    }




}); 