const Koa=require('koa');
const Router=require('koa-router');
let router=new Router();
const mongoose=require('mongoose');
const fs=require('fs');

router.get('/insertProductInfo',async (ctx)=>{
    fs.readFile('./data/product.json','utf8',(err,data)=>{
        //得到字符串，我们将字符串转化为对象。
        data=JSON.parse(data);
        console.log(data);
        let count=0;//计数器，读取数据的条数
        //导入模型mongoose
        const Product=mongoose.model('Product')
        //遍历读取到的数据
        data.map((value,index)=>{
            console.log(value);
            let product=new Product(value);
            //随机生成类型，从1-8；
            product.type=Math.floor(Math.random()*8)+1;
            product.save().then(()=>{
                count++;
                console.log('成功'+count);
            }).catch(err=>{
                console.log('失败'+err);
            });
        });
    });
    //读取文件完成以后需要有一个body文件产生
    ctx.body='导入数据';
});
router.get('/getProductsByType',async (ctx)=>{
    const Product=mongoose.model('Product');
    await Product.find({type:ctx.query.typeId}).skip(parseInt(ctx.query.start))
    .limit(parseInt(ctx.query.limit)).exec().then(res=>{
        ctx.body=res;
    })
});

router.get('/getDetail',async (ctx)=>{
    const Product=mongoose.model('Product');
    await Product.findOne({_id:ctx.query.id}).exec().then(res=>{
        ctx.body=res
    })
})
module.exports = router;