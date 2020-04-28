import Mock from 'mockjs' 
import data from './mock.json'
Mock.mock('http://www.weichuang.com/getList',{data:data.list});

Mock.mock('http://www.weichuang.com/getUser',{
    'name|2':'zhangwei',
    'age|18-35':20
});

Mock.mock('http://www.zhangwei.com/regexp',{
    'regexp1':/[a-z][A-Z][0-9]/,
    'regexp2':/\d{5,10}/
});
Mock.mock('http://www.zhangwei.com/list',{
    'info|10-20':[//随机生成10-20的数据信息
        {
            'index|+1':1,//生成从1开始，然后自增1的数字。
            'name':'@first @last',//随机生成英文名字
            'id':'@integer(10000,99999)',//随机生成10000-99999的id
            'date':'@datetime',//随机生成时间
            'img':'@image("200*200")',//生成200*200的图片
            'text':'@sentence(6,22)'//6-22的文本
        }
    ]
});

let Random=Mock.Random;
let productData=()=>{
    let productList=[];//存放农机信息的数组
    for(let i=0;i<100;i++){
        let product={
            name:Random.ctitle(5,20),//生成随机的名字5-20位；
            img:Random.dataImage('125*125','农机'+Random.integer(1,100)),//不传参数就是随机生成的色块；
            price:Random.integer(1000,10000),//随机1000到10000的价格
            owner:Random.cname()//生成中文名字
        };
        productList.push(product);
    }
    return productList;
};
Mock.mock('http://www.zhangwei.com/getVarietyItem',productData)




