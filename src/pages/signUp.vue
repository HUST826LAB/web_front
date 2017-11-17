
<template>
  <div class="sign-up">
    <img src="../assets/signUp-1.png" class="signUp-1" alt="">
    <div class="sign-body">
      <span class="check-res" >{{this.checkRes}}</span>
      <div  class="input name">
        用户名:<input type="text" @blur="check" v-model="uname" maxlength="20" placeholder="用户名只能包含字母和数字">        
      </div>
      <div class="input password">
        密码:<input  v-model="password" type="password">
      </div>
      <div class="input password1">
        确认密码:<input v-model="password1" @keyup="checkPassword" type="password">
      </div>
      <span class="password-text">{{passwordText}}</span>
      <button @click="submit">确认</button>
    </div>
    <img class="signUp-2" src="../assets/signUp-2.jpg" alt="">
    <transition name="fade">
        <div class="drump" v-show="alert">
            <div>
                <span>{{warn}}</span>
                <br>
                <span>马上跳转O(∩_∩)O~~</span>
            </div>
        </div>
    </transition>
  </div>
  
</template>

<script>
import getData from '@/server/vue-resource'
import sha from '@/server/sha'
import docookie from '@/server/docookie'
export default {
  name: 'app',
  data:function () {
    return {
      uname:'',
      checkRes:'',
      nameState: false,
      password:'',
      password1:'',
      passwordText:'',
      passwordState: false,
      postData:{},
      alert:false,
      warn:''
    }
  },
  components:{
  },
  methods:{
    submit(){
      var postData = this.postData
      if(this.nameState && this.passwordState) {
        var sha1 = new sha('SHA-1','TEXT')
        var $self = this
        sha1.update(this.password)
        postData.password = sha1.getHash('HEX')
        postData.username = this.uname;
        postData.res_id =this.$route.query.resId.toString();
        console.log(postData)
        getData('/signUp','post',JSON.stringify(postData)).then((res)=>{
          console.log(res)
          if(res.status == 200) {
            if(res.body.msg=="成功"){
              docookie('set','username', res.body.data.username)
              docookie('set','user_id', res.body.data.user_id)
              $self.alert = true;
              $self.warn = '注册成功'
              setTimeout(function () {
                $self.$router.push({path:'/game?none=1'})
              },1000)
            }else{
              $self.alert = true;
              $self.warn = '注册失败，重新打开再试一下吧'
              doCookie('set','user_id','')
            }
            // setTimeout(()=>{
            //   location.href = 'game?none=1'
            // },1000)
            // $self.$router.push({path:'/'})
          }
        })
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
    },
    check(){
      var uname = this.uname;
      var reg = /^[0-9a-zA-Z]+$/;
      var check = reg.test(uname);
      if(check){
        getData('/checkUsername?username=' + uname,'get').then((res)=>{
          console.log(res)
          this.checkRes = res.body.data
          if(res.body.data == "该用户名可以使用!"){
            this.nameState = true
          }else{
            this.nameState = false
          }

        }) 
      }else{
        this.checkRes = '用户名只能由字母和数字组成'
      }
      
    },
    checkPassword(){
      if(this.password !== this.password1){
        this.passwordText = '两次输入密码不一致，请重新输入'
        this.passwordState = false
      }else{
        this.passwordText = ''
        this.passwordState = true
      }
    }
  }
  
  
}
</script>

<style scoped>
  .sign-up{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    flex-wrap: wrap;
  }
  .signUp-1{
    align-self:flex-end;
    width: 1.3333333333333333rem;
  }
  .sign-body{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .check-res{
    color:red;
  }
  input{
    height:0.38333333333333336rem;
    border:0.03rem solid #000;
    border-radius: 0.06666666666666667rem;
    width:1.8333333333333333rem;
    margin-left:0.1rem;
    font-size:0.15rem;
    line-height:0.16666666666666666rem;
    padding:0 .03rem
  }
  input:focus{
    outline:0;
  }
  .input{
    display: flex;
    text-align:right;
    justify-content: space-between;
    margin-bottom:0.43666666666666665rem;
    line-height:0.38333333333333336rem;
    width:3rem;
  }
  .password1{
    margin-bottom:0;
  }
  button{
    width:1.3333333333333333rem;
    height:0.43333333333333335rem;
    border:0.03rem solid #000;
    border-radius:0.06666666666666667rem;
    font-size:0.3rem;
    background: #fff;
    line-height:0.43333333333333335rem;
  }
  .signUp-2{
    width:1.3333333333333333rem;
    align-self:flex-end;
  }
  .password-text{
    color:red;
    margin-bottom:.4366rem;
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
</style>
