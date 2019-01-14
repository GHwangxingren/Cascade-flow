;(function () {
    (function () {
        var data=ajax();
        render(data);//渲染第一页

        var imgs=document.getElementsByTagName("img");
        delayLoad(imgs);//懒加载

        var pageNum=1;
        window.onscroll=function () {
            delayLoad(imgs);
            if (pageNum>=5) {
                return
            }
            if (utils().win("clientHeight")+utils().win("scrollTop")>=utils().win("scrollHeight")-50){
                var data=ajax();
                render(data);
                pageNum++;
            }
            returnTop();
        }
    })()

    //第一步 获取数据
    function ajax() {
        var data;
        var xhr=new XMLHttpRequest();
        xhr.open("get","./json/articles.json",false);
        xhr.onreadystatechange=function () {
            if (xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
                data=JSON.parse(xhr.responseText)
            }
        }
        xhr.send();
        return data;
    }
    //第二步 绑定数据
    function render(attr) {
        var oLis=document.getElementsByTagName("li");
        oLis=[].slice.call(oLis);
        for (var i = 0; i < attr.length; i++) {
            var cur=attr[i];
            oLis.sort(function (a,b) {
                return a.offsetHeight-b.offsetHeight;
            })
            var str=` <div class="item">
                            <img src="img/default.jpg" trueImg="${cur.img}" alt="">
                            <p>${cur.desc}</p>
                        </div>
                      `
            var oDiv=document.createElement("div");
            oDiv.innerHTML=str;
            oLis[0].appendChild(oDiv);
        }
    }

    //第四步 图片懒加载效果
    function delayLoad(attr) {
        for (var i = 0; i < attr.length; i++) {
            (function (index) {
                var cur=attr[index];
                if (cur.flag) {
                    return
                }
                var winH=utils().win("clientHeight");
                var winT=utils().win("scrollTop");
                var curH=cur.offsetHeight;
                var curT=utils(cur).offset().top;
                if (winH+winT>curT+curH){
                    var trueAddress=cur.getAttribute("trueImg");
                    var newImg=document.createElement("img");
                    newImg.src=trueAddress;
                    newImg.onload=function () {
                        cur.flag=true;
                        cur.src=trueAddress;
                        utils(cur).fadeIn();
                    }
                }
            })(i)
        }
    }
    
    //回到顶部
    function returnTop() {
        var retTop=document.getElementById("retTop");
        retTop.onclick=function () {
            var curT=utils().win("scrollTop");
            var timer=setInterval(function () {
                curT-=30;
                if (curT<=0){
                    clearInterval(timer)
                }
                utils().win("scrollTop",curT)
            },10)
        }
        var winH = utils().win("clientHeight");
        if (utils().win("scrollTop")>winH){
            retTop.style.display="block"
        } else{
            retTop.style.display="none"
        }
    }
    returnTop()
})()