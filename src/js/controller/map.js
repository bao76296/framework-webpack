import map_html from '../views/map/map.html'

const map = () => {
    $('.content').html(map_html);
    if(!window.AMap){
        var url = 'https://webapi.amap.com/maps?v=1.4.10&key=a1da3d412b4d34a16c8c3f08f8b594c9&callback=mapFun';
        var jsapi = document.createElement('script');
        jsapi.charset = 'utf-8';
        jsapi.src = url;
        document.head.appendChild(jsapi);
    }
    else{
        mapFun();
    }
    

    
}


window.mapFun = function () {
    let pos = null;
    var map = new AMap.Map('container', {
        zoom: 11,//级别
        resizeEnable: true,
        center: [116.25139, 40.2222],//中心点坐标
        viewMode: '3D'//使用3D视图

    });
    map.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            // 设置定位超时时间，默认：无穷大
            timeout: 10000,
            // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
            buttonOffset: new AMap.Pixel(10, 20),
            //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            zoomToAccuracy: true,
            //  定位按钮的排放位置,  RB表示右下
            buttonPosition: 'RB'
        })
        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete) 
        AMap.event.addListener(geolocation, 'error', onError)
        
         function onComplete(data) {
             var marker = new AMap.Marker({
                 icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
                 position: data.position
                 // position: [pos.position.lat, pos.position.lng]
             });
             map.add(marker)
           
            
            map.plugin('AMap.Transfer', function () {
                 var transOptions = {
                     map: map,
                     city: '北京市',
                     panel: 'panel',
                     //cityd:'乌鲁木齐',
                     policy: AMap.TransferPolicy.LEAST_TIME
                 };
                 //构造公交换乘类
                 var transfer = new AMap.Transfer(transOptions);
               
                 //根据起、终点坐标查询公交换乘路线
                 transfer.search(new AMap.LngLat(data.position.lng, data.position.lat), new AMap.LngLat(116.25139, 40.2222), function (status, result) {
                     // result即是对应的公交路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferResult
                    
                     if (status === 'complete') {
                         console.log('绘制公交路线完成')
                     } else {
                         console.error('公交路线数据查询失败' + result)
                     }
                 });
             })
             
        }
        function onError(data) {
            // 定位出错
            alert(JSON.stringify(data));
            document.getElementById('tip').innerHTML = '定位失败';
        }
    })
    var marker = new AMap.Marker({
        icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        position: [116.405467, 39.907761]
        // position: [pos.position.lat, pos.position.lng]
    });
    map.add(marker);
}

export default {
    map
}