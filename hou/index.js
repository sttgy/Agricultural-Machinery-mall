const Koa=require('koa');
const App=new Koa();

//解决跨域问题
const cors=require('koa2-cors');
App.use(cors({
    origin:['http://localhost:8080'],
    credentials:true
}));
//接收前端post请求
const bodyParser=require('koa-bodyparser');
App.use(bodyParser());
//加载路由
const Router=require('koa-router');
let user=require('./controller/user.js');
//登录和注册的路由注册
let router=new Router();
router.use('/user',user.routes());
//分类的路由注册
let product=require('./controller/product.js');
router.use('/product',product.routes());
//配置type的路由地址
let type=require('./controller/type.js');
router.use('/type',type.routes());
//配置购物车的路由
let cart=require('./controller/cart.js');
router.use('/cart',cart.routes());
//装载
App.use(router.routes());
App.use(router.allowedMethods());

const {connect,initSchemas}=require('./init.js');
(async ()=>{
    await connect();
    initSchemas()
})();
App.use(async (ctx)=>{
    ctx.body='张伟'
})

App.listen(3000,()=>{
    console.log('服务已经正常启动')
})