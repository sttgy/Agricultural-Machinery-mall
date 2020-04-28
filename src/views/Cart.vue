<template>
  <div class="cart">
    <van-nav-bar title="购物车"></van-nav-bar>
    <div class="card">
      <van-card v-for="(item,index) in productList" :key="index" :price="item.price" :desc="item.company" :title="item.name" :thumb="item.img">
        <div slot="footer">
          <van-button size="mini" @click="delCart(item._id,index)">删除</van-button>
        </div>
      </van-card> 
    </div>
    <van-submit-bar class="submit-bar" :price="totalPrice" button-text="提交订单" @submit="onSubmit"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
import url from '@/service.config.js'
// @ is an alias to /src
export default {
  name: 'Cart',
  components: {
    
  },
  data() {
    return {
      productList:[]

    }
  },
  computed: {
    ...mapState(['userInfo']),
    totalPrice(){
      //reduce这个函数是用来接收一个累加器，
      return this.productList.reduce((sum,elem)=>{
        sum+=elem.price;
        return sum;
      },0)*100;
    }
  },
  created() {
    //验证用户是否登录
    if(JSON.stringify(this.userInfo)==="{}"){
      this.$toast.fail('请登录');
      setTimeout(() => {
        this.$router.push('/profile');
      },1000);
    }else{
      axios({
        url:url.getCart,
        method:'get',
        params:{
          userId:this.userInfo._id
        }
      }).then(res=>{
        // console.log(res.data)
        for(let item of res.data){
          this.productList.push(item.productId);
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  methods: {
    onSubmit(){
      this.$toast.success('进入付款页面')
    },
    delCart(id,index){
      //删除数据库中的数据，如果删除成功，进入回调函数，在回调函数中
      //如下
      // this.productList.splice(index,1);
      axios({
        url:url.removeCart,
        method:'get',
        params:{
          Id:id
        }
      }).then(res=>{
        console.log(res);
        this.productList.splice(index,1);
      }).catch(err=>{
        console.log(err)
      })
    }
  },
}
</script>
<style lang="scss" scoped>
  .submit-bar{
    margin-bottom:1rem;
  }
</style>