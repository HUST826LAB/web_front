
<template>
  <div class="admin" >
    <header>
      <h1>管理后台</h1>
      <span @click="signOut" v-show="user_id">注销</span>
    </header>
    <div class="wrapper" v-if="admin">
      <div class="address">
        <h4>组别生成</h4>
        <div>
          组别名称：
          <input type="text" v-model="group">
        </div>
        <button @click="make">生成</button>
      </div>
       <div class="group-list">
        <h4>组别管理</h4>
        <div class="group-list-wrapper">
          <table>
            <tr>
              <th>组别名称</th>
              <th>组别人数</th>
              <th>组别总分</th>
              <th>创建时间</th>
            </tr>
             <tr v-for="item in list" >
                <td @click="routerTo">{{item.name}}</td>
                <td @click="routerTo">{{item.numSum}}</td>
                <td @click="routerTo">{{item.score}}</td>
                <td @click="routerTo">{{item.create_time}}</td>
                <td class="id">{{item.group_id}}</td>
                <td class="del" @click="del">删除</td>
              </tr>
          </table>
          <fenye :user_id="user_id" @setList="getList" sendText="user_id" url="/selectGroup" listName="group_lst"></fenye>
        </div>
      </div>
    </div>
    <div class="login" v-show="login"  @keyup.13="submite">
      <div>
         用户名:
         <input type="text" v-model="username">
      </div>
      <div>
        密码:
        <input type="password" v-model="password">
      </div>
      <button @click="submite">登录</button>
      
    </div>
   
    <div id="qrcode" v-show="qrcode" @click="close"></div>
  </div>
</template>

<script>
import doCookie from '@/server/docookie'
import getData from '@/server/vue-resource'
import qrcode from '@/server/qrcode'
import sha from '@/server/sha'
import fenye from '@/components/fenye'
export default {
  name: 'app',
  data:function (){
    return {
      login:true,
      admin:false,
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
      user_id:0,
      postData:{},
    }
  },
  components:{
    fenye
  },
  mounted:function () {
    var $this = this;
    var cookieUserId = doCookie('get','admin')
    if(cookieUserId){
      this.user_id = cookieUserId
      console.log('f')
      this.login = false;
      this.admin = true;
    }
  },
  methods:{
    submite(){
      var sha1 = new sha('SHA-1','TEXT')
      var $this = this;
      this.postData.username = this.username
      sha1.update(this.password)
      this.postData.password = sha1.getHash('HEX')
      getData('/managerLogin','post',this.postData).then((res)=>{
        console.log(res.body.data)
        var data = res.body;
        if(data.code === 0){
          $this.user_id = data.data;
          this.login = false;
          this.admin = true;
          doCookie('set','admin',$this.user_id)
        }
      })
    },
    make(){
      var $this = this;
      var obj = {
        user_id : $this.user_id,
        name : this.group,
        owner_id: this.user_id
      }
      getData('/newGroup','post',JSON.stringify(obj) ).then((res)=>{
        var data = res.body.data;
        if(res.body.code === 0){
          alert('创建成功')
          $this.qrcode = true;
          console.log(data)
          $this.ID = data;
          //二维码生成
          var qr = qrcode()
          var qrCode = new qr('qrcode', { 
            text: 'your content', 
            width: 512, 
            height: 512, 
            colorDark : '#000000', 
            colorLight : '#ffffff', 
          });
          qrCode.makeCode('http://zhchy.info'+'?group='+this.ID);
          getData('/selectGroup','post',{"current": this.nowPage,"pageLen": $this.showNum,"user_id":this.user_id}).then((res)=>{
            var data = res.body.data;
            $this.list = data.group_lst;
          })
        }else if(res.body.code === -2) {
          $this.qrcode = true;
          var qr = qrcode()
          var qrCode = new qr('qrcode', { 
            text: 'your content', 
            width: 512, 
            height: 512, 
            colorDark : '#000000', 
            colorLight : '#ffffff', 
          });
          qrCode.makeCode('http://zhchy.info'+'?group='+res.body.data);
        }
      })
      },
    close(){
      document.getElementById('qrcode').innerHTML=''
      this.qrcode=false
    },
    //从子组件获取数据
    getList(list){
      this.list = list;
    },
    del(e){
      var $this = this;
      var name = e.target.parentNode.children[0].innerHTML;
      var sure = confirm('是否删除'+name+'?')
      if(sure){
        getData('/deleteGroup','post',{"name": name,}).then(()=>{
          getData('/selectGroup','post',{"current": this.nowPage,"pageLen": $this.showNum,"user_id":this.user_id}).then((res)=>{
            var data = res.body.data;
            $this.list = data.group_lst;
          })
        })
      }
      
    },
   
    routerTo(e){
      var groupName = e.target.parentNode.children[4].innerHTML;
      this.$router.push({path:'/admin/groupList',query:{groupId:groupName}})
    },
    signOut(){
      doCookie('set','admin','')
      location.href = location.href;
    }
  },
   

  
  }
  
</script>

<style scoped>
  .admin{
    background:#eaedf1;
  }
  header{
    width:100%;
    height:50px;
    background:#373d41;
    color:#fff;
    line-height:50px;
    position: relative;
  }
  header h1{
    font-size:35px;
  }
  header span{
    position: absolute;
    text-align: right;
    top:0px;
    font-size:18px;
    right:20px;
    cursor: pointer;
    font-weight: bold;
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


  .login{
    width:500px;
    height:300px;
    border:3px solid #000;
    border-radius:30px;
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
    font-size:30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
  .login input{
    width:150px;
    height:25px;
  }
  .login button{
    font-size:25px;
    height:50px;
    width:100px;
    line-height:50px;
    background:#fff;
    border:1px solid #000;
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


  #qrcode{
    width:512px;
    height:512px;
    position: absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    margin:auto;
  }
</style>
