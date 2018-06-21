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


var locarray = ["高雄小港机场外海西侧44海里处 "
,"澎湖马公西南5海里处 "
,"达州市通川区塔石路塔沱市场负一楼 "
,"海南三亚南偏东770公里 "
,"大理线秭归K460+000路段 "
,"酒泉卫星发射中心雷达测量站 "
, ]  
  var newsarray = [ "http://news.sina.com.cn/c/gat/2018-06-04/doc-ihcmurvh6353863.shtml "
,"http://news.sina.com.cn/c/gat/2018-06-04/doc-ihcmurvh6353863.shtml "
,"http://news.sina.com.cn/c/nd/2018-06-03/doc-ihcmurvh0788283.shtml "
,"http://news.sina.com.cn/c/nd/2018-06-02/doc-ihcikcew8622131.shtml "
,"http://news.sina.com.cn/c/nd/2018-06-02/doc-ihcikcew7790227.shtml "
,"http://news.sina.com.cn/c/nd/2018-06-02/doc-ihcikcew7493002.shtml ", ] 

var titlearray = ["高雄小港机场外海西侧44海里处 "
,"澎湖马公西南5海里处 "
,"达州市通川区塔石路塔沱市场负一楼 "
,"海南三亚南偏东770公里 "
,"大理线秭归K460+000路段 "
,"酒泉卫星发射中心雷达测量站 "
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
            var sContent = "<div class='BMap_bubble_title' style='overflow: hidden; height: auto; line-height: 24px; width: auto;''>"+
                            "<p style='width:210px;font:bold 14px/16px arial,sans-serif;margin:5px;color:#cc5522;white-space:normal;overflow:hidden' title='aa'>"+
                            title+"<a target='_blank' href='"+
                            newsarray[locarray.indexOf(item)]+
                            "' style='margin-right:5px;font-size:12px;color:#3d6dcc;font-weight:normal;text-decoration:none;'>"+
                            "详情»"+"</a></p></div>"
            var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
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

   
