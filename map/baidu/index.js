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
    var locarray = ["两江新区水土高新园云汉大道277号的产业园 location",
"黄石市大冶市汪仁镇黄金山开发区百花村 location",
"内蒙古大兴安岭汗马国家级自然保护区 location",
"内蒙古大兴安岭汗马国家级自然保护区森林火场 location",
"内蒙古大兴安岭汗马国家级自然保护区 location",
"钱江2幢1单元1802室 location",
"高雄小港机场外海西侧44海里处 location",
"澎湖马公西南5海里处 location",
"新北市瑞芳区滴水子路五分山登山步道 location",
"新北市瑞芳区滴水子路五分山登山步道 location",
"新北五分山登山步道 location",
"香港特区立法会综合大楼2楼立法会1号会议室 location",
"达州市通川区塔石路塔沱市场负一楼 location",
"西安市长安区南长安街地铁2号线韦曲南站东南角 location",
"巴西东南海域桑托斯盆地盐 location",
"台北市信义商圈新光三越百货 location"]

  var newsarray = [


  ]
    
    // 将地址解析结果显示在地图上,并调整地图视野
    for (var index in locarray) {
        myGeo.getPoint(locarray[index], function(point){
        if (point) {
            map.centerAndZoom(point, 5);
            map.addOverlay(new BMap.Marker(point));
        }else{
            alert("您选择地址没有解析到结果!");
        }
        }, "北京市");
    }
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

   
