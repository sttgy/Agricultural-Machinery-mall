<template>
  <div class="profile">
    <van-tabs>
      <van-tab title="登录">
        <van-cell-group>
          <van-field label="用户名" required clearable placeholder="请输入用户名" v-model="loginUsername"></van-field>
          <van-field label="密码" type="password" required clearable placeholder="请输入密码" v-model="loginPassword"></van-field>
        </van-cell-group>
        <div>
          <van-button @click="login" type="primary" size="large">登录</van-button>
        </div>
      </van-tab>
      <van-tab title="注册">
         <van-cell-group>
          <van-field label="用户名" required clearable placeholder="请输入用户名" v-model="registUsername"></van-field>
          <van-field label="密码" type="password" required clearable placeholder="请输入密码" v-model="registPassword"></van-field>
        </van-cell-group>
        <div>
          <van-button @click="regist" type="primary" size="large">注册</van-button>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import url from '@/service.config.js'
import {mapActions} from "vuex"
export default {
  name: 'Profile',
  components: {
    
  },
  data(){
    return{
      loginUsername:'',
      loginPassword:'',
      registUsername:'',
      registPassword:''
    }
  },
  methods: {
    ...mapActions(['loginAction']),
    //注册的函数
    regist(){
      axios({
        url:url.registUser,
        method:'post',
        data:{
          userName:this.registUsername,
          password:this.registPassword
        }
      }).then(res=>{
        if(res.data.code==200){
          this.$toast.success('注册成功了');
          this.registUsername="";
          this.registPassword=""
        }else{
           this.$toast.fail('注册失败!');
        }
      }).catch(err=>{
        console.log(err);
       this.$toast.fail('抱歉，注册失败!');
      });
    },
    //登录的函数
    login(){
      axios({
        url:url.loginUser,
        method:'post',
        data:{
          userName:this.loginUsername,
          password:this.loginPassword
        }
      }).then(res=>{
        if(res.data.code==200){
         //模拟网络环境不好的延迟，用Promise去管理异步操作
         new Promise((resolve)=>{
           setTimeout(() => {
             resolve();
           }, 1000);
         }).then(()=>{
           this.$toast.success('登录成功');
           //保存登录状态
           this.loginAction(res.data.userInfo);
           this.$router.go(-1);
         }).catch(err=>{
           this.$toast.fail('保存登录状态失败');
           console.log(err);
         });
        }
      }).catch(err=>{
        console.log(err);
        this.$toast.fail('登录失败')
      })
    }
  },
}
</script>
<style scoped>

</style>