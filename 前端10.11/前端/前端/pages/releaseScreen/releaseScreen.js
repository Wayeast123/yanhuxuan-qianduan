import request from '../../utils/request'
Page
({
  /**
   * 页面的初始数据
   */
  data: 
  {
    schoolName: '',
    majorName: ''
  },

  handleInput(event)
  {
    let type = event.currentTarget.dataset.type;  //data-type 可以传多个数据
    console.log(type,event.detail.value);
    this.setData
    ({
      [type]:event.detail.value
    })
  },
  
  Screen()
  {
    let schoolName = this.data.schoolName;
    let majorName = this.data.majorName;

    wx.request
    ({
      url: 'http://127.0.0.1:8083/user/InformationReleaseScreen',
      header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      method: 'get',
      data: 
      {
        schoolName: schoolName,
        majorName: majorName,
      },
      success: (res)=> 
      {
          wx.setStorageSync('ReleaseScreenList', res.data.data)
          console.log('请求成功：', res.data);

          if (res.data.status == 10017)
          {
            wx.showToast
            ({
                title: '筛选条件不能为空',
                icon:'none',
            })
          }else if (res.data.status == 10000)
          {
            wx.showToast
            ({
                title: '筛选成功',
                icon:'none',
            })
            //怎样才能在 显示一会筛选成功的提示后 再跳转页面
            wx.reLaunch
            ({
                url: '/pages/releaseScreenShow/releaseScreenShow',
            })
          }
      },
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