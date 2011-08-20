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
    
    
    var nextTestImageURL = function(){
        var ids = new Array(
        "0177999275864b738b0900467ab4854f_6.jpg",
        "1940257519af4e84ae5a6cf238b83399_6.jpg",
        "3814e316b24a4f2e8e4ce2db9755405d_6.jpg",
        "584c3608c5584234a5508feb2065bc3f_6.jpg",
        "6df619f09fcb4a82af6fe5bee26442b4_6.jpg",
        "7ce6a52e69a148068d64698729d67aef_6.jpg",
        "81e127db17ac48e291d3fb55ac0a328e_6.jpg",
        "84fad70390d240358b8f6f5578fb7de0_6.jpg",
        "85863241a0bc40c98671e9ee228b03c0_6.jpg",
        "9f1b4f9fea6045fbb0727ef34cce087f_6.jpg",
        "9f7d108a20c8423585acd54dc86032fc_6.jpg",
        "a13da792a947405497d18fcaf97f0eff_6.jpg",
        "ac52584677754c50bea568a463d30c0e_6.jpg",
        "b69713faed9b49fbaec974465b5861ba_6.jpg",
        "bb15f21b90e44cccbfc6314522575a59_6.jpg",
        "cb0787f14961455c8340f4418e562c62_6.jpg",
        "d295795efa0d4ae9835c7659b5700ce3_6.jpg",
        "d4fcfb5b6e9a4730bcabc4e6d21e16a2_6.jpg",
        "f044a23e004848748dfd6b5fde3170f0_6.jpg");                   
        var _index = 0; 
        
        return function(){
            var url = "static/test_images/" + ids[_index];
            // var url = "http://instagr.am/p/"+ids[_index]+"/media/?size=m";
            _index++;
            return url
        }
    }(); 
    
    
    
    // set up click/tap panels
           

    var smileTemplate = $(".smile-container").clone();
    var panelTemplate = $(".panel").clone();
    $(".smile-container").remove(); 
    $(".panel").remove();    

        
    
    function newSmile(newShortcode){          
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
    function replaceSmile(oldSmile, newShortcode){
        
    }                                                  

    // Initialize width 
    var rows = 5;
    var cols = 3;
                    
    for (i=1;i<=rows;i++){
        for (j=1;j<=cols;j++){     
            newSmile();    
            
        }
    }




}); 