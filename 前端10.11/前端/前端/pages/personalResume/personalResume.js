Page
({

    /**
     * 页面的初始数据
     */
    data: 
    {   
        //普通选择器数据
        array:['未选择','16:00~17:00','17:00~18:00','17:00~18:00'],
        //普通选择器值索引
        index: 0,
        personalResume: [],
        isCreate: '',
        isUpdate: '',
        userName: '',
        schoolName: '',
        majorName: '',
        telephone: '',
        content: '',
    },

    //普通选择器值改变时触发
    changeValue(e) {
        this.setData({
          index: e.detail.value
        })
      },

    handleInput(event)
    {
        let type = event.currentTarget.id;
        console.log(type, event.detail.value);
        this.setData
        ({
            [type]: event.detail.value
        })
    },

   create()
   {
        console.log(this.data);
        var cookie = getApp().globalData.header["Cookie"];
        wx.request
        ({
            url: 'http://127.0.0.1:8083/user/createPerRe',
            header: {'content-Type': 'application/json',
                     'Cookie': cookie},
            data: 
            {
                userName: this.data.userName,
                schoolName: this.data.schoolName,
                majorName: this.data.majorName,
                telephone: this.data.telephone,
                content: this.data.content,
            },
            method: 'post',
            success: function (res) 
            {
                console.log("成功");
                console.log(res.data);

                if(res.data.status == 10036)
                {
                    wx.showToast
                    ({
                        title: '姓名不能为空',
                        icon:'none',
                    })
                }else if (res.data.status == 10037)
                {
                  wx.showToast
                  ({
                      title: '学校不能为空',
                      icon:'none',
                  })
                }else if (res.data.status == 10038)
                {
                  wx.showToast
                  ({
                      title: '专业不能为空',
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
                }else if (res.data.status == 10035)
                {
                  wx.showToast
                  ({
                      title: '内容不能为空',
                      icon:'none',
                  })
                }else if(res.data.status == 10000)
                {
                    wx.showToast
                    ({
                        title: '创建个人简历成功',
                        icon:'none',
                    })
                    wx.navigateBack
                    ({
                        url: '/pages/personalPage/personalPage',
                    })
                }else if (res.data.status == 10007)
                {
                  wx.showToast
                  ({
                      title: '用户未登录',
                      icon:'none',
                  })
                }else if (res.data.status == 10005)
                {
                  wx.showToast
                  ({
                      title: '简历创建失败，请重试',
                      icon:'none',
                  })
                }

                
            },
            fail:(err)=>
            {
                console('请求失败',err);
            }
        })
   },

   update()
   {
        console.log(this.data);
        var cookie = getApp().globalData.header["Cookie"];
        wx.request
        ({
            url: 'http://127.0.0.1:8083/user/updatePerRe',
            header: {'content-Type': 'application/json',
                     'Cookie': cookie},
            data: 
            {
                userName: this.data.userName,
                schoolName: this.data.schoolName,
                majorName: this.data.majorName,
                telephone: this.data.telephone,
                content: this.data.content,
                testScore: this.data.testScore
            },
            method: 'post',
            success: function (res) 
            {
                console.log("成功");
                console.log(res.data);

                if(res.data.status == 10036)
                {
                    wx.showToast
                    ({
                        title: '姓名不能为空',
                        icon:'none',
                    })
                }else if (res.data.status == 10037)
                {
                  wx.showToast
                  ({
                      title: '学校不能为空',
                      icon:'none',
                  })
                }else if (res.data.status == 10038)
                {
                  wx.showToast
                  ({
                      title: '专业不能为空',
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
                }else if (res.data.status == 10035)
                {
                  wx.showToast
                  ({
                      title: '内容不能为空',
                      icon:'none',
                  })
                }

                if(res.data.status == 10000)
                {
                    wx.showToast
                    ({
                        title: '修改个人简历成功',
                        icon:'none',
                    })
                }else if (res.data.status == 10007)
                {
                  wx.showToast
                  ({
                      title: '用户未登录',
                      icon:'none',
                  })
                }else if (res.data.status == 10008)
                {
                  wx.showToast
                  ({
                      title: '修改个人简历失败，请重试',
                      icon:'none',
                  })
                }
            },
            fail:(err)=>
            {
                console('请求失败',err);
            }
        })
   },



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) 
    {
        wx.request
        ({
          url: 'http://127.0.0.1:8083/user/showPerRe',
          header: getApp().globalData.header,
          success:(res)=>
          {
              console.log('请求成功：',res.data);
              
              if(res.data.status == 10007)
              {
                wx.showToast
                ({
                    title: '用户未登录',
                    icon:'none',
                })
              }
              if(res.data.status == 10030)
              {
                this.setData
                ({
                    isCreate: true ,
                    isUpdate: false
                })
                wx.showToast
                ({
                    title: '用户未创建简历',
                    icon:'none',
                })
              }
              if(res.data.status == 10000)
              {
                this.setData
                ({
                  isCreate: false ,
                  isUpdate: true ,
                  personalResume: res.data.data,
                  userName: res.data.data.userName,
                  schoolName: res.data.data.schoolName,
                  majorName: res.data.data.majorName,
                  telephone: res.data.data.telephone,
                  content: res.data.data.content,
                  testScore: res.data.data.testScore,
                  identity: res.data.data.identity
                })
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
    onReady: function () 
    {
        
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