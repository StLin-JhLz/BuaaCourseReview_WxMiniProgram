// pages/review_overview/review_overview.js
import { APIS } from "../../utils/api.js"
const apis = APIS

Page({

    

    /**
     * 页面的初始数据
     */
    data: {
        buttonText: '时间排序',
        buttonColor: '#C9A048',
        isClicked: false,
        isAgreed: false,
        isOpposed: false,
        course:{
            id : "",
            name : "",
            department : "",
            teachers: [],
            teachers_name2index:{},
            teachers_filter : [],
            teachers_filter_cnt : 0,
        },
        overviews:[{
            semester:"",
            reviews_cnt:"",
            rating_total : 5,
            rating_quality : 5,
            rating_workload : 5,
            rating_assesment : 5,
        }],
        reviews:[],
        reviews_cnt:0,
        reviews_show:[],
        reviews_show_cnt : 0,
        state_text :"已举报",
        sort: 0, //0 发布时间 1 学期
    },
    
    methods: {
        onToTop(e) {
          console.log('backToTop', e);
        },
    },

    /*
        按钮选中
    */
   handleButtonClick() {
    const buttonText = this.data.buttonText === '时间排序' ? '学期排序' : '时间排序';
    if (buttonText ==  '学期排序' )
        this.sortBySemester();
    else
        this.sortByTime();
    this.setData({
      buttonText: buttonText
    });
  },
   handleButtonTouchStart() {
    this.setData({
      buttonColor: '#ccc' // 设置按下时的背景色
    });
  },

  handleButtonTouchEnd() {
    this.setData({
      buttonColor: '#C9A048' // 恢复初始的背景色
    });
  },

   toggleClicked() {
        this.setData({
            isClicked: !this.data.isClicked,
        });
    },
    toggleAgreed(event) { // 赞
        const id = event.currentTarget.dataset.item;
        const index = event.currentTarget.dataset.index;
        const reviews_show = this.data.reviews_show;
        const agreed = !reviews_show[index].isAgreed;
        reviews_show[index].isAgreed = agreed;
        var op;
        if(!agreed) op = -1;
        else op = 1;
        console.log(op);
        const self = this;
        
        reviews_show[index].agree_cnt = this.data.reviews_show[index].agree_cnt +op;
        //test
        // self.setData({
        //    reviews_show:reviews_show
        // })
        wx.request({
            url: apis.main.url + apis.interaction.url, // 请求的 URL
            method: apis.interaction.method, // 请求方法，可选值：OPTIONS、GET、HEAD、POST、PUT、DELETE、TRACE、CONNECT，默认为 GET
            data: { // 请求的参数，以键值对的形式传递
              review_id: id, // todo
              op:1,
            },
            // header: { // 请求的头部信息，以键值对的形式传递
            //   'Content-Type': 'application/json'
            // },
            success: function (res) {
                self.setData({
                    reviews_show:reviews_show
                 })
            },
            fail: function (err) {
              console.log("点赞失败");
            },
            complete: function () {
            }
          });
          
    },
    toggleOpposed(event) {
        const id = event.currentTarget.dataset.item;
        const index = event.currentTarget.dataset.index;
        const reviews_show = this.data.reviews_show;
        const opposed = !reviews_show[index].isOpposed;
        reviews_show[index].isOpposed = opposed;
        var op;
        if(!opposed) op = -1;
        else op = 1;
        console.log(op);
        const self = this;
        
        reviews_show[index].disagree_cnt = this.data.reviews_show[index].disagree_cnt +op;
        //test
        // self.setData({
        //    reviews_show:reviews_show
        // })
        wx.request({
            url: apis.main.url + apis.interaction.url, // 请求的 URL
            method: apis.interaction.method, // 请求方法，可选值：OPTIONS、GET、HEAD、POST、PUT、DELETE、TRACE、CONNECT，默认为 GET
            data: { // 请求的参数，以键值对的形式传递
              review_id: id, // todo
              op:2,
            },
            // header: { // 请求的头部信息，以键值对的形式传递
            //   'Content-Type': 'application/json'
            // },
            success: function (res) {
                self.setData({
                    reviews_show:reviews_show
                 })
            },
            fail: function (err) {
              console.log("点赞失败");
            },
            complete: function () {
            }
          });
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
        const self = this
        const course_id = getApp().globalData.navigate_courseId;
        console.log(course_id);
        if (apis.main.api_undefined == true)
            this.makeTestData();
        wx.request({
            url: apis.main.url + apis.review.url, // 请求的 URL
            method: apis.review.method, // 请求方法，可选值：OPTIONS、GET、HEAD、POST、PUT、DELETE、TRACE、CONNECT，默认为 GET
            data: { // 请求的参数，以键值对的形式传递
              course_id : course_id, // todo
            },
            // header: { // 请求的头部信息，以键值对的形式传递
            //   'Content-Type': 'application/json'
            // },
            success: function (res) {
              // 请求成功的回调函数
              //console.log(res.data); // 返回的数据
              self.setData({
                course: res.data.course,
                reviews: res.data.reviews,
                
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
        self.setData({reviews_cnt:this.data.reviews.length})

        this.data.course.teachers_filter = [];
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
            "reviews_show" : this.data.reviews ,
        });
        this.setData({
            reviews_show_cnt: this.data.reviews_show.length
        });

        this.makeRateScore();
        this.setData({
            "course.teachers_filter_cnt" : 0,
            sort:0,
        });
        //console.log(this.data.course.teachers_filter_cnt);
        
    },

    makeRateScore() {
         //排序，获得评分总览
         this.sortByTime();
         const overview_src = {
            semester:"",
            reviews_cnt:0,
            rating_total : 0,
            rating_quality : 0,
            rating_workload : 0,
            rating_assesment : 0,
        };
        var overviews = [];
        var overview = {...overview_src};
        var semester = "0";
        var i=0;
        for(; i<this.data.reviews_show.length; i++) {
            if (this.data.reviews_show[i].semester.localeCompare(semester) != 0) {
                if (i != 0) {
                    overview.semester = semester;
                    overview.rating_total /= overview.reviews_cnt;
                    overview.rating_quality /= overview.reviews_cnt;
                    overview.rating_workload /= overview.reviews_cnt;
                    overview.rating_assesment /= overview.reviews_cnt;
                    overview.rating_total = overview.rating_total.toFixed(1);
                    overview.rating_quality = overview.rating_quality.toFixed(1);
                    overview.rating_workload = overview.rating_workload.toFixed(1);
                    overview.rating_assesment = overview.rating_assesment.toFixed(1);
                    overviews.push({...overview});
                    overview = {...overview_src};
                    console.log(overviews[0].semester);
                } 
            }
            semester = this.data.reviews_show[i].semester;
            overview.rating_total += this.data.reviews_show[i].rating_total;
            overview.rating_quality += this.data.reviews_show[i].rating_quality;
            overview.rating_workload += this.data.reviews_show[i].rating_workload;
            overview.rating_assesment += this.data.reviews_show[i].rating_assesment;
            overview.reviews_cnt ++;
            
        } 
        if(i!=0){
            overview.semester = semester;
            overview.rating_total /= overview.reviews_cnt;
            overview.rating_quality /= overview.reviews_cnt;
            overview.rating_workload /= overview.reviews_cnt;
            overview.rating_assesment /= overview.reviews_cnt;
            overview.rating_total = overview.rating_total.toFixed(1);
            overview.rating_quality = overview.rating_quality.toFixed(1);
            overview.rating_workload = overview.rating_workload.toFixed(1);
            overview.rating_assesment = overview.rating_assesment.toFixed(1);
            overviews.push({...overview});
            console.log(overviews[0].semester);
            overview = overview_src;
        }
        for(let i=0; i<overviews.length; i++) {
            overviews[i].isAgreed = 0;
            overviews[i].isOpposed = 0;
        }
        
        this.setData({overviews:overviews});
    },

    sortByTime() {
        console.log("sortByTime");
        //排序，获得评分总览
        this.data.reviews_show.sort((a,b)=>{
            if(a.time.localeCompare(b.time)  == 0)
                return a.semester.localeCompare(b.semester) *-1;
            return a.time.localeCompare(b.time) *-1;
        });
        this.setData({
            reviews_show : this.data.reviews_show
        })
    },

    sortBySemester() {
        console.log("sortBySemester");
        this.data.reviews_show.sort((a,b)=>{
            if(a.semester.localeCompare(b.semester) *-1 == 0)
                return a.time.localeCompare(b.time)*-1 ;
            return a.semester.localeCompare(b.semester) *-1;
        });
        this.setData({
            reviews_show : this.data.reviews_show,
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
        this.makeRateScore();
        this.setData({
            "course.teachers_filter_cnt" : cnt,
            reviews_show_cnt: this.data.reviews_show.length,
        });
    },
    
    reportReview(event) {
        const reviewId = event.currentTarget.dataset.id;
        // 在这里处理举报操作
        // 可以使用reviewId来获取对应的评价对象，然后更新report_cnt值
      },
    
    supportReview(event) {

    },

    opposeReview(event) {

    },

    makeTestData() {
        var course = {
            id : "B3I063210",
            name : "软件工程",
            department : "计算机学院",
            teachers: ['欧阳元新','孙青','测试一','测试二','测试三', '测试四'],
            teachers_filter:[],
            teachers_name2index:{}
        };
        this.setData({
            course: course,
        })
        var a = [{
            id : "1",
            user_id : "user",
            time : "2020/09/02",
            agree_cnt : 0,
            disagree_cnt : 0,
            course_id : "B3I063210",
            course_name:"计算机网络",
            teacher_name : "欧阳元新",
            semester : "21-22-3",
            rating_total : 5,
            rating_quality : 1,
            rating_workload : 5,
            rating_assesment : 5,
            title : "好课",
            text : "这是一条正经的评价这是一条正经的评价这\n是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价",
        }, {
            id : "1afbc",
            user_id : "1afbc",
            time : "2022/09/01",
            agree_cnt : 5000,
            disagree_cnt : 3000,
            course_id : "1afbcd",
            teacher_name : "孙青",
            semester : "20-21-3",
            rating_total : 5,
            rating_quality : 5,
            rating_workload : 5,
            rating_assesment : 5,
            title : "好课",
            text : "这是一条正经的评价这是一条正经的评价这是一条正经的评\n价这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价",
        },{
            id : "1afbc",
            user_id : "1afbc",
            time : "2022/09/01",
            agree_cnt : 5,
            disagree_cnt : 3,
            course_id : "1afbcd",
            teacher_name : "孙青",
            semester : "20-21-3",
            rating_total : 1.0,
            rating_quality : 4,
            rating_workload : 5,
            rating_assesment : 5,
            title : "好课",
            text : "这是一条正经的评价这是一条正经的评价这是一条正经的评\n价这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价",
        }];
        
        //console.log(this.data.length);
        a.forEach(element => {this.data.reviews.push(element)});
        // this.data.reviews.push(a);
        // this.data.reviews.push(b);
        this.setData({
           reviews : this.data.reviews,
          
        })
        //console.log(this.data.reviews.push(a));
    }
})