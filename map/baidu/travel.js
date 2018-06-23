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
var locarray = ["广东省珠海市香洲区会展二路 "
,"Ang Thong, Ko Samui, Surat Thani, Thailand "
,"台湾省花莲县秀林乡 "
,"Itramenstrasse, Interlaken, Bern, Switzerland "
,"新疆维吾尔自治区巴音郭楞蒙古自治州和静县 "
,"广东省珠海市香洲区 "
,"广东省广州市海珠区下渡东约大街2号  "
,"广东省广州市越秀区江月路5号 "
,"江苏省南京市秦淮区秣陵路118-临 "
,"江苏省南京市建邺区 "
,"江苏省南京市秦淮区莫愁路450号 "
,"湖北省武汉市洪山区雄楚大道918号 "
, ]  
  var picsarray = [ "https://ws2.sinaimg.cn/large/006tNc79gy1fskvdloac0j31kw0w0dqj.jpg "
,"https://ws1.sinaimg.cn/large/006tNc79gy1fskvziykn6j31kw0w0k9a.jpg "
,"https://ws1.sinaimg.cn/large/006tNc79gy1fskvzv1752j31kw0w0nh8.jpg "
,"https://ws2.sinaimg.cn/large/006tNc79gy1fskw11lnnxj31kw0hq79d.jpg "
,"https://ws2.sinaimg.cn/large/006tNc79gy1fskw2hstf0j315o0netnr.jpg "
,"https://ws4.sinaimg.cn/large/006tNc79gy1fskw3l2h1cj31kw11xawa.jpg "
,"https://ws2.sinaimg.cn/large/006tNc79gy1fskw3zhg6vj31kw0zen69.jpg "
,"https://ws2.sinaimg.cn/large/006tNc79gy1fskw4hn2bqj31kw11x4qp.jpg "
,"https://ws1.sinaimg.cn/large/006tNc79gy1fskw569vpkj31kw27zb2a.jpg "
,"https://ws1.sinaimg.cn/large/006tNc79gy1fskw6bsxpuj31kw27oe82.jpg "
,"https://ws4.sinaimg.cn/large/006tNc79gy1fskw7sm9umj31kw10r4qp.jpg "
,"https://ws4.sinaimg.cn/large/006tNc79gy1fskw87t6oxj31kw0w0k9i.jpg ", ] 



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

    // 添加点击上传图片的功能
    fileElem = document.getElementById("add_file");
    map.addEventListener("click",function(e){
        var lng = e.point.lng;
        var lat = e.point.lat;
         if (fileElem) {
            fileElem.click();
         }
        // alert(e.point.lng + "," + e.point.lat);
    });


    var pointarray = new Array(locarray.length);
    
    // 将地址解析结果显示在地图上,并调整地图视野
    locarray.forEach(function(item){
        myGeo.getPoint(item, function(point){
        if (point) {
            map.centerAndZoom(point, 5);
            var marker = new BMap.Marker(point);  // 创建标注
            map.addOverlay(marker);
            marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            var picContent = "<div class='BMap_bubble_title' style='overflow: hidden; height: auto; line-height: 24px; width: auto;''>"+
            "<img style='float:right;margin:4px' id='imgDemo' src='"+
            picsarray[locarray.indexOf(item)]+
            "' width='492' height='304' title='风景画'/>"+
            "</div>";

            var infoWindow = new BMap.InfoWindow(picContent);  // 创建信息窗口对象
            marker.addEventListener("click", function(){          
                 map.openInfoWindow(infoWindow,point); //开启信息窗口
                // window.location = newsarray[locarray.indexOf(item)];
            });
        }else{
            // alert("您选择地址没有解析到结果!");
        }
        }, "北京市");
    });

