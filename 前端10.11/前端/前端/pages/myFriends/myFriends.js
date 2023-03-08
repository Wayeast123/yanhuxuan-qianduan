Page
({

    /**
     * 页面的初始数据
     */
    data: 
    {
        friendsList: [],
        sendId: ''
    },

    formSubmit(e)
    {
        this.setData
        ({
            sendId: e.currentTarget.dataset.userid
        });
        console.log(this.data);
        wx.setStorageSync('SendId', this.data.sendId);

        wx.navigateTo
        ({
            url: '/pages/chatPersonal/chatPersonal'
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options)
    {
        wx.request
        ({
            url: 'http://127.0.0.1:8083/chat/getChatFriends',
            header: getApp().globalData.header,  
            data: {},
            method: 'get',
            success: (res)=>
            {
                console.log("成功");
                console.log(res);
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
                        friendsList: res.data.data,
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