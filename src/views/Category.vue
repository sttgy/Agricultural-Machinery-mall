<template>
  <div class="category">
    <van-nav-bar title="商品类型"></van-nav-bar>
    <div class="cateleft">
      <van-row>
        <van-col span="6" class="nav">
          <ul>
            <li @click="selectCategory(item.typeId,index)" :class="{active:active==index}" v-for="(item,index) in types" :key="index">
              {{item.typeName}}
            </li>
          </ul>
        </van-col>
        <van-col span="18" class="container">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list class="content" v-model="isLoading" @load="onLoad" :finished="finished">
              <div @click="goDetail(item._id)" class="content-item" v-for="(item,index) in productList" :key="index">
                <img :src="item.img">
                <p class="content-item-name">{{item.name}}</p>
                <p>￥{{item.price}}</p>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/service.config.js'
// @ is an alias to /src
export default {
  name: 'Category',
  components: {
    
  },
  data() {
    return {
      types:[],//类型信息
      active:0,
      productList:[],
      typeId:1,//当前选中类型的Id
      start:0,
      limit:10,
      finished:false,//数据是否加载完成
      isLoading:false//上拉加载
    }
  },
  created() {
    axios({
      url:url.getTypes,
    }).then(res=>{
      // console.log(res);
      this.types=res.data;
      this.selectCategory(this.typeId,this.active);
    }).catch(err=>{
      console.log(err);
    })
  },
  methods: {
    selectCategory(typeId,index){
      this.active=index;
      this.typeId=typeId;
      this.productList=[];
      this.finished=false;
      this.getProductList();
    },
    getProductList(){
      this.isLoading=true;
      axios({
        url:url.getProductsByType,
        method:'get',
        params:{
          typeId:this.typeId,
          start:this.productList.length,
          limit:this.limit
        }
      }).then(res=>{
        // console.log(res);
        if(res.data.length!=0){
          this.productList=this.productList.concat(res.data);
        }else{
          this.finished=true;
        }
        this.isLoading=false;
      }).catch(err=>{
        console.log(err);
      })
    },
    onLoad(){
      setTimeout(() => {
        this.getProductList();
      }, 2000);
    },
    onRefresh(){
      setTimeout(() => {
        this.productList=[];
        this.getProductList();
      }, 2000);
    },
    goDetail(id){
      //一
      // console.log(id);
      //动态路由传参之params方式
      //params传参的特点是：1它不会像query一样将参数用？号拼接到url地址栏中。
      //2当用户刷新页面后，传递的参数会丢失。
      // this.$router.push({
      //   name:'Detail',
      //   params:{
      //     id:id
      //   }
      // });
      
      //二
      //动态路由传参之query方式
      //query方式路由传参的特点：1它会像get一样把参数还会体现到URL的窗口里用？拼接。
      //2当用户刷新之后它传递的参数不会丢失。
      // this.$router.push({
      //   path:'/detail',
      //   query:{
      //     id:id
      //   }
      // })

      // 三
      this.$router.push(`/detail/${id}`);


    }
  },
}
</script>
<style lang="scss" scoped>
.nav{
  background-color: #eee;
  li{
    height:0.6rem;
    line-height:0.6rem;
    border-bottom:1px solid #fff;
    padding:3px;
    text-align:center;
  }
  .active{
    background:#ffffff;
  }
}
.container{
  position:fixed;
  top:46px;
  bottom:1rem;
  right:0;
  overflow-y:scroll;
}
.content{
  display:flex;
  flex-wrap:wrap;
  padding-bottom:1rem;
  &-item{
    width:40%;
    padding:0 10px;
    text-align:center;
    img{
      width:2rem;
      height:2rem;
    }
    &-name{
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;
      overflow: hidden;
      text-overflow:ellipsis;

    }
  }
}
</style>
