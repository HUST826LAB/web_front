<template>
  <div class="draw">
    <p class="text">按照提供的路径画一个圆</p>
    <p>与之重合度越高则分数越高</p>
    <canvas id="canvas" :width="canvasWidth" :height="canvasHeight" :style="{width:canvasWidth/2 + 'px',height:canvasHeight/2 + 'px'}">

    </canvas>
    <transition name="fade">
        <div class="drump" v-show="isCircle">
            <div>
                <span>貌似画的不是圆呢</span>
                <br>
                <span>重新画一个吧n(*≧▽≦*)n</span>
            </div>
            <button @click="reload">好的</button>
        </div>
    </transition>
    <router-link  tag="a" class="go-score" :to="{path:('/score?s=' + this.score)}">完成</router-link>
  </div>
</template>
<script>
import store from '@/store/vuex'
import getData from '@/server/vue-resource'
import doCookie from '@/server/docookie'
export default {
  name: 'draw',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      canvasWidth: 250,
      canvasHeight: 250,
      postData: {},
      isCircle: false,
      canvas: null,
      path:'',
      score:0,
    }
  },
  created:function () {
    var clientWidth = document.documentElement.clientWidth;
    var clientHeight = document.documentElement.clientHeight;

    this.canvasWidth = 600 / 320 * clientWidth;
    this.canvasHeight = 800 / 568 * clientHeight;

  },
  mounted:function () {
    var $self = this;
    var canvas = document.querySelectorAll("#canvas")[0];
    var ctx = canvas.getContext('2d');
    var oData = '';
    var canX = document.querySelectorAll('#canvas')[0].offsetLeft;
    var canY = document.querySelectorAll('#canvas')[0].offsetTop;
    var cBeginX = this.canvasWidth / 2;
    var cBeginY = this.canvasHeight / 2;
    var cR = Math.min(this.canvasHeight,this.canvasWidth) / 2.5;
    var pointArr = [];
    this.canvas = ctx;
    this.postData.circle_x = cBeginX.toString();
    this.postData.circle_y = cBeginY.toString();
    this.postData.circle_r = cR.toString();
    ctx.beginPath();
    ctx.arc(cBeginX, cBeginY, cR, 0, Math.PI * 2, true);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 20
    ctx.stroke();
    var touchdown = 'ontouchstart' in document ? 'touchstart' : 'mousedown';
    var touchmove = 'ontouchmove' in document ? 'touchmove' : 'mousemove';
    var touchend = 'ontouchend' in document ? 'touchend' : 'mouseup';
    var lock = true;
    var ox = null;
    var oy = null;
    var oTime = null;
    var $this = this;
        var addHandler = function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    }
    //查找url参数
    function getUrl () {
      var obj = {};
      var arr = window.location.search.substr(1).split('&')
      for(let i =0;i<arr.length;i++){
        arr[i]=arr[i].split('=')
      }
      arr.forEach(function (v) {
        obj[v[0]] = v[1];
      })
      return obj
    } 
    function removeEvent(elem, type, handler) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handler, false);
        } else if (elem.detachEvent) {
            elem.detachEvent('on' + type, handler);
        } else {
            elem['on' + type] = null;
        }
    }
    function down(e) {
        if (lock) {
            lock = false;
            var ev = 'ontouchstart' in document ? e.touches[0] : e;
            var x = ev.pageX - canX;
            var y = ev.pageY - canY;
            ox = x*2;
            oy = y*2;
            oTime = new Date().getTime();
            e.preventDefault()
            addHandler(canvas, touchmove, move);
        }


    }
    function move(e) {
        // alert(new Date().getTime() -oTime)
        addHandler(document, touchend, up);
        var ev = 'ontouchstart' in document ? e.touches[0] : e;
        var x = (ev.pageX - canX)*2;
        var y = (ev.pageY - canY)*2;
        draw(ox, oy, x, y)
        ox = x;
        oy = y;
        oData = oData + x.toString() + ',' + y.toString() + ',';
        event.preventDefault();
    }
    function up(e) {
        removeEvent(canvas, touchmove, move)

        var ev = 'ontouchstart' in document ? e.touches[0] : e;
        oTime = new Date().getTime() - oTime;
        removeEvent(document, touchend, up)
        var postData = $this.postData;
        var obj = getUrl();
        postData.coordinate = pointArr.join(',')
        postData.time_len = oTime.toString();
        //获取用户设备
        navigator.userAgent ? postData.device = navigator.userAgent : undefined;
        postData.referee = obj.referree ? obj.referree.toString() : '0';
        postData.user_id = obj.user_id ? obj.user_id.toString() : '0';
        obj.group ? postData.group = obj.group.toString() : postData.group = '0';
        postData.cookie_id = doCookie('get', 'cookie_id');
        console.log(postData)
        var oJSON = JSON.stringify(postData)
        console.log(oJSON)
        getData('/gameMain','post',oJSON).then((res) => {
            console.log(res.bodyText)
            
            // alert(JSON.parse(res.bodyText).data.score)
            var data = JSON.parse(res.bodyText).data;
            $self.resData = data;
            if(JSON.parse(res.bodyText).msg == '不是圆'){
                ctx.clearRect(0,0,$self.canvasWidth,$self.canvasHeight);
                ctx.beginPath();
                ctx.arc(cBeginX, cBeginY, cR, 0, Math.PI * 2, true);
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 20
                ctx.stroke();
                lock = true;
                $self.isCircle = true;
                
            }else{
                window.location.href = '/score' + location.search + '&res_id=' + data.res_id + '&score=' + data.score + '&sum=' + data.sum + '&sumLevel=' + data.sum_level;
                // $self.$router.push({path:'/score'+ '&score=' + data.score + '&sum=' + data.sum + '&sumLevel=' + data.sum_level})
                // $self.score=data.score;
                // $self.path = '/score?' +'s=' + data.score 
            }
            // store.commit('setScore', JSON.parse(res.bodyText).data.score)
        })

    }

        addHandler(canvas, touchdown, down);

    function draw(ox, oy, x, y) {
        ctx.beginPath();
        ctx.moveTo(ox, oy);
        pointArr.push(ox,oy)
        ctx.lineTo(x, y);
        ctx.lineJoin="round"
        ctx.strokeStyle = 'green';
        ctx.closePath();                
        ctx.stroke()
    }
    if (location.href.indexOf("&xyz=") < 0) {
        location.href = location.href + "&xyz=" + Math.random();
        if(window.history.replaceState){
            window.history.replaceState(location.href + "&xyz=" + Math.random(),null,null)
        }else{
            location.href = location.href + "&xyz=" + Math.random();
        }
       
    }
    
  },
  methods:{
    reload(){
        this.isCircle = false;
         
    },
    goScore(){

    }
  }
  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #canvas{
    width:3.75rem;
    height:5rem;
    margin:0 auto;
  }
  .drump{
      position :absolute;
      width: 2.6666666666666665rem;
      height:1.6666666666666667rem;
      border:3px solid #000;
      background: #fff;
      top:0;
      left:0;
      bottom:0;
      right:0;
      margin:auto;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
  }
  .drump button{
      width:1.3333333333333333rem;
      height:0.3333333333333333rem;
      border:3px solid #000;
      background:#fff;
      font-size:0.16666666666666666rem;
      line-height: 0.3333333333333333rem;

  }
  /* 开始过渡阶段,动画出去阶段 */
.fade-enter-active,.fade-leave-active{
  transition: all 0.5s ease-out;
}
/* 进入开始 */
.fade-enter{
  transform: translatey(-0.6666666666666666rem);
  opacity: 0;
}
/* 出去终点 */
.fade-leave-active{
  transform: translateY(0.6666666666666666rem);
  opacity: 0;
}
.go-score{
    width: 2.6666666666666665rem;
    height:0.56666666666666666rem;
    border:3px solid #000;
    background:#fff;
    font-size:0.2rem;
    line-height:0.26666666666666666rem;
}
</style>
