Page
({

    /**
     * 页面的初始数据
     */
    data: 
    {
        infoList: [],
        isWithdraw: '',
        isTeacher: '',
        userInfo: '',
        isHidden: '',
        id: '',
        selectStatus: '',
        objectId: '',
        userId: ''
    },

    

    studentCaht(e)
    {
        this.setData
        ({
            userId: e.detail.value.userId
        });
        console.log(this.data.userId);
        wx.setStorageSync('SendId', this.data.userId);
        wx.navigateTo
        ({
            url: '/pages/chatPersonal/chatPersonal',
        })
    },

    teacherChat(e)
    {
        this.setData
        ({
            objectId: e.detail.value.objectId
        });
        console.log(this.data.objectId);
        wx.setStorageSync('SendId', this.data.objectId);
        wx.navigateTo
        ({
            url: '/pages/chatPersonal/chatPersonal',
        })
    },

    wait(e)
    { 
        if (this.data.currentTab === e.target.dataset.current) 
        {
            return false;
        } else 
        {
            this.setData
            ({
              currentTab: e.target.dataset.current
            })
        }

        wx.request
        ({
            url: 'http://127.0.0.1:8083/studentAndTeacher/showInvitation',
            header: getApp().globalData.header,  
            data: 
            {
                selectStatus: 0
            },
            method: 'get',
            success: (res)=>  
            {
                console.log("成功");
                console.log(res);
                this.setData
                ({
                    infoList: res.data.data,
                    isWithdraw: true,  //为导师设置
                    isHidden: false,   //为准研究生设置
                    selectStatus: 0
                })
            },
            fail:(err)=>
            {
                console('请求失败',err);
            }
          })
    },

    agree(e)
    { 
        if (this.data.currentTab === e.target.dataset.current)
        {
            return false;
        } else 
        {
            this.setData
            ({
              currentTab: e.target.dataset.current
            })
        }

        wx.request
        ({
            url: 'http://127.0.0.1:8083/studentAndTeacher/showInvitation',
            header: getApp().globalData.header,  
            data: 
            {
                selectStatus: 1
            },
            method: 'get',
            success: (res)=>  
            {
                console.log("成功");
                console.log(res);
                this.setData
                ({
                    infoList: res.data.data,
                    isWithdraw: false,
                    isHidden: true,
                    selectStatus: 1
                })
            },
            fail:(err)=>
            {
                console('请求失败',err);
            }
          })
    },

    clickAgree: function (e)
    {
        this.setData
        ({
            id: e.detail.value.id
        });
        console.log(this.data.id);

        wx.request
        ({
            url: 'http://127.0.0.1:8083/student/selectTutor',
            header: getApp().globalData.header,  
            data: 
            {
                resumeId: this.data.id,
                selectStatus: this.data.selectStatus
            },
            method: 'post',
            success: (res)=>  
            {
                console.log("成功");
                console.log(res);
                this.setData
                ({
                    infoList: res.data.data,
                })
            },
            fail:(err)=>
            {
                console('请求失败',err);
            }
          })
    },

    formSubmit: function (e)
    {    
          this.setData
          ({
            id: e.detail.value.id
          });
          console.log(this.data.id);
          console.log(this.data.selectStatus);
  
          wx.request
          ({
              url: 'http://127.0.0.1:8083/studentAndTeacher/deleteInvitation',
              header: getApp().globalData.header,  
              data: 
              {
                resumeId: this.data.id,
                selectStatus: this.data.selectStatus
              },
              method: 'post',
              success: (res)=> 
              {
                  console.log("成功");
                  console.log(res);
                  this.setData
                  ({
                        infoList: res.data.data
                  })
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
        let userInfo = wx.getStorageSync('userInfo'); 
        if(userInfo)
        {
            this.setData
            ({
                userInfo: userInfo
            })
        }

        wx.request
        ({
            url: 'http://127.0.0.1:8083/studentAndTeacher/showInvitation',
            header: getApp().globalData.header,  
            data:
            {
                selectStatus: 0
            },
            method: 'get',
            success:(res)=>
            {
                console.log('请求成功：',res);
                // 导师
                if(userInfo.identity == 2)
                {
                    this.setData
                    ({
                        infoList: res.data.data,
                        isWithdraw: true,
                        isTeacher: true,
                        selectStatus: 0
                    })
                }
                else
                {
                    this.setData
                    ({
                        infoList: res.data.data,
                        isTeacher: false,
                        isHidden: false,
                        selectStatus: 0
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