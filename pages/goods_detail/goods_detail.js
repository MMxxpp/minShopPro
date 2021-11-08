import {request} from '../../request/request'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsDetail:[],
        isCollect:false
    },

    //小问题：data中的数据不能用，得用全局变量的goodsInfo
    goodsInfo:[],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const {goods_id} = options;
        // console.log(goods_id);
        this.getGoodsDetail(goods_id);
    },

    //点击收藏按钮
    handleColect(){
        let isCollect=false;
        let collect=wx.getStorageSync('collect')||[];
        let index = collect.findIndex(v=>v.goods_id===this.goodsInfo.goods_id);
        if(index!==-1){
            collect.splice(index,1);
            isCollect=false;
            wx.showToast({
                title:'取消成功',
                icon:'success',
                mask:true
            })
        }else{
            collect.push(this.goodsInfo);
            isCollect=true;
            wx.showToast({
                title:'收藏成功',
                icon:'success',
                mask:true
            })
        }

        wx.setStorageSync('collect', collect)
        this.setData({
            isCollect
        })
    },

    async getGoodsDetail(goods_id){
        const res = await request({url:'/goods/detail',data:{goods_id}})
        this.goodsInfo=res;
        let collect= wx.getStorageSync('collect')||[];
        let isCollect=collect.some(v=>v.goods_id===this.goodsInfo.goods_id)
        // console.log(res);
        this.setData({

            //动态优化数据，将需要的传递进来
            goodsDetail:{
                goods_price:res.goods_price,
                goods_name:res.goods_name,
                goods_introduce:res.goods_introduce,
                pics:res.pics
            },
            isCollect
        })
    },

    clickImage(e){
        // 构造要预览的图片数组
        const urls=this.goodsInfo.pics.map(v=>v.pics_mid);
        console.log(e);
        //构建当前点击的图片链接
        const current=e.currentTarget.dataset.url;
        wx.previewImage({
            current,
            urls
        });
    },

    addCart(){
        //先获取缓存中是否有cart数据，若没有给复制数组
        let cart=wx.getStorageSync('cart')||[];

        let index=cart.findIndex(item =>item.goods_id===this.goodsInfo.goods_id);

        if(index==-1){
            //查找不到返回-1并添加数据进去
            this.goodsInfo.num=1;
            //添加默认选中复选框状态
            this.goodsInfo.checked=true;
            cart.push(this.goodsInfo);
        }else{
            //若存在则给num++
            //cart中第index对象的num
            cart[index].num++;
        }

        //把购物车中物品添加进缓存
        wx.setStorageSync('cart', cart);
        wx.showToast({
            title: '添加成功',
            icon: 'success',
            mask: true
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
        //let {options} =getCurrentPages()[getCurrentPages().length-1];
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