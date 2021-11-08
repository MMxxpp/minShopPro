import {request} from '../../request/request'
import regeneratorRuntime from '../../lib/runtime/runtime';
import {payMent} from '../../utils/asyncwx'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address:{},
        cart:[],
        totalPrice:0,
        totalNum:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    // 获取收货地址
    choseAddress(){
        wx.chooseAddress({
            success: (result)=>{
                result.addressAll=result.provinceName
        +result.cityName+result.countyName+result.detailInfo
                wx.setStorageSync('address', result);
            }
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let address=wx.getStorageSync('address');
        let cart=wx.getStorageSync('cart')||[];

        //过滤后购物车数组，为true过滤出来
        cart=cart.filter(item=>item.checked)
        let totalPrice=0;
        let totalNum=0;
        //新数组，cart中的数据只为被选中的商品
        cart.forEach(item=>{
            totalPrice+=item.num*item.goods_price;
                totalNum+=item.num;
        })
        this.setData({
            address,
            cart,
            totalPrice,
            totalNum
        })
    },

    async handlePay(){
        let token=wx.getStorageSync('token');
        if(!token){
            wx.navigateTo({
                url: '/pages/auth/auth'
            })
            return;
        }
        //请求头参数
        let header ={Authorization:token};
        //请求体参数
        //请求体参数中需要完整地址addressAll，否则无法拿到order_number
        let [order_price,consignee_addr]=[this.data.totalPrice,this.data.address.addressAll];
        let goods=[];
        let cart =this.data.cart;
        cart.forEach(item =>{
            goods.push(
                {
                    goods_id:item.goods_id,
                    goods_number:item.num,
                    goods_price:item.goods_price
                }
            )
        })
        const payParams={order_price,consignee_addr,goods};
        const {order_number}=await request({url:'/my/orders/create',data:payParams,method:'post',header});
        // console.log(order_number);
        //发起预支付接口
        const {pay} =await request({url:'/my/orders/req_unifiedorder',method:'post',header,data:{order_number}});
        const res= await payMent(pay);
        console.log(res);
    },




    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})