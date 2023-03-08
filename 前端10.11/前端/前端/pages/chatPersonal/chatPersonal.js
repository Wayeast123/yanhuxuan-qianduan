// pages/chatPersonal/chatPersonal.js
Page
({

    /**
     * 页面的初始数据
     */
    data: 
    {
        chatObject: '',
        chatMessages: [],
        userId: '',
        sendContent: ''
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

    send()
    {
        wx.request
        ({
            url: 'http://127.0.0.1:8083/chat/sendMessage',
            header: getApp().globalData.header,
            method: 'post',
            data: 
            {
                chatObject: this.data.chatObject,
                sendContent: this.data.sendContent
            },
            success: (res)=> 
            {
                console.log('请求成功：', res.data);
                this.setData
                ({
                    chatMessages: res.data.data
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
        let sendId = wx.getStorageSync('SendId'); 
        console.log(sendId)
        if(sendId)
        {
            this.setData
            ({
                chatObject: sendId
            })
        }    

        wx.getStorage
        ({
            key: 'userInfo',
            success:(res)=>
            {
                console.log(res.data)
                this.setData
                ({
                    userId: res.data.id
                })
            }
        })

        wx.request
        ({
            url: 'http://127.0.0.1:8083/chat/getChatPersonal',
            header: getApp().globalData.header,  
            data:
            {
                chatObject: sendId
            },
            method: 'get',
            success:(res)=>
            {
                console.log('请求成功：',res);
                this.setData
                ({
                    chatMessages: res.data.data
                })
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