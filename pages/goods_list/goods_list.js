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
                value:'综合',
                isActive:true
            },
            {
                id:1,
                value:'销量',
                isActive:false
            },
            {
                id:2,
                value:'价格',
                isActive:false
            }
        ],
        goodsList:[],
        //总页数
        totalPage:1
        // queryParams:{
        //     query:'',
        //     cid:"",
        //     pagenum:1,
        //     pagesize:10
        // }
    },

    queryParams:{
        query:'',
        cid:"",
        pagenum:1,
        pagesize:10
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        this.queryParams.cid=options.cid;
        // console.log(options);
        this.getGodsList();
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

    async getGodsList(){
        const res =await request({url:'/goods/search',data:this.queryParams})
        // console.log(res);
        //获取总条数
        const total =res.total;

        this.totalPage =Math.ceil(total/this.queryParams.pagesize);
        console.log(this.totalPage);
        //多条数据时要对之前的数据进行拼接才行
        this.setData({
            goodsList:[...this.data.goodsList,...res.goods]
        })

        //下拉刷新数据出来立刻关闭下拉刷新
        wx.stopPullDownRefresh();
    },


    /**
     * 页面上拉触底事件的处理函数
     */
     onReachBottom: function () {
        // console.log("123");
        if(this.queryParams.pagenum>=this.totalPage){
            wx.showToast({
                title: '已经到最后一页了！'
            });
        }else{
            this.queryParams.pagenum++;
            this.getGodsList();
        }
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
     onPullDownRefresh: function () {
         //goodsList数据重置
         this.setData({
             goodsList:[]
         })
        //  重新调用
         this.getGodsList();
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})