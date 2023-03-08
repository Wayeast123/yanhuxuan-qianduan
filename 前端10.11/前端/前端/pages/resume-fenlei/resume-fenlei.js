Page
({

    /**
     * 页面的初始数据
     */
    data: 
    {
        schoolName: '',
        majorName: ''
    },

    handleInput(event)
    {
        let type = event.currentTarget.id;  //data-type 可以传多个数据
        console.log(type, event.detail.value);
        this.setData
        ({
            [type]: event.detail.value
        })
    },

    resumeSelect()
    {
        wx.request
        ({
            url: 'http://127.0.0.1:8083/user/selectPerRe',
            header: getApp().globalData.header,
            method: 'get',
            data: 
            {
                schoolName: this.data.schoolName,
                majorName: this.data.majorName,
            },
            success: (res)=> 
            {
                wx.setStorageSync('PensonalResumeSelectList', res.data.data)
                console.log('请求成功：', res.data);

                if (res.data.status == 10017)
                {
                    wx.showToast
                    ({
                        title: '筛选条件不能为空',
                        icon:'none',
                    })
                }else if (res.data.status == 10000)
                {
                  wx.showToast
                  ({
                      title: '筛选成功',
                      icon:'none',
                  })
                  //怎样才能在 显示一会成功的提示后 再跳转页面
                  wx.navigateTo
                  ({
                        url: '/pages/resume-fenleiShow/resume-fenleiShow',
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