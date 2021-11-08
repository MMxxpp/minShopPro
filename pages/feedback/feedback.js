// pages/feedback/feedback.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs:[
            {
                id:0,
                value:'体验反馈',
                isActive:true
            },
            {
                id:1,
                value:'商品、商家投诉',
                isActive:false
            }
        ],
        imageAll:[]
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

    handleImg(){
        wx.chooseImage({
            count: 9,
            sizeType: ['original','compressed'],
            sourceType: ['album','camera'],
            success: (result)=>{
                console.log(result);
                //将获取到的图片存起来
                //用数组的形式拼接
                this.setData({
                    imageAll:[...this.data.imageAll,...result.tempFilePaths]
                })
            },
            fail: ()=>{},
            complete: ()=>{}
        });
    },

    handleRemove(e){
        // console.log(e);
        //获取要删除的图片index
        const {index} =e.currentTarget.dataset;
        let {imageAll} = this.data;
        imageAll.splice(index,1);
        this.setData({
            imageAll
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