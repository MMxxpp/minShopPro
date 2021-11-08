

export const login=()=>{
    return new Promise((resolve,reject)=>{
        wx.login({
            timeout:10000,
            success: (result)=>{
                resolve(result);
            },
            fail: (error)=>{
                reject(error);
            }
        });
    })    
}

//微信调用自身的支付功能

/**
 * 
 * @param {object} pay //支付所必要参数
 * @returns 
 */
export const payMent=(pay)=>{
    return new Promise((resolve,reject)=>{
        wx.requestPayment({
            ...pay,
            success: function(res){
                resolve(res);
            },
            fail: function(err){
                reject(err);
            }
        })
    })
}