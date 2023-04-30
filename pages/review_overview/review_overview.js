// pages/review_overview/review_overview.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        courseName : "计算机网络实验",
        departmentName : "计算机学院",
        credit : "2",
        reviewTitle: "好课",
        reviewTeacher: "李莹",
        reviewSemester: "21-22-3",
        reviewDate : "2022/09/02",
        reviewContent : "评价内容：微信小程序默认支持的字体 在小程序的.wxss 中对字体进行样式定义,如 font-family: 'Segoe UI', Tahoma, Geneva, Verdana, ans-serif ; \n显示效果如下图: 但是由于微信支持的字体"
    },
    methods: {
        onToTop(e) {
          console.log('backToTop', e);
        },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})