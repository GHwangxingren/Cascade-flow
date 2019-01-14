;(function () {
    var reg=/^(width|height|left|right|top|bottom|margin|padding|fontSize)$/
    var Utils=function (ele) {
        this.ele=ele;
    }
    Utils.prototype={
        constructor:Utils,
        //获取css属性
        getCss:function getCss(attr) {
            var ele=this.ele;
            var cur=null;
            if ("getComputedStyle" in window){
                cur=getComputedStyle(ele)[attr];
            } else{
                cur=ele.currentStyle[attr];
            }
            if (reg.test(attr)){
                cur=parseFloat(cur);
            }
            return cur;
        },
        //设置css属性
        setCss:function setCss(attr,val) {
            var ele=this.ele;
            if (reg.test(attr)&&typeof val==="number"){
                val+=val;
            }
            ele.style[attr]=val;
        },
        //计算当前元素距离body的偏移量
        offset:function offset() {
            var ele=this.ele;
            var left=ele.offsetLeft;
            var top=ele.offsetTop;
            var parent=ele.offsetParent;
            while (parent){
                left+=parent.offsetLeft+parent.clientLeft;
                top+=parent.offsetTop+parent.clientTop;
                parent=parent.offsetParent;
            }
            return{
                left,
                top
            }
        },
        //获得或者滚动卷进的长度
        win:function win(attr,val) {
            if (val===undefined){
                return document.documentElement[attr]||document.body[attr];
            }else{
                document.documentElement[attr]=val;
                document.body[attr]=val;
            }
        },
        //淡入效果
        fadeIn:function fadeIn() {
            var ele=this.ele;
            var tempNum=0.1;
            ele.style.opacity=tempNum;
            var timer=setInterval(function () {
                tempNum+=.1;
                ele.style.opacity=tempNum;
                if (tempNum>=1){
                    tempNum=1;
                    ele.style.opacity=1;
                    clearInterval(timer);
                }
            },30)
        }
    }





    var utils=function (ele) {
        return new Utils(ele);
    }
    window.utils=utils;
})()