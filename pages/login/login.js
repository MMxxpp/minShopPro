// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    
    // getUserInfo(e){
    //     // console.log(e);
    //     const {userInfo} =e.detail;
    //     wx.setStorageSync('userInfo', userInfo);
    //     wx.navigateBack({
    //         delta: 1    // 回退前 delta(默认为1) 页面
    //     })
    // },

    getUserInfo(){
        wx.getUserProfile({
            desc: '获取用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
            // 也可以直接在这里保存,方便在全局使用 
             wx.setStorageSync('userInfo',res.userInfo); 
             wx.navigateBack({
                delta: 1 // 回退前 delta(默认为1) 页面
              
            })
            }
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