<template>
  <div class="pages">
      <ul>
        <li @click="top" v-show="nowPage>2">首页</li>
        <li @click="up" v-show="nowPage >0">上一页</li>
        <!-- 此处使用v-for进行渲染，渲染依据数组为computed中的pages -->
        <li @click="changePage" v-for="num in pages" :class="{active : num == nowPage}">{{num+1}}</li>
        <li @click="down" v-show="nowPage<sum-1">下一页</li>
        <li @click="bottom" v-show="sum-nowPage >3">尾页</li>
      </ul>
  </div>
</template>

<script>
import getData from '@/server/vue-resource'
export default {
  name:'fenye',
  props:{
    user_id:{
      
    },
    sendText:{},
    url:{},
    listName:{}
  },
  data () {
    return {
      nowPage:0,//现在的页数
      arr:[],//所有页数都存在这是，之后进行切割来显示
      sum:0,//总页数
      showNum:10,//内容显示条目，用来传给后台
      listNum:5//页数显示条目
    }
  },
  created:function () {
    var $this = this;
    //此处为从后台获取数据
    var obj = {"current": "0",
      "pageLen": $this.showNum};
    obj[this.sendText] = this.user_id
    console.log(obj)
    getData($this.url,'post',obj).then((res)=>{
        console.log(res.body)
        var data = res.body.data;
        var arr = $this.arr;
        //对获取到的总页数进行处理，根据总页数来改变页数显示条目
        if(data.sum >=5){
          $this.listNum = 5;
        }else if(data.sum>=3 && data.sum<5){
          $this.listNum = 3
        }else{
          $this.listNum = 1
        }
        for(let i = 0;i < data.sum;i++){
          arr.push(i)
        }
        //此处为向父组件传递参数，传递数据为一个数组
        $this.$emit('setList',data[$this.listName])
        //设置总页数
        $this.sum = data.sum
      })
  },
  methods:{
    //分页部分
    //监听数字点击事件，当点击时获取点击数字，将nowPage设置为对应数字
    changePage(e){
      var num = e.target.innerHTML -1;
      this.nowPage = num;
    },
    //首页
    top(){
      this.nowPage = 0;
    },
    //上一页
    up(){
      this.nowPage = this.nowPage - 1;
    },
    //下一页
    down(){
      this.nowPage = this.nowPage + 1;
    },
    //尾页
    bottom(){
      this.nowPage = this.sum-1;
    },
    //先看下面的watch，其中有触发本方法的代码，此方法触发后向后台请求对应nowPage页的数据
    _list(){
      var $this = this;
      var obj = {"current": $this.nowPage,
      "pageLen": $this.showNum};
      obj[this.sendText] = this.user_id
      getData($this.url,'post',obj).then((res)=>{
        var data = res.body.data;
        $this.$emit('setList',data[$this.listName])
      })
    },
  },
  computed:{
    //计算属性pages，决定了显示的数字是哪些进行了一些逻辑判断，当nowPage改变时运行
    pages:function () {
      var num = this.nowPage;
      var arr = this.arr
      var sum = arr.length;
      var listNum = this.listNum;
      if(listNum == 5){
        if(num < 2){
          return arr.slice(0,5)
        }else if(num >= sum - 2 ){
          return arr.slice(sum-5,sum)
        }else{
          return arr.slice(num -2,num+3)
        }
      }else if(listNum == 3){
        if(num < 2){
          return arr.slice(0,3)
        }else if(num >sum -2){
          return arr.slice(sum -3,sum)
        }else{
          return arr.slice(num -1,num+2)
        }
      }else{
        return arr
      }
      
    },
    
  },
  watch:{
    //监听nowPage变化，如果变化则触发method中的_list方法
    nowPage:function () {
      this._list()
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
