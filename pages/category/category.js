import {request} from '../../request/request'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        leftCateList:[],
        rightCateList:[],
        case:[],
        currentIndex:0,
        scrollTop:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //利用缓存机制，将数据缓存到服务器，需要的时候直接调用
        // 不用连续发送请求
       let Cates=wx.getStorageSync('cates');
       if(!Cates){
           this.getCateMess();
       }else{
           //如果存储了Cates数据
           if(Date.now()-Cates.time>=1000*15){
               //在15秒时间外便重新获取数据
            this.getCateMess();
           }else{
            //    15秒时间内，使用缓存在本地服务器中的数据
            console.log('获取旧数据')
               this.case=Cates.data;
               let leftCateList=this.case.map(item => item.cat_name);
               let rightCateList=this.case[0].children.map(item => item);
   
               this.setData({
                   leftCateList,
                   rightCateList
               })
           }
       }
    },
    
    async getCateMess(){
        // request({url:'/categories'})
        // .then(res =>{
        //     console.log(res);
        //     this.case=res.data.message;

        //     //把接口数据存储在本地服务器中
        //     //存储当前时间和case数据
        //     wx.setStorageSync('cates', {time:Date.now(),data:this.case});

        //     let leftCateList=this.case.map(item => item.cat_name);
        //     let rightCateList=this.case[0].children.map(item => item);

        //     this.setData({
        //         leftCateList,
        //         rightCateList
        //     })
        // })

        //使用ES7的async和await
        const res=await request({url:'/categories'});
        this.case=res;

            //把接口数据存储在本地服务器中
            //存储当前时间和case数据
            wx.setStorageSync('cates', {time:Date.now(),data:this.case});

            let leftCateList=this.case.map(item => item.cat_name);
            let rightCateList=this.case[0].children.map(item => item);

            this.setData({
                leftCateList,
                rightCateList
            })
    },

    selectIndex(e){
        // console.log(e); 
        //解构赋值
        let {index} = e.currentTarget.dataset;
        let rightCateList=this.case[index].children.map(item => item);
        this.setData({
            currentIndex:index,
            rightCateList,
            // 点击左侧拦的时候，右边的商品信息推到顶部
            scrollTop:0
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