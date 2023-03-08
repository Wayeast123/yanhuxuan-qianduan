var app = getApp()
var count = 0;
Page
({

  /**
   * 页面的初始数据
   */
  data: 
  {
     personalResumeList:[],
     //   评分组件
     stars: [0, 1, 2, 3, 4],
     normalSrc: '../../static/Star_no.png',
     selectedSrc: '../../static/star-full.png',
     halfSrc: '../../static/ico-star half.png',
     key: 0,//评分
     status:'',    //0未课评 1已课评  
     userInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options)
  {
    wx.request
    ({
        url: 'http://127.0.0.1:8083/postgraduate/getTutor',
        header: getApp().globalData.header,
        method: 'get',
        data: {},
        success: (res)=> 
        {
            console.log('请求成功：', res.data);
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
                userInfo: res.data.data    
              })
            }
        },
        fail:(err)=>
        {
            console('请求失败',err);
        }
    })
  },

  /* 点击左边,半颗星   */
  selectLeft: function (e) 
  {
    var key = e.currentTarget.dataset.key
    if (this.data.key == 0.5 && e.currentTarget.dataset.key == 0.5) 
    {
      //只有一颗星的时候,再次点击,变为0颗
      key = 0;    
    }
    count = key
    this.setData
    ({
      key: key    
    })

  },  /**
  * 点击右边,整颗星   */
 selectRight: function (e) 
 {
   var key = e.currentTarget.dataset.key
   count = key
   this.setData
   ({
     key: key    
   })
 },
 // 确定按钮
  startRating: function (e) 
  {
    wx.showModal
    ({
      title: '分数',
      content: "" + count,
      success: function (res) 
      {
        if (res.confirm) 
        {
          console.log('用户点击确定')        
        }
      }
    })
 },

 post:function(e)
 {
    wx.request
    ({
        url: 'http://127.0.0.1:8083/postgraduate/assessFraction',
        header: getApp().globalData.header,
        method: 'post',
        data: 
        {
          fraction: this.data.key
        },
        success: (res)=> 
        {   
          console.log(res.data)

          if (res.data.status == 10007)
          {
              wx.showToast
              ({
                  title: '用户未登录',
                  icon:'none',
              })
          }else if (res.data.status == 10049)
          {
            wx.showToast
              ({
                  title: '不可重复评分',
                  icon:'none',
              })
          }else if (res.data.status == 10005)
          {
            wx.showToast
              ({
                  title: '评分失败，请重试',
                  icon:'none',
              })
          }else if (res.data.status == 10000)
          {
            wx.showToast
              ({
                  title: '评分成功',
                  icon:'none',
              })
          }
        },
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