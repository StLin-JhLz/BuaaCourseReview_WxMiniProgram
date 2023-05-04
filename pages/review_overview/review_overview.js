// pages/review_overview/review_overview.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        reviews:[{
            id : "1afbc",
            user_id : "1afbc",
            time : "2022/09/02",
            agree_cnt : "5",
            disagree_cnt : "3",
            course_id : "1afbcd",
            teacher_id : "1afbcd",
            semester : "21-22-3",
            rating_total : 5,
            rating_quality : 4,
            rating_workload : 3,
            rating_assesment : 3,
            title : "好课",
            text : "这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价",
        }],
        courseName : "计算机网络实验",
        departmentName : "计算机学院",
        credit : "2",
        cnt : "0",
    },
    methods: {
        onToTop(e) {
          console.log('backToTop', e);
        },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.makeTestData();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        // this.makeTestData();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        // this.makeTestData();
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

    },

    makeTestData() {
        var a = {
            id : "1afbc",
            user_id : "1afbc",
            time : "2022/09/02",
            agree_cnt : "5",
            disagree_cnt : "3",
            course_id : "1afbcd",
            teacher_id : "1afbcd",
            semester : "21-22-3",
            rating_total : 5,
            rating_quality : 4,
            rating_workload : 3,
            rating_assesment : 3,
            title : "好课",
            text : "这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价",
        };
        // console.log(this.data.length);
        this.data.reviews.push(a);
        console.log(this.data.reviews.push(a));
        this.data.cnt = this.data.cnt + 1;
    }
    
})