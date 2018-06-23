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

var locarray = ["新闻标题:): 知乎工作地点"
,"北京市海淀区学院路甲 5 号 768 创意园 A 座 / B 座  "
,"新闻标题:): 知乎工作地点"
,"上海市徐汇区永嘉路 570 号 "
,"新闻标题:): 知乎工作地点"
,"广州市天河区体育东路 136 号金利来数码网络大厦 "
,"新闻标题:): 知乎工作地点"
,"四川省成都天府新区天府大道南段 888 号广都智库 "
, ]  
  var newsarray = [ "https://app.mokahr.com/apply/zhihu  "
,"https://app.mokahr.com/apply/zhihu  "
,"https://app.mokahr.com/apply/zhihu "
,"https://app.mokahr.com/apply/zhihu   ", ]  
  var titlearray = [ "新闻标题:): 知乎工作地点"
,"新闻标题:): 知乎工作地点"
,"新闻标题:): 知乎工作地点"
,"新闻标题:): 知乎工作地点"
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
            var marker = new BMap.Marker(new BMap.Point(113.53573055555556,22.1806));  // 创建标注
            map.addOverlay(marker);
            marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            var title = titlearray[locarray.indexOf(item)];
            var textwithlinkContent = "<div class='BMap_bubble_title' style='overflow: hidden; height: auto; line-height: 24px; width: auto;''>"+
                            "<p style='width:210px;font:bold 14px/16px arial,sans-serif;margin:5px;color:#cc5522;white-space:normal;overflow:hidden' title='aa'>"+
                            title+"<a target='_blank' href='"+
                            newsarray[locarray.indexOf(item)]+
                            "' style='margin-right:5px;font-size:12px;color:#3d6dcc;font-weight:normal;text-decoration:none;'>"+
                            "详情»"+"</a></p></div>"
            var picContent = "<div class='BMap_bubble_title' style='overflow: hidden; height: auto; line-height: 24px; width: auto;''>"+
            "<img style='float:right;margin:4px' id='imgDemo' src='https://ws2.sinaimg.cn/large/006tNc79gy1fskvdloac0j31kw0w0dqj.jpg' swidth='139' height='104' title='天安门'/>"+
            "</div>";

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

   
