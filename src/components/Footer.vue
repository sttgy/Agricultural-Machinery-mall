<template>
    <div class="footer">
        <van-tabbar v-model="active" @click="change">
            <van-tabbar-item icon="wap-home-o" to="/">首页</van-tabbar-item>
            <van-tabbar-item icon="records" to="/category">分类</van-tabbar-item>
            <van-tabbar-item icon="cart" to="/cart">购物车</van-tabbar-item>
            <van-tabbar-item icon="contact" to="/profile">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
export default {
    name:'Footer',
    components:{

    },
    data(){
        return{
        active:0
        }
    },
    created() {
        this.active=parseInt(localStorage.getItem('active'));
    },
    methods: {
        change(active){
            localStorage.setItem('active',active);
        }
    },
}
</script>
<style scoped>

</style>

