import request from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    account:'',
    password:''
  },

  // 表单项内容发生改变的回调
  handleInput(event){
    let type = event.currentTarget.dataset.type;  //data-type 可以传多个数据
    console.log(type,event.detail.value);
    this.setData({
      [type]:event.detail.value
    })
  },

  //  登录的回调
  login()
  {

    let {account,password} = this.data;

    wx.request
    ({
      url: 'http://127.0.0.1:8083/user/login',
      header: getApp().globalData.header,
      data: 
      {
        account: account,
        password: password,
      },
      method: 'post',
      success: function (res) 
      {
            wx.setStorageSync('userInfo', res.data.data)
            console.log("成功");
            console.log(res.data);
            console.log(res.header["Set-Cookie"]);

            if (res.header["Set-Cookie"] != null) 
            {
              //设置cookie
              getApp().globalData.header["Cookie"] = res.header["Set-Cookie"]
            }

            if (res.data.status == 10001)
            {
              wx.showToast
              ({
                  title: '账号不能为空',
                  icon:'none',
              })
            }else if (res.data.status == 10002)
            {
              wx.showToast
              ({
                  title: '密码不能为空',
                  icon:'none',
              })
            }else if (res.data.status == 10006)
            {
              wx.showToast
              ({
                  title: '账号或者密码错误',
                  icon:'none',
              })
            }else if (res.data.status == 10053)
            {
              wx.showToast
              ({
                  title: '账号已被封禁',
                  icon:'none',
              })
            }
            else if (res.data.status == 10000)
            {
              wx.showToast
              ({
                  title: '登录成功',
                  icon:'none',
              })
              //怎样才能在 显示一会登录成功的提示后 再跳转页面
              wx.reLaunch
              ({
                url: '/pages/personalPage/personalPage',
              })
            }
      }

    })
  },
  
  toregister()
  {
    wx.navigateTo
    ({
      url: '/pages/register/register',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
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