
//设置发送异步请求的次数
let ajaxNum=0
export const request=(params)=>{
    
    //例如首页同时发送三次，则ajaxNum=3
    ajaxNum++;
    wx.showLoading({
        title: '加载中',
        mask: true
    });
      
    return new Promise((resolve,reject) =>{
        const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1";
        wx.request({
           ...params,
           url:baseUrl+params.url,
           success:function(res){
               //将.data.message放在初始化数据中
               resolve(res.data.message)
           },
           fail:function(err){
            reject(err);
           },
           //请求完成后触发，与数据接收成不成功没有关系
           complete: function() {
            ajaxNum--;
            //当n次AjaxNum变为0，则开始关闭加载中功能
            // 否则会出现第一个加载出来后直接被关闭了
            if(ajaxNum===0){
                wx.hideLoading()
            }
           }

    })
})
}