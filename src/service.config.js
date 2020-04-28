const MOCKURL="http://www.zhangwei.com/";//统一接口
const SERVERURL='http://localhost:3000/';//真实的url

const URL={
    getVarietyItem:MOCKURL+'getVarietyItem',
    getHotProduct:MOCKURL+'getHotProduct',
    registUser: SERVERURL+'user/registUser',
    loginUser: SERVERURL+'user/loginUser',
    getTypes:SERVERURL+'type/getTypes',
    getProductsByType:SERVERURL+'product/getProductsByType',
    getDetail: SERVERURL+'product/getDetail',
    addCart:SERVERURL+'cart/addCart',
    getCart:SERVERURL+'cart/getCart',
    removeCart:SERVERURL+'cart/removeCart'
};

export default URL