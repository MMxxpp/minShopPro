import { request } from '../../request/request';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goods:[],
        time:-100,
        isHide:true,
        inputValue:''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    handleSearch(e){
        const {value} =e.detail;
        if(!value.trim()){
            this.setData({
                goods:[],
                isHide:true
            })
            return
        }

        //当输入时，取消按钮出现
        this.setData({
            isHide:false
        })
        //防抖动
        clearTimeout(this.time);
        this.time=setTimeout(()=>{
            this.search(value)
        },1000)

    },

    async search(query){
        const res=await request({url:'/goods/search',data:{query}})
        // console.log(res);
        this.setData({
            goods:res.goods
        })
    },

    handleHide(){
        this.setData({
            goods:[],
            isHide:true,
            inputValue:''
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