Page
({

    /**
     * 页面的初始数据
     */
    data: 
    {
      Usersex:
      [
        {name:'0',value:'男',checked:'true'},
        {name:'1',value:'女'}
      ],

      identity:
      [
        {name:'2',value:'导师',checked:'true'},
        {name:'3',value:'准研究生'},
        {name:'4',value:'在读/毕业研究生'},
      ],
      
      name: '',
      sex: '0',
      age: '',
      hometown: '',
      idCardNumber: '',
      telephone: '',
      verifyIdentity: '2',
      idCardFront: [],
      idCardBack: [],
      certificate: []
    },  

  onChooseImageFirst(e)
  {
    var that = this;
    wx.chooseImage
    ({
      count: 1,
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
  
        var idCardFront = that.data.idCardFront;
        idCardFront.push(res.tempFilePaths[0]);

        that.setData
        ({
          idCardFront: idCardFront
        });
      },
    })
  },

  onPreviewImageFirst(e)
  {
    var idCardFront = this.data.idCardFront;
    wx.previewImage
    ({
      urls: idCardFront,
      current: idCardFront[0]
    })
  },

  onDelImageFirst(e) 
  {
    console.log("删除图片")
    var idCardFront = this.data.idCardFront;
    idCardFront.splice(0, 1);
    this.setData
    ({
      idCardFront: idCardFront
    })
  },


  onChooseImageSecond(e)
  {
    var that = this;
    wx.chooseImage
    ({
      count: 1,
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
  
        var idCardBack = that.data.idCardBack;
        idCardBack.push(res.tempFilePaths[0]);

        that.setData
        ({
          idCardBack: idCardBack
        });
      },
    })
  },

  onPreviewImageSecond(e)
  {
    var idCardBack = this.data.idCardBack;
    wx.previewImage
    ({
      urls: idCardBack,
      current: idCardBack[0]
    })
  },

  onDelImageSecond(e) 
  {
    console.log("删除图片")
    var idCardBack = this.data.idCardBack;
    idCardBack.splice(0, 1);
    this.setData
    ({
      idCardBack: idCardBack
    })
  },

  onChooseImageThird(e)
  {
    var that = this;
    wx.chooseImage
    ({
      count: 1,
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
  
        var certificate = that.data.certificate;
        certificate.push(res.tempFilePaths[0]);

        that.setData
        ({
          certificate: certificate
        });
      },
    })
  },

  onPreviewImageThird(e)
  {
    var certificate = this.data.certificate;
    wx.previewImage
    ({
      urls: certificate,
      current: certificate[0]
    })
  },

  onDelImageThird(e) 
  {
    console.log("删除图片")
    var certificate = this.data.certificate;
    certificate.splice(0, 1);
    this.setData
    ({
      certificate: certificate
    })
  },



    //性别
    radioChange: function(e)
    {
      console.log(e.detail.value);
      this.setData
      ({
        sex: e.detail.value
      })
    },

    // 身份
    radioChange2: function(e)
    {
      console.log(e.detail.value);
      this.setData
      ({
        verifyIdentity: e.detail.value
      });
    },
  
  async formSubmit(e)
  {
        this.setData
        ({
            name: e.detail.value.name,
            age: e.detail.value.age,
            hometown: e.detail.value.hometown,
            idCardNumber: e.detail.value.idCardNumber,
            telephone: e.detail.value.telephone
        });
        console.log(this.data);

        const flag = await this.verifyIdentity(this.data.name, this.data.sex, this.data.age, this.data.hometown, this.data.idCardNumber, this.data.telephone, this.data.verifyIdentity, this.data.idCardFront, this.data.idCardBack, this.data.certificate);
        this.uploadIdCardFront(this.data.idCardFront, flag);
        this.uploadIdCardBack(this.data.idCardBack, flag);
        this.uploadCertificate(this.data.certificate, flag);
  },

  verifyIdentity(name, sex, age, hometown, idCardNumber, telephone, verifyIdentity, idCardFront, idCardBack, certificate)
  {
    return new Promise(function (resolve, reject) 
    {
      var cookie = getApp().globalData.header["Cookie"];
      wx.request
      ({
          url: 'http://127.0.0.1:8083/user/verifyIdentity',
          header: {'content-Type': 'application/json',
                    'Cookie': cookie},    
          data: 
          {
            userName: name,
            sex: sex,
            age: age,
            hometown: hometown,
            idCardNumber: idCardNumber,
            telephone: telephone,
            verifyIdentity: verifyIdentity,
            idCardFront: idCardFront[0],
            idCardBack: idCardBack[0],
            certificate: certificate[0]
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
              }else if (res.data.status == 10036)
              {
                wx.showToast
                ({
                    title: '姓名不能为空',
                    icon:'none',
                })
              }else if (res.data.status == 10040)
              {
                wx.showToast
                ({
                    title: '年龄不能为空',
                    icon:'none',
                })
              }else if (res.data.status == 10041)
              {
                wx.showToast
                ({
                    title: '籍贯不能为空',
                    icon:'none',
                })
              }else if (res.data.status == 10042)
              {
                wx.showToast
                ({
                    title: '身份证号码不能为空',
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
                    title: '电话号码不规范',
                    icon:'none',
                })
              }else if (res.data.status == 10023)
              {
                wx.showToast
                ({
                    title: '账户目前正处于审核状态',
                    icon:'none',
                })
              }else if (res.data.status == 10005)
              {
                wx.showToast
                ({
                    title: '提交失败，请重试',
                    icon:'none',
                })
              }else if (res.data.status == 10043)
              {
                wx.showToast
                ({
                    title: '请提交身份证正面照',
                    icon:'none',
                })
              }else if (res.data.status == 10044)
              {
                wx.showToast
                ({
                    title: '请提交身份证背面照',
                    icon:'none',
                })
              }else if (res.data.status == 10045)
              {
                wx.showToast
                ({
                    title: '请提交证明身份照',
                    icon:'none',
                })
              }else if (res.data.status == 10000)
              {
                var flag = true
               wx.navigateBack({
                 delta: 1,
               })
                resolve({ data: flag });
                
              }
              
          },
          fail:(err)=>
          {
              console('请求失败',err);
          }
      })
    })
  },

  uploadIdCardFront(idCardFront, flag)
  {
    if (flag) {
    return new Promise(function (resolve, reject) 
    {
      var cookie = getApp().globalData.header["Cookie"];
      wx.uploadFile
      ({
        url: 'http://127.0.0.1:8083/user/uploadIdCardFront',
        filePath: idCardFront[0],
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
                title: '上传成功',
                icon:'none',
            })
            // wx.reLaunch
            // ({
            //   url: '/pages/informationRelease/informationRelease',
            // })
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
    })
   }
  },

  uploadIdCardBack(idCardBack, flag)
  {
    if (flag) {
    return new Promise(function (resolve, reject) 
    {
      var cookie = getApp().globalData.header["Cookie"];
      wx.uploadFile
      ({
        url: 'http://127.0.0.1:8083/user/uploadIdCardBack',
        filePath: idCardBack[0],
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
                title: '上传成功',
                icon:'none',
            })
            // wx.reLaunch
            // ({
            //   url: '/pages/informationRelease/informationRelease',
            // })
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
    })
   }
  },

  uploadCertificate(certificate, flag)
  {
    if (flag) {
    return new Promise(function (resolve, reject) 
    {
      var cookie = getApp().globalData.header["Cookie"];
      wx.uploadFile
      ({
        url: 'http://127.0.0.1:8083/user/uploadCertificate',
        filePath: certificate[0],
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
                title: '上传成功',
                icon:'none',
            })
            // wx.reLaunch
            // ({
            //   url: '/pages/informationRelease/informationRelease',
            // })
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
    })
    }
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