// pages/cart/cart.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address:{},
        cart:[],
        allChecked:false,
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

    //处理复选框事件
    handleChecked(e){
        // console.log(e);
        // 先获取id
        let {id}=e.currentTarget.dataset;
        let {cart}=this.data;
        //通过索引改变cart对应的值
        let index=cart.findIndex(item=>item.goods_id===id);
        cart[index].checked=!cart[index].checked;
        this.setAllcart(cart);
        // console.log(id);
    },

    //处理全选复选框
    handleAllcheck(){
        // console.log(1);
        // let [cart,allChecked] =[this.data.cart,this.data.allChecked];
        let {cart,allChecked} =this.data;
        allChecked=!allChecked;
        //全选或全不选
        cart.forEach(item =>item.checked=allChecked);
        this.setAllcart(cart);
    },


    //将数量减一
    handleItemNUm(e){
        let {changenum,id} =e.currentTarget.dataset;
        // console.log(e);
        let {cart} =this.data;
        let index =cart.findIndex(item=>item.goods_id===id);
        if(cart[index].num===1&&changenum===-1){
            let that =this;
            wx.showModal({
                title: '提示',
                content: '是否删除本商品？',
                success (res) {
                  if (res.confirm) {
                    // console.log('用户点击确定')
                    cart.splice(index,1);
                    that.setAllcart(cart);
                  } else if (res.cancel) {
                  }
                }
              })
        }else{
            
            cart[index].num+=changenum;
            this.setAllcart(cart);
        }
    },

    //处理跳转支付页面
    handlePay(){
        console.log(1);
        let {address,totalNum} =this.data;
        if(!address.userName){
            wx.showToast({
                title: '您还没有添加地址',
            icon: 'none'
              })
              return;
        }
        if(totalNum===0){
        wx.showToast({
            title: '您还没有添加商品',
            icon: 'none'
        });
        return;
        }

        wx.navigateTo({
            url: '/pages/pay/pay'
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
        let address=wx.getStorageSync('address');
        let cart=wx.getStorageSync('cart')||[];
        this.setData({
            address
        })
        this.setAllcart(cart);
    },


    setAllcart(cart){
        let totalPrice=0;
        let totalNum=0;
        let allChecked=true;
        //当商品的选择状态又一个为false时，allChecked为false
        //利用every属性
            //如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测。
            //如果所有元素都满足条件，则返回 true。
        //let allChecked=cart.length?cart.every(item=>item.checked):false;
        cart.forEach(item=>{
            if(item.checked){
                totalPrice+=item.num*item.goods_price;
                totalNum+=item.num;
            }else{
                allChecked=false
            }
        })
        allChecked=cart.length?allChecked:false;
        this.setData({
            cart,
            allChecked,
            totalPrice,
            totalNum
        })

        wx.setStorageSync('cart', cart)
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