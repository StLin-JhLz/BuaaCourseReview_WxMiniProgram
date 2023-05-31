// pages/review_overview/review_overview.js
import { APIS } from "../../utils/api.js"
const apis = APIS
Page({

    /**
     * 页面的初始数据
     */
    data: {
        course:{
            courseName : "",
            departmentName : "",
            credit : "",
            teachers: [],
            teachers_name2index:{},
            teachers_filter : [],
        },
        reviews:[],
        reviews_show:[]
    },
    
    methods: {
        onToTop(e) {
          console.log('backToTop', e);
        },
    },

    /**
     * 生命周期函数--监听页载
     */
    onLoad() { 
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
        const course_id = getApp().globalData.navigate_courseId;
        console.log(course_id);
        if (apis.main.api_undefined == true)
            this.makeTestData();
        wx.request({
            url: apis.main.url + apis.review.url, // 请求的 URL
            method: apis.review.method, // 请求方法，可选值：OPTIONS、GET、HEAD、POST、PUT、DELETE、TRACE、CONNECT，默认为 GET
            data: { // 请求的参数，以键值对的形式传递
              course_id : course_id // todo
            },
            // header: { // 请求的头部信息，以键值对的形式传递
            //   'Content-Type': 'application/json'
            // },
            success: function (res) {
              // 请求成功的回调函数
              //console.log(res.data); // 返回的数据
              self.setData({
                course: res.data.course,
                reviews: res.data.reviews
              })
            },
            fail: function (err) {
              // 请求失败的回调函数
              console.log(err);
            },
            complete: function () {
              // 请求完成的回调函数，无论成功还是失败都会执行
            }
          });
        //创建teachers_filters数组
        for (let i = 0; i < this.data.course.teachers.length; i++) {
            this.data.course.teachers_filter.push(0);
        } 
        this.setData({
            "teachers_filter" : this.data.course.teachers_filter
        });
        // 初始化teachers_name2index
        for (let i = 0; i < this.data.course.teachers.length; i++) {
            this.data.course.teachers_name2index[this.data.course.teachers[i]] = i;
        } 
        this.setData({
            "teachers_name2index" : this.data.course.teachers_name2index
        });
        // 初始化review_show
        this.setData({
            "reviews_show" : this.data.reviews 
        });
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

    filterTeachers(event) {
        const checked = event.detail.checked;
        const index = event.currentTarget.dataset.index;
        // 1 更改筛选bool数组
        const teachers_filter = [...this.data.course.teachers_filter];
        teachers_filter[index] = checked ? 1 : 0;
        this.setData({
            'course.teachers_filter': teachers_filter
        });
        // 2 统计筛选老师数量
        let cnt = 0;
        for (let i=0; i<this.data.course.teachers.length; i++) {
            if (this.data.course.teachers_filter[i] == 1)
                cnt++;
        }
        //进行处理
        if (cnt == 0) {
            this.setData({
                "reviews_show" : this.data.reviews 
            })
        } else {
            this.setData({
                "reviews_show" : []
            })
            for (let i=0; i<this.data.reviews.length; i++) {
                if (this.data.course.teachers_filter[this.data.course.teachers_name2index[this.data.reviews[i].teacher_name]] == true)
                    this.data.reviews_show.push(this.data.reviews[i]);
            }
            this.setData({
                "reviews_show" : this.data.reviews_show
            })
        }
    },
    
    reportReview(event) {

    } ,
    
    supportReview(event) {

    },

    opposeReview(event) {

    },

    makeTestData() {
        var course = {
            courseName : "软件工程",
            departmentName : "计算机学院",
            credit : "2",
            teachers: ['欧阳元新','孙青','测试一','测试二','测试三'],
            teachers_filter:[],
            teachers_name2index:{}
        };
        this.setData({
            course: course,
        })
        var a = {
            id : "1afbc",
            user_id : "1afbc",
            time : "2022/09/02",
            agree_cnt : "5",
            disagree_cnt : "3",
            course_id : "1afbcd",
            teacher_name : "欧阳元新",
            semester : "21-22-3",
            rating_total : 5,
            rating_quality : 5,
            rating_workload : 5,
            rating_assesment : 5,
            title : "好课",
            text : "这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价",
        };
        var b = {
            id : "1afbc",
            user_id : "1afbc",
            time : "2022/09/02",
            agree_cnt : "5",
            disagree_cnt : "3",
            course_id : "1afbcd",
            teacher_name : "孙青",
            semester : "21-22-3",
            rating_total : 5,
            rating_quality : 5,
            rating_workload : 5,
            rating_assesment : 5,
            title : "好课",
            text : "这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价",
        };
        //console.log(this.data.length);
        this.data.reviews.push(a);
        this.data.reviews.push(b);
        this.setData({
           reviews : this.data.reviews,
        })
        //console.log(this.data.reviews.push(a));
    }
})