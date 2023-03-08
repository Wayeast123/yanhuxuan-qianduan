// pages/register/rejister.js
import request from '../../utils/request'
Page
({

  /**
   * 页面的初始数据
   */
  data: 
  {
    nick: '',
    account: '',
    telephone: '',
    password: '',
    again_password: ''
  },

  handleInput(event)
  {
    let type = event.currentTarget.id;
    console.log(type,event.detail.value);
    this.setData({
      [type]:event.detail.value
    })
  },

  register(event)
  {
    let {nick, account, telephone, password, again_password} = this.data;
    wx.request
    ({
      url: 'http://127.0.0.1:8083/user/register',
      header: { 'content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      data:
      {
        account: account,
        password: password,
        nick: nick,
        telephone: telephone
      },
      method: 'post',
      success: function (res) 
      {
          console.log("成功");
          console.log(res.data);

          if (res.data.status == 10031)
          {
            wx.showToast
            ({
                title: '昵称不能为空',
                icon:'none',
            })
          }else if (res.data.status == 10018)
          {
            wx.showToast
            ({
                title: '昵称不能超过8位',
                icon:'none',
            })
          }else if (res.data.status == 10001)
          {
            wx.showToast
            ({
                title: '账号不能为空',
                icon:'none',
            })
          }else if (res.data.status == 10032)
          {
            wx.showToast
            ({
                title: '电话不能为空',
                icon:'none',
            })
          }else if (res.data.status == 10033)
          {
            wx.showToast
            ({
                title: '电话不符合规范',
                icon:'none',
            })
          }else if (res.data.status == 10002)
          {
            wx.showToast
            ({
                title: '密码不能为空',
                icon:'none',
            })
          }else if (res.data.status == 10003)
          {
            wx.showToast
            ({
                title: '密码不能少于8位',
                icon:'none',
            })
          }else if (again_password != password)
          {
            wx.showToast
            ({
                title: '再次输入密码错误',
                icon:'none',
            })
          }else if (res.data.status == 10020)
          {
            wx.showToast
            ({
                title: '昵称重复',
                icon:'none',
            })
          }else if (res.data.status == 10004)
          {
            wx.showToast
            ({
                title: '账号重复',
                icon:'none',
            })
          }else if (res.data.status == 10034)
          {
            wx.showToast
            ({
                title: '电话号码重复',
                icon:'none',
            })
          }else if (res.data.status == 10005)
          {
            wx.showToast({
              title: '注册失败，请重试',
              icon:'none',
            })
          }else if (res.data.status == 10000)
          {
            wx.showToast
            ({
                title: '注册成功',
                icon:'none',
            })
            //怎样才能在 显示一会注册成功的提示后 再跳转页面
            wx.navigateBack
            ({
              url: '/pages/login/login',
            })
          }
      }
    })
  },
   



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
  
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