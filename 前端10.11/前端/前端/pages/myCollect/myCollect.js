Page({

  /**
   * 页面的初始数据
   */
  data: 
  {
      collectList: [],
      objectId: '',
      collectId: ''
  },

  collectCancel(e)
  {
      this.setData
        ({
          collectId: e.detail.value.collectId
        });
        console.log(this.data);

        wx.request
        ({
            url: 'http://127.0.0.1:8083/user/collectCancel',
            header: getApp().globalData.header,  
            data: 
            {
              collectId: this.data.collectId
            },
            method: 'post',
            success: function (res) 
            {
                console.log("成功");
                console.log(res.data);

                if (res.data.status == 10007)
                {
                  wx.showToast
                  ({
                      title: '用户未登录',
                      icon:'none',
                  })
                }else if (res.data.status == 10013)
                {
                  wx.showToast
                  ({
                      title: '取消收藏失败，请重试',
                      icon:'none',
                  })
                }else if (res.data.status == 10000)
                {
                  wx.redirectTo
                  ({
                    url: '/pages/myCollect/myCollect',
                  })
                  wx.showToast
                  ({
                      title: '取消成功',
                      icon:'none',
                  })
                }
                
            },
            fail:(err)=>
            {
                console('请求失败',err);
            }
        })
  },


  formSubmit(e)
  {  
        this.setData
        ({
              objectId: e.detail.value.objectId
        });
        console.log(this.data);
        wx.setStorageSync('ObjectId', this.data.objectId);

        wx.request
        ({
            url: 'http://127.0.0.1:8083/user/showPerRe',
            header: getApp().globalData.header,  
            data: {},
            method: 'get',
            success: function (res) 
            {
                console.log("成功");
                console.log(res.data);

                if (res.data.status == 10007)
                {
                  wx.showToast
                  ({
                      title: '用户未登录',
                      icon:'none',
                  })
                }else if (res.data.status == 10030)
                {
                  wx.showToast
                  ({
                      title: '还未创建个人简历',
                      icon:'none',
                  })
                }else if (res.data.status == 10000)
                {
                  wx.setStorageSync('personalResume', res.data.data);
                  wx.navigateTo
                  ({
                      url: '/pages/resume-sent/resume-sent',
                  })
                }
                
            },
            fail:(err)=>
            {
                console('请求失败',err);
            }
        })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) 
  {
      wx.request
      ({
          url: 'http://127.0.0.1:8083/user/collectList',
          header: getApp().globalData.header,  
          data:{},
          method: 'get',
          success:(res)=>
          {
              console.log('请求成功：',res);

              if (res.data.status == 10007)
                {
                  wx.showToast
                  ({
                      title: '用户未登录',
                      icon:'none',
                  })
                }else if (res.data.status == 10000)
                {
                  this.setData
                  ({
                      collectList: res.data.data,
                  })
                }
          },
          fail:(err)=>
          {
              console('请求失败',err);
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