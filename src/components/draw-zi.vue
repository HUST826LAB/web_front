<template>
  <div class="draw">
    <p class="text">按照提供的路径描红</p>
    <p>与之重合度越高则分数越高</p>
    <canvas  id="canvas" :width="canvasWidth" :height="canvasHeight" :style="{width:canvasWidth/2 + 'px',height:canvasHeight/2 + 'px'}">

    </canvas>
    <transition name="fade">
        <div class="drump" v-show="isCircle">
            <div>
                <span>貌似没有画全呢</span>
                <br>
                <span>把所有笔画画全哦n(*≧▽≦*)n</span>
            </div>
            <button @click="reload">好的</button>
        </div>
    </transition>
    <transition name="fade">
        <div class="drump" v-show="loading">
                <span>{{warn}}</span>
                <button @click="reload">取消</button>
        </div>
    </transition>
    <button v-show="finish"  class="go-score" @click="goScore">{{goText}}</button>
  </div>
</template>
<script>
import store from '@/store/vuex'
import getData from '@/server/vue-resource'
import doCookie from '@/server/docookie'
import match from '@/server/calMatching'
export default {
  name: 'draw-zi',
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
      loading:false,
      warn:'玩命加载中...',
      obj:{},
      finish:true,
      oTime:0,
      pointArr:[],
      time:0,
      lock:[0,0,0,0],
      goText:'重画',
      downArr:'',
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
    this.canvas = ctx;
    ctx.lineWidth = $self.canvasWidth / 600 * 40;
    var img = new Image();
    var imgWidth = $self.canvasWidth / 600 * 640;
    var imgHeight = imgWidth;
    // /static/img/yong.bd4e66c.png
    img.src = '../static/yong.png'
    img.onload = function () {
      ctx.drawImage(img,0,0,imgWidth,imgHeight)
      //分数判断初始化
      match.canvasData.draw.rgba=[0,128,0,255]
      match.canvasData.original.rgba=[255,0,0,255]
      match.canvasData.original.rgba1=[254,254,254,255]
      match.calMatching(canvas);
    }
    this.postData.imgWidth = imgWidth;
    this.postData.imgHeight = imgHeight;
    // //添加基准区域
    // //满分区域
    // ctx.beginPath();
    // ctx.arc(cBeginX, cBeginY, cR, 0, Math.PI * 2, true);
    // ctx.strokeStyle = 'red';
    // ctx.lineWidth = 20;
    // ctx.stroke();
    // ctx.closePath();
    // //半分区域
    // ctx.beginPath();
    // ctx.arc(cBeginX, cBeginY, cR+20, 0, Math.PI * 2, true);
    // ctx.strokeStyle = 'rgba(254,254,254,255)';
    // ctx.lineWidth = 20
    // ctx.stroke();
    // ctx.closePath();
    // ctx.beginPath();
    // ctx.arc(cBeginX, cBeginY, cR-20, 0, Math.PI * 2, true);
    // ctx.strokeStyle = 'rgba(254,254,254,255)';
    // ctx.lineWidth = 20
    // ctx.stroke();
    // ctx.closePath();
    // ctx.fillStyle="rgb(254,254,254)";
    // ctx.fillRect(0,0,600,800);
    // console.log(ctx.getImageData(0,0,600,800))
    var touchdown = 'ontouchstart' in document ? 'touchstart' : 'mousedown';
    var touchmove = 'ontouchmove' in document ? 'touchmove' : 'mousemove';
    var touchend = 'ontouchend' in document ? 'touchend' : 'mouseup';
    var lock = true;
    var ox = null;
    var oy = null;
    var $this = this;
    var one = false;
    var two = false;
    var three = false;
    var four = false;
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
        if (true) {
            
            var ev = 'ontouchstart' in document ? e.touches[0] : e;
            var x = ev.pageX - canX;
            var y = ev.pageY - canY;
            ox = x*2;
            oy = y*2;
            if(lock){
              lock = false
              $this.oTime = new Date().getTime();
            }
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
        $this.downArr+= x + ',' + y + ','
        event.preventDefault();
        if(x > imgWidth/2 && y < imgHeight / 2) {
            $this.lock[0] = 1;
        }
        if(x > imgWidth/2 && y > imgHeight / 2){
            $this.lock[1] = 1;
        }
        if(x < imgWidth/2 && y > imgHeight / 2){
            $this.lock[2] = 1;
        }
        if(x < imgWidth/2 && y < imgHeight / 2){
            $this.lock[3] = 1;
        }
    }
    //抬起请求数据
    function up(e) {
        removeEvent(canvas, touchmove, move)
        $this.time = new Date().getTime() - $this.oTime
        // removeEvent(document, touchend, up)
        $this.pointArr.push($this.downArr.substring(0,$this.downArr.length - 1))
        $this.downArr = '';
        this.finish = true
        var sum = 0;
        for(let i = 0; i < 4; i++){
            sum += $this.lock[i]
        }
        if(sum == 4){
            $this.goText = '查看成绩'
        }
       

    }

        addHandler(canvas, touchdown, down);

    function draw(ox, oy, x, y) {
        ctx.beginPath();
      
        ctx.moveTo(ox, oy);
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
        this.loading = false;
    },
    goScore(){
      var ctx = document.getElementsByTagName('canvas')[0].getContext('2d')
       var imageData = ctx.getImageData(0,0,600,800).data;
        var len = imageData.length;
        var $this = this;
        var $self = this;
        var canvas = document.getElementsByTagName('canvas')[0]
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
        //四象限判断
        var sum = 0;
        for(let i = 0; i < 4; i++){
            sum += $this.lock[i]
        }
        if(sum == 4){
                  //计算分数
            match.calMatching(canvas)
            console.log(match.canvasData.matching)
            $this.score =match.canvasData.matching.toFixed(3)*1000;

                //数据交互部分
            var postData = $this.postData;
            var obj = getUrl();
            postData.coordinate = $this.pointArr.join(';');
            postData.time_len = this.time.toString();
            //获取用户设备
            navigator.userAgent ? postData.device = navigator.userAgent : undefined;
            postData.referee = obj.referree ? obj.referree.toString() : '0';
            postData.user_id = doCookie('get', 'user_id') ? doCookie('get', 'user_id') : '0';
            obj.group ? (postData.group = obj.group.toString()) : postData.group = '0';
            postData.cookie_id = doCookie('get', 'cookie_id')?doCookie('get', 'cookie_id'):'d938a9aa6c15057ab49647299d681416d10171a9';
            postData.deviation = match.canvasData.matching !== NaN ? match.canvasData.matching.toFixed(5).toString():'404';
            postData.score = $this.score.toString();
            postData.blood = '3';
            console.log(postData)
            var oJSON = JSON.stringify(postData)
            console.log(oJSON)
            $this.loading = true;
            
            getData('/gameMain','post',oJSON).then((res) => {
                console.log(res.bodyText)
                $this.loading = false;
                // alert(JSON.parse(res.bodyText).data.score)
                var data = JSON.parse(res.bodyText).data;
                $self.resData = data;
                if(JSON.parse(res.bodyText).msg == '不是圆'){
                    // ctx.clearRect(0,0,$self.canvasWidth,$self.canvasHeight);
                    // ctx.beginPath();
                    // ctx.arc(cBeginX, cBeginY, cR, 0, Math.PI * 2, true);
                    // ctx.strokeStyle = 'red';
                    // ctx.lineWidth = 20
                    // ctx.stroke();
                    // lock = true;
                    // $self.isCircle = true;
                    
                }else{
                    // window.location.href = '/score' + location.search + '&res_id=' + data.res_id + '&score=' + data.score + '&sum=' + data.sum + '&sumLevel=' + data.sum_level;
                    // $self.$router.push({path:'/score', params:{score:data.score}})
                    // $self.score=data.score;
                    // $self.path = '/score?' +'s=' + data.score 
                    // $self.$router.push({path:'/score', query:{score:data.score,res_id:data.res_id,sum:data.sum,sumLevel:data.sum_level,gold:data.gold,group:data.sumGroup,groupLevel:data.group_level,resId:data.res_id}})
                    // doCookie('set','score', 100)
                    // delCookie('score');
                    // document.cookie = 'score' + '=' + res.body.data.score;
                    // $self.$router.push({path:'/score'})
                    $self.obj = {score:$self.score,sum:data.sum,sumLevel:data.sum_level,gold:data.gold,sumGroup:data.sumGroup,groupLevel:data.group_level,resId:data.res_id,group:$self.postData.group}
                    $self.finish = true;
                    $self.$router.push({path:'/score',query:$self.obj})


                }
                // store.commit('setScore', JSON.parse(res.bodyText).data.score)
            },()=>{
                $self.warn = '网络貌似不通呢+_+'
            })

        }else{
            var $self = this;
            var canvas = document.querySelectorAll("#canvas")[0];
            var ctx = canvas.getContext('2d');
            var oData = '';
            var canX = document.querySelectorAll('#canvas')[0].offsetLeft;
            var canY = document.querySelectorAll('#canvas')[0].offsetTop;
            var cBeginX = this.canvasWidth / 2;
            var cBeginY = this.canvasHeight / 2;
            var cR = Math.min(this.canvasHeight,this.canvasWidth) / 2.5;
            this.canvas = ctx;
            ctx.lineWidth = $self.canvasWidth / 600 * 40;
            var img = new Image();
            var imgWidth = $self.canvasWidth / 600 * 640;
            var imgHeight = imgWidth;
            // /static/img/yong.bd4e66c.png
            img.src = '../static/yong.png'
            img.onload = function () {
            ctx.drawImage(img,0,0,imgWidth,imgHeight)
            //分数判断初始化
            match.canvasData.draw.rgba=[0,128,0,255]
            match.canvasData.original.rgba=[255,0,0,255]
            match.canvasData.original.rgba1=[254,254,254,255]
            match.canvasData.state = 1;
            match.calMatching(canvas);
            }
        }
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
      border-radius: 40px;
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
    border-radius: 30px;
}
</style>
