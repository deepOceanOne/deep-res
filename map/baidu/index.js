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
var locarray = ["北京市大兴区采育镇韩营村南侧市界 "
,"北京市通州区西集镇赵庄村北侧市界 "
,"汉中市公路局镇巴公路段 "
,"两江新区水土高新园云汉大道277号的产业园 "
,"黄石市大冶市汪仁镇黄金山开发区百花村 "
,"内蒙古大兴安岭汗马国家级自然保护区 "
,"内蒙古大兴安岭汗马国家级自然保护区森林火场 "
,"内蒙古大兴安岭汗马国家级自然保护区 "
,"钱江2幢1单元1802室 "
,"高雄小港机场外海西侧44海里处 "
,"澎湖马公西南5海里处 "
,"新北市瑞芳区滴水子路五分山登山步道 "
,"新北市瑞芳区滴水子路五分山登山步道 "
,"新北五分山登山步道 "
,"香港特区立法会综合大楼2楼立法会1号会议室 "
,"达州市通川区塔石路塔沱市场负一楼 "
,"西安市长安区南长安街地铁2号线韦曲南站东南角 "
, ]  
  var newsarray = [ "http://news.sina.com.cn/o/2018-06-20/doc-ihefphqk2710207.shtml "
,"http://news.sina.com.cn/o/2018-06-20/doc-ihefphqk2710207.shtml "
,"http://news.sina.com.cn/c/nd/2018-06-20/doc-ihefphqk2306345.shtml "
,"http://news.sina.com.cn/c/nd/2018-06-15/doc-ihcyszrz4061710.shtml "
,"http://news.sina.com.cn/c/nd/2018-06-14/doc-ihcwpcmq5458403.shtml "
,"http://news.sina.com.cn/c/nd/2018-06-06/doc-ihcqccip2294130.shtml "
,"http://news.sina.com.cn/c/nd/2018-06-06/doc-ihcqccip2294130.shtml "
,"http://news.sina.com.cn/c/nd/2018-06-06/doc-ihcqccip2294130.shtml "
,"http://news.sina.com.cn/c/nd/2018-06-04/doc-ihcmurvh7146190.shtml "
,"http://news.sina.com.cn/c/gat/2018-06-04/doc-ihcmurvh6353863.shtml "
,"http://news.sina.com.cn/c/gat/2018-06-04/doc-ihcmurvh6353863.shtml "
,"http://news.sina.com.cn/c/gat/2018-06-04/doc-ihcmurvh5768336.shtml "
,"http://news.sina.com.cn/c/gat/2018-06-04/doc-ihcmurvh5768336.shtml "
,"http://news.sina.com.cn/c/gat/2018-06-04/doc-ihcmurvh5768336.shtml "
,"http://news.sina.com.cn/o/2018-06-04/doc-ihcmurvh5319095.shtml "
,"http://news.sina.com.cn/c/nd/2018-06-03/doc-ihcmurvh0788283.shtml "
,"http://news.sina.com.cn/c/nd/2018-06-03/doc-ihcmurvf8900482.shtml ", ] 

    var pointarray = new Array(locarray.length);
    
    // 将地址解析结果显示在地图上,并调整地图视野
    locarray.forEach(function(item){
        myGeo.getPoint(item, function(point){
        if (point) {
            map.centerAndZoom(point, 5);
            var marker = new BMap.Marker(point);  // 创建标注
            map.addOverlay(marker);
            marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            var infoWindow = new BMap.InfoWindow(newsarray[locarray.indexOf(item)]);  // 创建信息窗口对象
            marker.addEventListener("click", function(){          
                // map.openInfoWindow(infoWindow,point); //开启信息窗口
                window.location = newsarray[locarray.indexOf(item)];
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

   
