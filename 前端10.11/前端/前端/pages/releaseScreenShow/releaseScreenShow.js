import request from '../../utils/request'
Page
({

  /**
   * 页面的初始数据
   */
  data: 
  {
    placeholder:'请输入关键字',
    informationReleaseList: [],
    keyWord: ''
  },

  informationReleaseFuzzySearch()
  {
    wx.request
    ({
      url: 'http://127.0.0.1:8083/user/informationReleaseFuzzySearch',
      header: { 'content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      data:
      {
        keyWord: this.data.keyWord
      },
      success:(res)=>
      {
          console.log('请求成功：',res.data);
          // wx.setStorageSync('InformationReleaseList', JSON.stringify(res.data.data))
          if(res.data.status == 10046)
          {
              wx.showToast
              ({
                  title: '搜索关键字为空',
                  icon:'none',
              })
          }else if (res.data.status == 10000)
          {
            wx.setStorageSync('ReleaseScreenList', res.data.data)
            wx.redirectTo
            ({
              url: '/pages/releaseScreenShow/releaseScreenShow'
            })
          }
          
      },
      fail:(err)=>
      {
          console('请求失败',err);
      }
    })
  },

  handleInput(event)
  {
    let type = event.currentTarget.id;
    console.log(type,event.detail.value);
    this.setData
    ({
      [type]: event.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) 
  {
    wx.getStorage
    ({
      key: 'ReleaseScreenList',
      success:(res)=>
      {
        console.log(res.data)
        this.setData
        ({
          informationReleaseList: res.data,
        })
      }
    })
  },

  Screen()
  {
    wx.navigateTo
    ({
      url: '/pages/releaseScreen/releaseScreen',
    })
  },

  publish()
  {
    wx.navigateTo({
      url: '/pages/tutorPublish/tutorPublish',
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