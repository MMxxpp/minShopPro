import { request } from '../../request/request';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs:[
            {
                id:0,
                value:'全部',
                isActive:true
            },
            {
                id:1,
                value:'待付款',
                isActive:false
            },
            {
                id:2,
                value:'待收货',
                isActive:false
            },
            {
                id:3,
                value:'退款/退货',
                isActive:false
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    tabsTurn(e){
        // console.log(e);
        let {index}=e.detail;
        let tabs=this.data.tabs;
        tabs.forEach((item,i) => {
                i===index?item.isActive=true:item.isActive=false;
            });
            this.setData({
                tabs
            })
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

        const token =wx.getStorageSync('token');
        if(!token){
            wx.navigateTo({
                url: '../auth/auth'
            })
            return;
        }

        //onshow没有options，所以只能通过getCurrentPages()
        //getCurrentPages().length-1表示最大索引及当前页面
        //{options}就是上面的属性之一，也就能获取type
        let {options} =getCurrentPages()[getCurrentPages().length-1];
        console.log(options);

        this.getOrders(options);
    },

    async getOrders(type){
      const res = await request({url:'/my/orders/all',data:type})  
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