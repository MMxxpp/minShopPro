// index.js
// 获取应用实例

import { request } from "../../request/request";

const app = getApp()

//Page Object
Page({
  data: {
    swiperList:[],
    cartList:[],
    floorItem:[]
  },
  //options(Object)
  onLoad: function(options){
    this.getSwiperList();
    this.getCartList();
    this.getFloorItem()
  },

getSwiperList(){
  request({url:"/home/swiperdata"})
    .then(res =>{
      this.setData({
        swiperList:res
      })
    })
},

getCartList(){
  request({url:"/home/catitems"})
    .then(res =>{
      this.setData({
        cartList:res
      })
    })
},

getFloorItem(){
  request({url:"/home/floordata"})
  .then(res =>{
    this.setData({
      floorItem:res
    })
  })
},

  onReady: function(){
    
  },
  onShow: function(){
    
  },
  onHide: function(){

  },
  onUnload: function(){

  },
  onPullDownRefresh: function(){

  },
  onReachBottom: function(){

  },
  onShareAppMessage: function(){

  },
  onPageScroll: function(){

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item){

  }
});