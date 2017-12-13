<template>
  <div class="res-wrapper">
    <h1>图像还原</h1>
    <div @click="close" class="close">×</div>
    <canvas id="canvas" width="1600" height="1600"></canvas>
  </div>
</template>

<script>
import getData from '@/server/vue-resource'
export default {
  data () {
    return {

    }
  },
  props:['res_id'],
  mounted:function () {



  },
  methods:{
    _res_id:function () {
      var $this = this;
      getData('/userGameDetail','post',{"res_id":this.res_id}).then((res)=>{
        var data = res.body.data
        console.log(data)
        if(res.body.code === 0) {
          //如果数据有效则创建canvas
          var canvas = document.getElementById("canvas");
          var ctx = canvas.getContext('2d');
          ctx.clearRect(0,0,1600,1600)
          //对图像类型进行判断，如果是圆
          if(data.resDetail.type == 0){
            var cBeginX = data.datum.circle_x;
            var cBeginY = data.datum.circle_y;
            var cR = data.datum.circle_r;
            var arr = data.resDetail.coordinate.split(';')
            ctx.beginPath();
            ctx.arc(cBeginX, cBeginY, cR, 0, Math.PI * 2, true);
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 20;
            ctx.stroke();
            ctx.closePath();
            draw(arr)
          //如果是三角
          }else if(data.resDetail.type == 1){
            var summit = data.datum;
            var arr = data.resDetail.coordinate.split(';')
            console.log(summit)
            ctx.beginPath();
            ctx.moveTo(summit.summit0_x,summit.summit0_y)
            ctx.lineTo(summit.summit1_x,summit.summit1_y)
            ctx.lineTo(summit.summit2_x,summit.summit2_y)
            ctx.closePath();
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 20
            ctx.stroke();
            draw(arr)
          }else if(data.resDetail.type == 2){
            var summit = data.datum;
            var arr = data.resDetail.coordinate.split(';');
            var img = new Image();
            var imgWidth = summit.image_width;
            var imgHeight = summit.image_height ? summit.image_height:summit.image_width;
            ctx.lineWidth = imgWidth / 600 * 40;
            img.src = '../../static/mi.png'
            img.onload = function () {
              ctx.drawImage(img,0,0,imgWidth,imgHeight)
              draw(arr);
            }
          }else if(data.resDetail.type == 3){
            var summit = data.datum;
            var arr = data.resDetail.coordinate.split(';');
            var img = new Image();
            var imgWidth = summit.image_width;
            var imgHeight = summit.image_height ? summit.image_height:summit.image_width;
            ctx.lineWidth = imgWidth / 600 * 40;
            img.src = '../../static/yong.png'
            img.onload = function () {
              ctx.drawImage(img,0,0,imgWidth,imgHeight)
              draw(arr);
            }
          }else if(data.resDetail.type == 4){
            var summit = data.datum;
            var arr = data.resDetail.coordinate.split(';');
            var img = new Image();
            var imgWidth = summit.image_width;
            var imgHeight = summit.image_height ? summit.image_height:summit.image_width;
            ctx.lineWidth = imgWidth / 600 * 15;
            img.src = '../../static/tu.png'
            img.onload = function () {
              ctx.drawImage(img,0,0,imgWidth,imgHeight)
              draw(arr);
            }
          }else if(data.resDetail.type == 5){
            var summit = data.datum;
            var arr = data.resDetail.coordinate.split(';');
            var img = new Image();
            var imgWidth = summit.image_width;
            var imgHeight = summit.image_height ? summit.image_height:summit.image_width;
            ctx.lineWidth = imgWidth / 600 * 10;
            img.src = '../../static/miao.png'
            img.onload = function () {
              ctx.drawImage(img,0,0,imgWidth,imgHeight)
              draw(arr);
            }
          }
        }else{

        }
        //还原用户轨迹函数，接收绘画点数组
        function draw(arr1){
          console.log(arr1)
          var len1 = arr1.length;
          for(let j = 0; j < len1; j++){
            var arr = arr1[j].split(',');
            var len = arr.length;
            for(let i = 0;i < len-2;i+=2){
              ctx.beginPath();
              ctx.moveTo(arr[i],arr[i+1])
              ctx.lineTo(arr[i+2],arr[i+3])
              ctx.lineJoin="round"
              ctx.strokeStyle = 'green';
              ctx.closePath();                
              ctx.stroke()
            }
          }
        }
      })
    },
    close(){
      this.$emit('closeRes')
    }
  },
  watch:{
    res_id:function () {
      this._res_id()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1{
    margin-top:15px;
    font-size:30px;
  }
  .close{
    position: absolute;
    right:10px;
    cursor: pointer;
    top:0px
  }
  #canvas{
    width:800px;
    height:800px;
    margin-top:50px;
  }
</style>
