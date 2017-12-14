<template>
  <div class="groupList" >
    <header>
      <h1>后台管理</h1>
    </header>
    <div class="wrapper">
       <div class="group-list">
        <h4>用户分数</h4>
        <div class="group-list-wrapper">
          <table>
            <tr>
              <th>编号</th>
              <th>分数</th>
              <th>时间</th>
              <th>形状</th>
              <th>绘制时间</th>
            </tr>
             <tr v-for="(item,index) in list" @click="routerTo">
                <td>{{index+1}}</td>
                <td>{{item.score}}</td>
                <td>{{(item.time_len/1000).toFixed(2)+'s'}}</td>
                <td>{{item.blood}}</td>
                <td>{{item.create_time.substring(0,19)}}</td>
                <td class="id">{{item.res_id}}</td>
              </tr>
          </table>
          <fenye :user_id="user_id" @setList="getList" sendText="user_id" url="/userDetail" listName="userList"></fenye>
        </div>
      </div>
      <div class="chart">
        <h4>分数图表</h4>
        <div id="myChart">

        </div>
      </div>
    </div>
    <div class="res" v-show="resShow">
      <res :res_id='res_id' @closeRes="close"></res>
    </div>
  </div>
</template>

<script>
import doCookie from '@/server/docookie'
import getData from '@/server/vue-resource'
import res from '@/components/res.vue'
import fenye from '@/components/fenye.vue'
// 引入基本模板
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
  name: 'app',
  components:{
    res,
    fenye
  },
  data:function (){
    return {
      username:'',
      password:'',
      group:'',
      list:[],
      nowPage:0,
      arr :[],
      sum:0,
      showNum:10,
      user_id:'',
      timeArr:[],
      scoreArr:[],
      resShow:false,
      res_id:0,
    }
  },
  created:function () {
    var $this = this;
    $this.user_id = $this.$route.query.user_id;
  },
  methods:{
    submite(){
      if(this.username=='admin' && this.password=='admin'){
        this.login = false;
        this.admin = true;
        doCookie('set','admin',this.username)
      }
    },
    close(){
      document.getElementById('qrcode').innerHTML=''
      this.qrcode=false
    },
   //从子组件获取数据
    getList(list){
      var $this = this;
      this.list = list;
      $this.scoreArr = [];
      $this.timeArr = [];
      $this.list.forEach((v,i)=>{
        $this.timeArr.push(v.create_time)
        $this.scoreArr.push(v.score)
      })
      $this.list.forEach((v,i,a)=>{
        var blood = v.blood;
        if(blood == 0){
          v.blood = '圆'
        }else if(blood == 1){
          v.blood = '三角'
        }else if(blood == 2){
          v.blood = '米字'
        }else if(blood == 3){
          v.blood = '永字'
        }else if(blood == 4){
          v.blood = '兔子'
        }else if(blood == 5){
          v.blood = '猫'
        }
      })
      this.drawChart();
    },
    
    routerTo(e){
      var res_id = e.target.parentNode.children[5].innerHTML;
      // this.$router.push({path:'/groupList',query:{groupName:groupName}})
      this.res_id = res_id;
      this.resShow = true;
      
    },
    drawChart(){
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title:{
                text:'用户分数'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend:{
                data:['用户来源']
            },
            xAxis:{
              type : 'category',
              boundaryGap : false,
              data : this.timeArr
            },
            yAxis:{

            },
            series:[{
                name:'分数',
                type:'line',
                data:this.scoreArr
            }]
      });
    },
    close(){
      this.resShow = false;
    }
  },
    computed:{
      pages:function () {
        var num = this.nowPage;
        var arr = this.arr
        var sum = arr.length;
        if(num < 2){
          return arr.slice(0,5)
        }else if(num >= sum - 2 ){
          return arr.slice(sum-5,sum)
        }else{
          return arr.slice(num -2,num+3)
        }
        
      },
      
    },
    watch:{
      nowPage:function () {
        this._list()
      }
    }

  
  }
  
</script>

<style scoped>
  .groupList{
    background:#eaedf1;
  }
  header{
    width:100%;
    height:50px;
    background:#373d41;
    color:#fff;
    line-height:50px;
  }
  header h1{
    font-size:35px;
  }
  .wrapper{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }


  .group-list{
    margin-top:30px;
    /* height: 200px; */
    width:1024px;
    background:#fff;
    padding:20px;
    font-size:25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-bottom:30px;
  }
  .group-list-wrapper{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .group-list h4{
    font-size:40px;
  }
  .group-list table{
    border-collapse:collapse;
    border:1px solid #000;

  }
  .group-list table th{
    border:1px solid #000;
    padding:5px;
  }
  .group-list table td{
    border:1px solid #000;
    padding:5px;
  }
  .group-list table td.id{
    display: none;
  }
  .group-list table td.del{
    background:red;
    cursor: pointer;
    color:#fff;
    margin-left:10px;
  }


  .pages ul {
    margin-top:40px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
  }
  .pages li{
    display: inline-block;
    /* width:40px; */
    height: 40px;
    border-right:2px solid #000;
    border-top:2px solid #000;
    border-bottom:2px solid #000;
    border-left:1px solid #000;
    line-height:40px;
    cursor: pointer;
    padding:0 20px;
  }
  .pages li:first-child{
    /* border-left:2px solid #000; */
  }
  .pages li.active{
    background: deepskyblue;
    color:#fff;
  }

  .chart{
    margin-top:30px;
    /* height: 200px; */
    width:1024px;
    background:#fff;
    padding:20px;
    font-size:25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-bottom:30px;
  }
  .group-list-wrapper{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .chart h4{
    font-size:40px;
  }
  .chart #myChart{
    width:1000px;
    height:500px;
  }

  .res{
    width:900px;
    height:900px;
    position: fixed;
    top:50%;
    left:50%;
    margin:-450px 0 0 -450px;
    background:#fff;
    border:2px solid #000;
  }
</style>
