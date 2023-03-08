Page
({

    /**
     * 页面的初始数据
     */
    data:
    {
        placeholder:'请输入简历关键字',
        personalResumeList: [],
        objectId: '',
        keyWord: ''
    },

    personalResumeFuzzySearch()
    {
        wx.request
        ({
        url: 'http://127.0.0.1:8083/user/personalResumeFuzzySearch',
        header: getApp().globalData.header,
        data:
        {
            keyWord: this.data.keyWord
        },
        success:(res)=>
        {
            console.log('请求成功：',res.data);
            if(res.data.status == 10046)
            {
                wx.showToast
                ({
                    title: '搜索关键字为空',
                    icon:'none',
                })
            }else if (res.data.status == 10000)
            {
                wx.setStorageSync('PensonalResumeSelectList', res.data.data)
                wx.redirectTo
                ({
                    url: '/pages/resume-fenleiShow/resume-fenleiShow'
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
    
    totest1:(e)=>{
        console.log(e)
        var hello =e.currentTarget.dataset.personalresumelist
        console.log(hello)
        wx.navigateTo({
          url: '/pages/test2/test2?personalResumeList='+ JSON.stringify(e.currentTarget.dataset.personalresumelist),
        })
    },

    formSubmit(e)
    {
        //   console.log(e.detail.value);    
          this.setData
          ({
                objectId: e.detail.value.objectId
          });
          console.log(this.data);
          wx.setStorageSync('ObjectId', this.data.objectId);
  
          wx.request
          ({
              url: 'http://127.0.0.1:8083/user/showPerRe',
              header: getApp().globalData.header,  
              data: {},
              method: 'get',
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
                  }else if (res.data.status == 10030)
                  {
                    wx.showToast
                    ({
                        title: '还未创建个人简历',
                        icon:'none',
                    })
                  }else if (res.data.status == 10000)
                  {
                    wx.setStorageSync('personalResume', res.data.data);
                    wx.navigateTo
                    ({
                        url: '/pages/resume-sent/resume-sent',
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
        wx.getStorage
        ({
            key: 'PensonalResumeSelectList',
            success:(res)=>
            {
                console.log(res.data)
                this.setData
                ({
                    personalResumeList: res.data,
                })
            }
        })
    },

    resumeFenlei()
    {
        wx.navigateTo
        ({
            url: '/pages/resume-fenlei/resume-fenlei',
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