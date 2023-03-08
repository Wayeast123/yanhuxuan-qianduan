Page
  ({
    /**
     * 页面的初始数据
     */
    data: {
      head: "/static/images/personal/missing-face.png",
      userInfo: [],
      headImage: [],
      nick: ' ',
      sign: ' '
    },

    onChooseImage(e) {
      var that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],

        success: (res) => {
          wx.showToast({
            title: '正在上传...',
            icon: 'loading',
            mask: true,
            duration: 1000
          })

          var headImage = that.data.headImage;
          headImage.push(res.tempFilePaths[0]);

          that.setData({
            headImage: headImage
          });
        },
      })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      let userInfo = wx.getStorageSync('userInfo');
      if (userInfo) {
        this.setData({
          userInfo: userInfo
        })

        if (userInfo.identity == 2 || userInfo.identity == 3) {
          this.setData({
            isHidden: false,
          })
        } else {
          this.setData({
            isHidden: true,
          })
        }

      }
    },

    //真正的提交修改方法
    async formSubmit(e) {
      this.setData({
        nick: this.data.nick,
        sign: this.data.sign
      });
      console.log(this.data);
      const flag = await this.modify(this.data.nick, this.data.sign, this.data.userInfo);
      let userInfo = wx.getStorageSync('userInfo')
      this.uploadHeadImage(this.data.headImage, flag, userInfo);
    },

    modify(nick, sign, userInfo) {
      var that = this
      return new Promise(function (resolve, reject) {
        wx.request({
          url: 'http://127.0.0.1:8083/user/modify',
          method: 'post',
          header: getApp().globalData.header,
          data: {
            nick: that.data.nick,
            sign: that.data.sign
          },
          success: function (res) {
            if (res.data.status == 10007) {
              wx.showToast({
                title: '用户未登录',
                icon: 'none',
              })
            } else if (res.data.status == 10000) {
              userInfo.nick = nick
              userInfo.sign = sign
              wx.setStorageSync('userInfo', userInfo)
              var flag = true
              resolve({
                data: flag
              });
            }
          },
          fail: (err) => {
            console('请求失败', err);
          }
        })
      })
    },

    uploadHeadImage(headImage, flag, userInfo) {
      if (flag) {
        return new Promise(function (resolve, reject) {
          var cookie = getApp().globalData.header["Cookie"];
          wx.uploadFile({
            url: 'http://127.0.0.1:8083/user/uploadHeadImage',
            filePath: headImage[0],
            name: 'file',
            formData: {},
            header: {
              "Content-Type": "multipart/form-data",
              'Cookie': cookie
            },
            success: function (res) {
              var data = JSON.parse(res.data);
              console.log(data);

              if (data.status == 10000) {
                console.log("上传图片成功")

                userInfo.headImage = data.data
                wx.setStorageSync('userInfo', userInfo)
                wx.reLaunch({
                  url: '/pages/personalPage/personalPage',
                })
              } else if (data.status == 10008) {
                wx.showToast({
                  title: '上传图片失败，请重试',
                  icon: 'none',
                })
              }
            },
            fail: function (res) {
              wx.showToast({
                title: '上传图片失败',
                icon: 'none',
              })
            }
          });
        })
      }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

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

    handleInput1: function (e) {
      console.log(e.detail)
      this.setData({
        nick: e.detail.value
      })
    },
    handleInput2: function (e) {
      this.setData({
        sign: e.detail.value
      })
    }


  })