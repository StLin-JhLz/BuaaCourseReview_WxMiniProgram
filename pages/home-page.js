// pages/home-page.js
//没用
import { APIS } from "../../utils/api.js"
const apis = APIS

Page({

    /**
     * 页面的初始数据
     */
    data: {
        course_recommend : null, // 实质应该是review_recommend
        str_text: "",
        str_subtitle : "",
        str_title : "",
        announcement:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const self=this;
        if (apis.main.api_undefined == true)
            this.makeTestData();
        wx.request({
            url: apis.main.url + apis.recommend.url, // 请求的 URL
            method: apis.recommend.method, // 请求方法，可选值：OPTIONS、GET、HEAD、POST、PUT、DELETE、TRACE、CONNECT，默认为 GET
            data: { // 请求的参数，以键值对的形式传递
            },
            // header: { // 请求的头部信息，以键值对的形式传递
            //   'Content-Type': 'application/json'
            // },
            success: function (res) {
              // 请求成功的回调函数
              //console.log(res.data); // 返回的数据
              self.setData({
                course_recommend:res.data.res
              })
            },
            fail: function (err) {
              // 请求失败的回调函数
              console.log("获取推荐课程失败");
              return
            },
            complete: function () {
              // 请求完成的回调函数，无论成功还是失败都会执行
            }
          });
        
         
        var str_text;
        var str_subtitle;
        var str_title;
        if (this.data.course_recommend.text.length > 50) {
            str_text = this.data.course_recommend.text.substring(0,50) + "...";
        }  else {
            str_text = this.data.course_recommend.text;
        }
        str_title = this.data.course_recommend.course_name + " (" + this.data.course_recommend.teacher_name + ")";
        str_subtitle = "\""+this.data.course_recommend.title + "\"" ;
        this.setData({
            str_text:       str_text,
            str_subtitle:   str_subtitle,
            str_title:      str_title,
        })
    },

    makeTestData() {
        this.setData({course_recommend:{
            id : "1afbc",
            user_id : "1afbc",
            time : "2022/09/02",
            agree_cnt : "5",
            disagree_cnt : "3",
            course_id : "1afbcd",
            course_name:"软件工程",
            teacher_name : "欧阳元新",
            semester : "21-22-3",
            rating_total : 5,
            rating_quality : 1.0,
            rating_workload : 5,
            rating_assesment : 5,
            title : "好课",
            text : "这是一条正经的评价这是一条正经的评价这\n是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价",
        }});
        this.setData({
          announcement: "公告",
        })
        console.log(this.data.announcement);
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