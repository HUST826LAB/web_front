
<template>
  <div class="sign-up">
    <img src="../assets/signUp-1.png" class="signUp-1" alt="">
    <div class="sign-body">
      <span class="check-res" >{{this.checkRes}}</span>
      <div  class="input name">
        用户名:<input type="text" v-model="uname" maxlength="20" placeholder="用户名只能包含字母和数字">        
      </div>
      <div class="input password">
        密码:<input  v-model="password" type="password">
      </div>
      <!-- <div class="input password1">
        确认密码:<input v-model="password1" @keyup="checkPassword" type="password">
      </div> -->
      <span class="password-text">{{passwordText}}</span>
      <button @click="submit">确认</button>
    </div>
    <img class="signUp-2" src="../assets/signUp-2.jpg" alt="">
  </div>
  
</template>

<script>
import getData from '@/server/vue-resource'
import sha from '@/server/sha'
import doCookie from '@/server/docookie'
export default {
  name: 'app',
  data:function () {
    return {
      uname:'',
      checkRes:'',
      password:'',
      password1:'',
      passwordText:'',
      postData:{}
    }
  },
  components:{
  },
  methods:{
    submit(){
      var postData = this.postData
        var sha1 = new sha('SHA-1','TEXT')
        const $self = this;
        sha1.update(this.password)
        postData.password = sha1.getHash('HEX')
        postData.username = this.uname;
        console.log(JSON.stringify(postData))
        getData('/signIn','post',JSON.stringify(postData)).then((res)=>{
          console.log(res)
          if(res.status == 200){
            if(res.body.msg == '失败'){
              $self.checkRes = '用户名或密码错误'
            }else{
              doCookie('set','username',postData.username)
              doCookie('set', 'user_id', res.body.data.user_id)
              $self.$router.push('/?mine')
            }
          }
        })
      
      
    },

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
</style>
