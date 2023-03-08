Page
({
  /**
   * 页面的初始数据
   */
  data: 
  {
    max: 50,
    content: '',
    wordsNum: 0,
    images:[],
    MAX_IMG_NUM: 3, //设定上传图片总数的上限值
    countNum: 1, //设定一次性选择图片的上限值
  },

  async send()
  {
    const flag = await this.publish(this.data.content);
    const upload = await this.upload(this.data.images, flag);
  },

  publish(content)
  {
    return new Promise(function (resolve, reject) 
    {
      // var that = this
      // console.log(that.data.content)
      wx.request
      ({
        url: 'http://127.0.0.1:8083/tutor/publish',
        header: getApp().globalData.header,
        data: 
        {
          content: content,
        },
        method: 'post',
        success: function (res) 
        {
          console.log("发送成功");
          console.log(res.data);
          if (res.data.status == 10007)
          {
            wx.showToast
            ({
                title: '用户未登录',
                icon:'none',
            })
          }else if (res.data.status == 10026)
          {
            wx.showToast
            ({
                title: '您不是导师，不能发布消息',
                icon:'none',
            })
          }else if (res.data.status == 10035)
          {
            wx.showToast
            ({
                title: '内容不能为空',
                icon:'none',
            })
          }else if (res.data.status == 10005)
          {
            wx.showToast
            ({
                title: '发布失败，请重试',
                icon:'none',
            })
          }else if (res.data.status == 10000)
          {
            var flag = true
            resolve({ data: flag });
          }
        }
      })
    })
  },

  upload(images, flag)
  {
    return new Promise(function (resolve, reject) 
    {
      if (flag)
      {
      var cookie = getApp().globalData.header["Cookie"];
      for (var i=0; i < images.length; i++) 
      {
        wx.uploadFile
        ({
          url: 'http://127.0.0.1:8083/tutor/uploadFile',
          filePath: images[i],
          name: 'file',
          formData: {},
          header:
          {
            "Content-Type": "multipart/form-data",
            'Cookie': cookie
          },
          success: function (res) 
          {
            var data = JSON.parse(res.data);
            console.log(data);
            if (data.status == 10000)
            {
              console.log("上传图片成功")
              wx.showToast
              ({
                  title: '发布成功',
                  icon:'none',
              })
              wx.reLaunch
              ({
                url: '/pages/informationRelease/informationRelease',
              })
            }else if (data.status == 10008)
            {
              wx.showToast
              ({
                  title: '上传图片失败，请重试',
                  icon:'none',
              })
            }
          },
          fail: function (res) 
          {
            wx.showToast
            ({
                title: '上传图片失败',
                icon:'none',
            })
          }
        });
      }
      //
     }
    })
  },

  onChooseImage(e)
  {
    var that = this;
    wx.chooseImage
    ({
      count: that.data.countNum,
      sizeType: ['original','compressed'],
      sourceType:['album','camera'],

      success:(res) =>
      {
        wx.showToast
        ({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })

        var tempFilePaths = res.tempFilePaths;
        var images = that.data.images;
        for (var i = 0; i < tempFilePaths.length; i++) 
        {
          if (images.length >= that.data.MAX_IMG_NUM)
          {
            wx.showToast
            ({
                title: '图片不能大于' + that.data.MAX_IMG_NUM + '张',
                icon:'none',
            })
            break;
          } 
          else 
          {
            images.push(tempFilePaths[i]);
          }
        }

        that.setData
        ({
          images: images,
          countNum: that.data.MAX_IMG_NUM - images.length
        })
      },
    })
  },

  onPreviewImage(e)
  {
    var index = e.currentTarget.dataset.index;
    var images = this.data.images;
    wx.previewImage
    ({
      urls: images,
      current: images[index]
    })
  },

  onDelImage(e) 
  {
    console.log("删除图片")
    var images = this.data.images;
    var index = e.currentTarget.dataset.index;
    images.splice(index, 1);

    this.setData
    ({
      images: images,
      countNum: this.data.MAX_IMG_NUM - images.length
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onInput(event)
  {
    console.log(event.detail.value)
    let wordsNum =  event.detail.value.length
    if(wordsNum == this.data.max)
    {
      wordsNum = `最大字数为` + this.data.max
    }
    this.setData
    ({
      content: event.detail.value,
      wordsNum: wordsNum
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