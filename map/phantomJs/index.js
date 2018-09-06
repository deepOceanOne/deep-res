 // a phantomjs example, saved as img
  var page = require('webpage').create();
  page.open("https://map.baidu.com", function(status) {
     if ( status === "success" ) {
         console.log(page.title); 
        // page.settings.userAgent='Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:48.0) Gecko/20100101 Firefox/48.0';
        page.settings.userAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.2 Safari/605.1.15';
        // page.settings.userAgent='Mozilla/5.0 (iPod; U; CPU like Mac OS X; en) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/3A101a Safari/419.3';
        // page.viewportSize = { width: 1024, height: 768 };
        
        //  console.log(page.event.key.A);
        /*
        page.event.key.foreach(function(keyvalue){
          console.log(keyvalue);
        })
        */

        page.sendEvent("mousedown",1, 1,'left');
         page.sendEvent("mouseup",1, 1,'left');

         for(var i=0;i<1000;i++){
          page.sendEvent('keypress', page.event.key.Down ,[null,null,0]);
         //page.sendEvent('keydown', page.event.key.Left ,[null,null,0]);
         // page.sendEvent('keyup', page.event.key.Left ,[null,null,0]);
       }
          sleep(4);
        // page.sendEvent('keyup', page.event.key.Right, null, null, );

/*
        page.paperSize = { format: 'A3', 
              orientation: 'portrait', 
              border: '1cm' };
*/
        page.render("baidumap.png");
     } else {
        console.log("Page failed to load."); 
     }
    phantom.exit(0);
 });