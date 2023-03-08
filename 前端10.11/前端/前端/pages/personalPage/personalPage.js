import request from "../../utils/request";

let startY = 0; // 手指起始的坐标
let moveY = 0; // 手指移动的坐标
let moveDistance = 0; // 手指移动的距离
Page
({

  /**
   * 页面的初始数据
   */
  data: 
  {
    coverTransform: 'translateY(0)',
    coverTransition: '',
    userInfo: [],
    isHidden: true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options)
  {
    let userInfo = wx.getStorageSync('userInfo'); 
    if(userInfo)
    {
      this.setData
      ({
        userInfo: userInfo
      })

      if(userInfo.identity == 2 || userInfo.identity == 3)
      {
        this.setData
        ({
            isHidden: false,
        })
      }else
      {
        this.setData
        ({
            isHidden: true,
        })
      }

    }
  },
  
  handleTouchStart(event)
  {
    this.setData
    ({
      coverTransition: ``
    })
    // 获取手指起始坐标
    startY = event.touches[0].clientY;
  },
  handleTouchMove(event)
  {
    moveY = event.touches[0].clientY;
    moveDistance = moveY - startY;

    // 动态更新coverTransform的状态值
    this.setData
    ({
      coverTransform: `translateY(${moveDistance}rpx)`
    })
  },
  handleTouchEnd()
  {
    // 动态更新coverTransform的状态值
    this.setData({
      coverTransform: `translateY(0rpx)`,
      coverTransition: `transform 1s linear`
    })
  },


  special(event)
  {
    wx.navigateTo
    ({
      url: '/pages/personalSignature/personalSignature',
    })
  },

  // 跳转至登录Login页面的回调
  toLogin()
  {
    wx.navigateTo
    ({
      url: '/pages/login/login',
    })
  },

  identity()
  {
    wx.navigateTo
    ({
      url: '/pages/identity/identity',
    })
  },

  personalResume()
  {
    wx.navigateTo({
      url: '/pages/personalResume/personalResume',
    })
  },

  sentShow()
  {
    wx.navigateTo
    ({
      url: '/pages/sentShow/sentShow',
    })
  },

  invitationShow()
  {
    wx.navigateTo
    ({
      url: '/pages/InvitationShow/InvitationShow',
    })
  },

  myFriend()
  {
    wx.navigateTo
    ({
      url: '/pages/personalSignature/personalSignature',
    })
  },

  myCollect()
  {
    wx.navigateTo
    ({
      url: '/pages/myCollect/myCollect',
    })
  },

  tutorScore()
  {
    wx.navigateTo
    ({
      url: '/pages/test1/test1',
    })
  },

  logOut()
  {
    wx.request
    ({
      url: 'http://127.0.0.1:8083/user/logout',
      header: getApp().globalData.header,  
      data: {},
      method: 'post',
      success: (res)=>
      {
          console.log("成功");
          console.log(res);
          if (res.data.status == 10000)
          {
            wx.clearStorage
            ({
              success: (res) => 
              {
                console.log(res);
                wx.showModal
                ({
                  title: '提示',
                  content: '退出成功',
                })
                this.setData
                ({
                  userInfo:''
                })
                this.onReady() 
              },
            })
            wx.hideLoading()
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
