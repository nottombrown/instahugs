$(function(){ 
    
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
    
    var smileTemplate = $(".smile-container");
    smileTemplate.hide();    
    

    
    function newSmile(newShortcode){
        var smile = smileTemplate.clone().show();  
        
        var url = "http://instagr.am/p/BUG/media/?size=m"
        
        smile.find(".instagram").attr("src", "temp")               
        
        smile.appendTo($("#container"));
    }  
    function replaceSmile(oldSmile, newShortcode){
        
    }                                                  

    // Initialize width 
    var rows = 5;
    var cols = 3;
    
    var count = 0;
    for (i=1;i<=rows;i++){
        for (j=1;j<=cols;j++){     
            count++;
            newSmile();    
            console.log(shortcodes[count])
        }
    }




}); 