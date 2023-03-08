Page
({

    /**
     * 页面的初始数据
     */
    data: 
    {
        personalResume: [],
        objectId: '',
        userName: '',
        schoolName: '',
        majorName: '',
        telephone: '',
        content: ''
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

    sent()
    {
        console.log(this.data);
        var cookie = getApp().globalData.header["Cookie"];
        wx.request
        ({
            url: 'http://127.0.0.1:8083/studentAndTeacher/sentResume',
            header: {'content-Type': 'application/json',
                     'Cookie': cookie},
            data: 
            {
                sendName: this.data.userName,
                sendSchool: this.data.schoolName,
                sendMajor: this.data.majorName,
                sendTelephone: this.data.telephone,
                sendContent: this.data.content,
                receiveId: this.data.objectId
            },
            method: 'post',
            success: function (res) 
            {
                console.log("成功");
                console.log(res);
                
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
                        title: '发送简历成功',
                        icon:'none',
                    })
                }
                if(res.data.status == 10039)
                {
                    wx.showToast
                    ({
                        title: '不在同一个学校，不能发简历',
                        icon:'none',
                    })
                }
                if(res.data.status == 10028)
                {
                    wx.showToast
                    ({
                        title: '您不是导师或者准研究生，不能发送简历',
                        icon:'none',
                    })
                }
                if(res.data.status == 10029)
                {
                    wx.showToast
                    ({
                        title: '已发送过，不能重复发送',
                        icon:'none',
                    })
                }
                if(res.data.status == 10005)
                {
                    wx.showToast
                    ({
                        title: '发送失败，请重试',
                        icon:'none',
                    })
                }
                
            },
            fail:(err)=>
            {
                console('请求失败',err);
            }
        })
        // wx.navigateTo
        // ({
        //     url: '/pages/resume-fenleiShow/resume-fenleiShow',
        // })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) 
    {
        let personalResume = wx.getStorageSync('personalResume'); 
        if(personalResume)
        {
            console.log(personalResume)
            this.setData
            ({
                personalResume: personalResume,
                userName: personalResume.userName,
                schoolName: personalResume.schoolName,
                majorName: personalResume.majorName,
                telephone: personalResume.telephone,
                content: personalResume.content
            })
        }

        wx.getStorage
        ({
            key: 'ObjectId',
            success:(res)=>
            {
                console.log(res.data)
                this.setData
                ({
                    objectId: res.data,
                })
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