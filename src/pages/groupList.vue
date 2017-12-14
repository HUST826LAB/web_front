<template>
  <div class="groupList" >
    <header>
      <h1>后台管理</h1>
    </header>
    <div class="wrapper">
       <div class="group-list">
        <h4>用户列表</h4>
        <div class="group-list-wrapper">
          <table>
            <tr>
              <th>用户姓名</th>
              <th>绘制次数</th>
              <th>最高分数</th>
              <th>最近绘制时间</th>
            </tr>
             <tr v-for="item in list" @click="routerTo">
                <td>{{item.uname ? item.uname : item.username}}</td>
                <td>{{item.sum}}</td>
                <td>{{item.score}}</td>
                <td>{{item.lastTime}}</td>
                <td class="id">{{item.user_id}}</td>
              </tr>
          </table>
          <fenye :user_id="groupId" @setList="getList" sendText="group_id" url="/groupDetail" listName="groupLst"></fenye>
        </div>
      </div>
      <div class="chart">
        <h4>分数图表</h4>
        <div id="myChart">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import doCookie from '@/server/docookie'
import getData from '@/server/vue-resource'
import fenye from '@/components/fenye'
// 引入echart基本模板
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'app',
  data:function (){
    return {
      username:'',
      password:'',
      group:'',
      qrcode:false,
      list:[],
      nowPage:0,
      arr :[],
      sum:0,
      showNum:10,
      ID:'',
      groupId:'',
      groupMem:[],
      groupScore:[],
    }
  },
  components:{
    fenye
  },
  created:function () {
    var $this = this;
    //获取groupID
    $this.groupId = $this.$route.query.groupId;
        
    
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
      $this.groupMem = [];
      $this.groupScore = [];
      list.forEach(function(v,i){
          $this.groupMem.push(v.uname ? v.uname : v.username)
          $this.groupScore.push(v.score)
          $this.drawChart()
        })
          // console.log(document.getElementById('myChart'))
    },
    routerTo(e){
      var groupName = e.target.parentNode.children[4].innerHTML;
      this.$router.push({path:'/admin/groupList/person',query:{user_id:groupName}})
    },
    drawChart(){
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title:{
                text:'用户分数'
            },
         color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : this.groupMem,
                axisTick: {
                    alignWithLabel: true
                },
                
            }
        ],
        yAxis : [
            {
                type : 'value',
                maxInterval:20
            }
        ],
        series : [
            {
                name:'最高分数',
                type:'bar',
                barWidth: '60%',
                data:this.groupScore,
                
            }
        ]
      });
    }
  },

  
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
  .address{
    margin-top:30px;
    height: 200px;
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
  .address h4{
    font-size:40px;
  }
  .address input{
    height:22px;
  }
  .address button{
    width:200px;
    height:40px;
    border:1px solid #000;
    font-size:24px;
    line-height: 38px;
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
  .group-list table tr{
    cursor:pointer;
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
</style>
