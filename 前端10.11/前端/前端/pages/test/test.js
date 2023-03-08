// pages/test/test.js
Page({
  data: {
    imgurls: [
      { url: "../../static/images/tongzhi.jpg" },
      { url: "../../static/images/tongzhi.jpg" },
      { url: "../../static/images/tongzhi.jpg" }
    ],
    guanfanctivity:[
      {content:"x选择你喜欢的导师！！！"},
      {content:"快选择属于你的学生！！！！"}
    ]
  },

  /**
   * 将数据库数据取出并作为json数据获取后存到data里，以及存到全局变量
   */
  onLoad: function (options) {
  //   wx.request({
  //     url:"http://127.0.0.1:8808/allActivity/",
  //     success:res=>{
  //       App.all = res.data
  //       this.setData({
  //         allActivity:res.data
  //       })
  //     }
  //   })
  //   wx.request({
  //     url: "http://127.0.0.1:8808/likeActivity/",
  //     success: res => {
  //       App.likeAc = res.data
  //       this.setData({
  //         likeActivity: res.data
  //       })
  //     }
  //   })
  //   wx.request({
  //     url: "http://127.0.0.1:8808/guanfanActivity/",
  //     success: res => {
  //       App.guanfanAc = res.data
  //       this.setData({
  //         guanfanctivity: res.data
  //       })
  //     }
  //   })
  //   wx.request({
  //     url: "http://127.0.0.1:8808/maxActivity/",
  //     success: res => {
  //       App.maxAc = res.data
  //       this.setData({
  //         maxActivity: res.data
  //       })
  //     }
  //   })
  //   wx.request({
  //     url: "http://127.0.0.1:8808/newActivity/",
  //     success: res => {
  //       App.newAc = res.data
  //       this.setData({
  //         newActivity: res.data
  //       })
  //     }
  //   })
  // },

  // bindconfirm(e) {
  //   wx.navigateTo({
      
  //   })
  },
  /*
  *点击时获取点击的活动并传给下一个页面
  */
  // offonclick(e){
  //   wx.navigateTo({
  //     url: '/pages/registration/resgistration?list=guanfan&index=' + e.currentTarget.dataset.key,
  //   })
  // },
  // likeonclick(e){
  //   wx.navigateTo({
  //     url: '/pages/registration/resgistration?list=like&index=' + e.currentTarget.dataset.key,
  //   })
  // },
  // maxonclick(e){
  //   wx.navigateTo({
  //     url: '/pages/registration/resgistration?list=max&index=' + e.currentTarget.dataset.key,
  //   })
  // },
  // newonclick(e){
  //   wx.navigateTo({
  //     url: '/pages/registration/resgistration?new=new&index=' + e.currentTarget.dataset.key,
  //   })
  // },


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