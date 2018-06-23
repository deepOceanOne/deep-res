// for interacting with json files 
    // var jsonfile = require('jsonfile');
 // 百度地图API功能
    var map = new BMap.Map("newsmap");
    var point = new BMap.Point(116.331398,39.897445);
    map.centerAndZoom(point,8);
    // 添加部分控件
    map.addControl(new BMap.NavigationControl());    
	map.addControl(new BMap.ScaleControl());    
	map.addControl(new BMap.OverviewMapControl());    
	map.addControl(new BMap.MapTypeControl());  
	// 添加缩略图
	var overView = new BMap.OverviewMapControl();
	var overViewOpen = new BMap.OverviewMapControl({isOpen:true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT});
	map.addControl(overView);  
	map.addControl(overViewOpen);       
    // 创建地址解析器实例
    var myGeo = new BMap.Geocoder();
    // 载入json新闻数据?
    // 使用数组形式，由python代码产生此格式数组

var locarray = ["新闻标题:): äºåæ¯è°·åçæ³¥ç³æµç¾å®³ ç´§æ¥è½¬ç§»97äºº(å¾)|äºå|æ¯è°·|æ³¥ç³æµ_æ°æµªæ°é» "
,"凤山镇平寨村那肖田村民小组 "
,"新闻标题:): åäº¬å¸åæ¹å§:é¦é½âå¤§ä¸ç¯âæ¬æåºå·å¤éè½¦æ¡ä»¶|åæ¹å§|äº¬æ´¥å|é¦é½_æ°æµªæ°é» "
,"北京市大兴区采育镇韩营村南侧市界 "
,"新闻标题:): åäº¬å¸åæ¹å§:é¦é½âå¤§ä¸ç¯âæ¬æåºå·å¤éè½¦æ¡ä»¶|åæ¹å§|äº¬æ´¥å|é¦é½_æ°æµªæ°é» "
,"北京市通州区西集镇赵庄村北侧市界 "
,"新闻标题:): åå¼ºéé¨å½±å 210å½éæ±ä¸­æ®µ3000æ¹å¬è·¯æ¤å¡å®å¡|æ¤å¡|æ±ä¸­|å½é_æ°æµªæ°é» "
,"汉中市公路局镇巴公路段 "
,"新闻标题:): ä¸­å½åæåè¢«ç¯ä¸?ååæåé±åå°é£é©åºè­¦æ|åæ|åæå¯¼èª|äº§ä¸å­_æ°æµªæ°é» "
,"两江新区水土高新园云汉大道277号的产业园 "
,"新闻标题:): æ¹åä¸è¯åæ³æ¼å«ç¡«æ°ä½ 63äººèµ´å»æå­©å­èºé¨ææ|ç¾è±æ|ä¸æ|è¯ä¸_æ°æµªæ°é» "
,"黄石市大冶市汪仁镇黄金山开发区百花村 "
, ]  
  var newsarray = [ "http://news.sina.com.cn/c/nd/2018-06-20/doc-ihefphqk4312753.shtml "
,"http://news.sina.com.cn/o/2018-06-20/doc-ihefphqk2710207.shtml "
,"http://news.sina.com.cn/o/2018-06-20/doc-ihefphqk2710207.shtml "
,"http://news.sina.com.cn/c/nd/2018-06-20/doc-ihefphqk2306345.shtml "
,"http://news.sina.com.cn/c/nd/2018-06-15/doc-ihcyszrz4061710.shtml "
,"http://news.sina.com.cn/c/nd/2018-06-14/doc-ihcwpcmq5458403.shtml ", ]  
  var titlearray = [ "新闻标题:): äºåæ¯è°·åçæ³¥ç³æµç¾å®³ ç´§æ¥è½¬ç§»97äºº(å¾)|äºå|æ¯è°·|æ³¥ç³æµ_æ°æµªæ°é» "
,"新闻标题:): åäº¬å¸åæ¹å§:é¦é½âå¤§ä¸ç¯âæ¬æåºå·å¤éè½¦æ¡ä»¶|åæ¹å§|äº¬æ´¥å|é¦é½_æ°æµªæ°é» "
,"新闻标题:): åäº¬å¸åæ¹å§:é¦é½âå¤§ä¸ç¯âæ¬æåºå·å¤éè½¦æ¡ä»¶|åæ¹å§|äº¬æ´¥å|é¦é½_æ°æµªæ°é» "
,"新闻标题:): åå¼ºéé¨å½±å 210å½éæ±ä¸­æ®µ3000æ¹å¬è·¯æ¤å¡å®å¡|æ¤å¡|æ±ä¸­|å½é_æ°æµªæ°é» "
,"新闻标题:): ä¸­å½åæåè¢«ç¯ä¸?ååæåé±åå°é£é©åºè­¦æ|åæ|åæå¯¼èª|äº§ä¸å­_æ°æµªæ°é» "
,"新闻标题:): æ¹åä¸è¯åæ³æ¼å«ç¡«æ°ä½ 63äººèµ´å»æå­©å­èºé¨ææ|ç¾è±æ|ä¸æ|è¯ä¸_æ°æµªæ°é» "
, ] 

    // 基于地理位置的地图应用
    /*
    var geolocation = new BMap.Geolocation();
    // 开启SDK辅助定位
    function myFun(result){
    var cityName = result.name;
    map.setCenter(cityName);
     // alert("当前定位城市:"+cityName);
    }
    var myCity = new BMap.LocalCity();
    myCity.get(myFun); 
    */


    var pointarray = new Array(locarray.length);
    
    // 将地址解析结果显示在地图上,并调整地图视野
    locarray.forEach(function(item){
        myGeo.getPoint(item, function(point){
        if (point) {
            map.centerAndZoom(point, 5);
            var marker = new BMap.Marker(point);  // 创建标注
            map.addOverlay(marker);
            marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            var title = titlearray[locarray.indexOf(item)];
            var textwithlinkContent = "<div class='BMap_bubble_title' style='overflow: hidden; height: auto; line-height: 24px; width: auto;''>"+
                            "<p style='width:210px;font:bold 14px/16px arial,sans-serif;margin:5px;color:#cc5522;white-space:normal;overflow:hidden' title='aa'>"+
                            title+"<a target='_blank' href='"+
                            newsarray[locarray.indexOf(item)]+
                            "' style='margin-right:5px;font-size:12px;color:#3d6dcc;font-weight:normal;text-decoration:none;'>"+
                            "详情»"+"</a></p></div>"

            var infoWindow = new BMap.InfoWindow(textwithlinkContent);  // 创建信息窗口对象
            marker.addEventListener("click", function(){          
                 map.openInfoWindow(infoWindow,point); //开启信息窗口
                // window.location = newsarray[locarray.indexOf(item)];
            });
        }else{
            // alert("您选择地址没有解析到结果!");
        }
        }, "北京市");
    });




    /*
    myGeo.getPoint("长江扬中孢子洲", function(point){
        if (point) {
            map.centerAndZoom(point, 5);
            map.addOverlay(new BMap.Marker(point));
        }else{
            alert("您选择地址没有解析到结果!");
        }
    }, "北京市");

    myGeo.getPoint("青岛市崂山区东海路", function(point){
        if (point) {
            map.centerAndZoom(point, 5);
            map.addOverlay(new BMap.Marker(point));
        }else{
            alert("您选择地址没有解析到结果!");
        }
    }, "青岛市");

      myGeo.getPoint("河南省开封市鼓楼区仙人庄乡", function(point){
        if (point) {
            map.centerAndZoom(point, 5);
            map.addOverlay(new BMap.Marker(point));
        }else{
            alert("您选择地址没有解析到结果!");
        }
    }, "开封市");


     myGeo.getPoint("两江新区北斗导航产业园", function(point){
        if (point) {
            map.centerAndZoom(point, 5);
            map.addOverlay(new BMap.Marker(point));
        }else{
            alert("您选择地址没有解析到结果!");
        }
    }, "重庆市");
    */  

   
