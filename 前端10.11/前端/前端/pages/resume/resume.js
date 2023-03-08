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
        collectId: '',
        keyWord: '',
        star:''
    },

    totest1:(e)=>{
        console.log(e)
        var hello =e.currentTarget.dataset.personalresumelist
        console.log(hello)
        wx.navigateTo({
          url: '/pages/test2/test2?personalResumeList='+ JSON.stringify(e.currentTarget.dataset.personalresumelist),
        })
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

    collect(e)
    {
        this.setData
          ({
            collectId: e.detail.value.collectId
          });
          console.log(this.data);
  
          wx.request
          ({
              url: 'http://127.0.0.1:8083/user/collect',
              header: getApp().globalData.header,  
              data: 
              {
                collectId: this.data.collectId
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
                  }else if (res.data.status == 10005)
                  {
                    wx.showToast
                    ({
                        title: '收藏失败，请重试',
                        icon:'none',
                    })
                  }else if (res.data.status == 10000)
                  {
                    wx.showToast
                    ({
                        title: '收藏成功',
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
    onLoad: function (options) {
        wx.request
        ({
            url: 'http://127.0.0.1:8083/user/showPerReList',
            header: getApp().globalData.header,  
            data:{},
            method: 'get',
            success:(res)=>
            {
                console.log('请求成功：',res);
                this.setData
                ({
                    personalResumeList: res.data.data,
                })
            },
            fail:(err)=>
            {
                console('请求失败',err);
            }
        })

        // 星星
        var star= this.data.personalResumeList.score
        //后台获取的评分
        var yellow_star=parseInt(star);//需要展示的整个黄色5角星，3.62分的时候需要展示3颗整个的黄色五角星。
        var star_per=parseFloat(star-yellow_star)*100;//3.62颗评价分-3颗整个黄色星，是0.62的占比，先将它*100。这样赋值的时候比较方便。也就是一颗灰色的星星中展示出62%的黄色部位。
      var gray_star=parseInt(5-star);//需要展示的灰色星星，正常是5-3.62=1.38颗，0.38颗已经是在百分比中了。所以此时最后需要展示的是1整个灰色五角星
        this.setData({    
        star:star,  //评分数       
        yellow_star:yellow_star,//整个黄色五角星的个数
        star_per:star_per,//一颗灰色五角星中黄色五角星的占比
        gray_star:gray_star,//整个灰色五角星的数量
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