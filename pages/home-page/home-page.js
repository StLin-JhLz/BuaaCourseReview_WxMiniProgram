const app = getApp(); // 引入全局的 App 实例
import { APIS } from "../../utils/api.js"
const apis = APIS
Page({
    data: {

        //用于搜索
        focus : false,
      value: '',
      course_list_showtionText: '',
      //存储数据
      course_list : [],
      course_list_show : [],
      imageUrl : '',
      //search相关
      searchInput: '',
        showDropdown: false, // 是否展示下拉框
        searchResults: [],
        course_list: [
        { title: 'Computer Science and Technology', subtitle: '计算机科学与技术' },
        { title: 'Software Engineering', subtitle: '软件工程' },
        { title: 'Information Security', subtitle: '信息安全' },
        // 其他数据项...
        ],

        //首页课程推荐
        course_recommend : null, // 实质应该是review_recommend
        str_text: "",
        str_subtitle : "",
        str_title : "",
        announcement:"",
    },
    
    selectItem(event) {
      var selectedItem = event.currentTarget.dataset.item;
      console.log('选中的课程信息：', selectedItem);

      const id = event.currentTarget.dataset.item.id;
        wx.navigateTo({
            url: '/pages/review_overview/review_overview?id=' + id,
          });

      // 在这里可以对选中的课程信息进行进一步处理
    },
  
    //search相关
    handleSearchInput(e) {
        console.log("Helloworld");
        const inputText = e.detail.value.trim();
        const keywords = inputText.split(' ');
    
        if (keywords.length > 0) {
          const results = this.data.course_list.filter((result) => {
            return keywords.every((keyword) => {
              return result.name.includes(keyword);
            });
          });
    
          this.setData({
            searchInput: inputText,
            showDropdown: true,
            searchResults: results,
          });
        } else {
          this.setData({
            searchInput: inputText,
            showDropdown: true,
            searchResults: [],
          });
        }
      },

      hideDropdown (event) {

          this.setData({
            showDropdown: false
          });
      },

    onLoad() {
        
        
        this.setData({
            course_list : getApp().globalData.course_list,
        });
        const self=this;
        if (apis.main.api_undefined == true)
            this.makeTestData();
        wx.request({
            url: apis.mainurl + apis.recommend.url, // 请求的 URL
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
          wx.request({
            url: apis.main.url + apis.announcement.url, // 请求的 URL
            method: apis.announcement.method, // 请求方法，可选值：OPTIONS、GET、HEAD、POST、PUT、DELETE、TRACE、CONNECT，默认为 GET
            data: { // 请求的参数，以键值对的形式传递
            },
            // header: { // 请求的头部信息，以键值对的形式传递
            //   'Content-Type': 'application/json'
            // },
            success: function (res) {
              // 请求成功的回调函数
              //console.log(res.data); // 返回的数据
              self.setData({
                announcement:res.data.res
              })
            },
            fail: function (err) {
              // 请求失败的回调函数
              console.log("获取公告失败");
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
        str_title = this.data.course_recommend.course_name + "（" + this.data.course_recommend.teacher_name + " 老师" +  "）";
        str_subtitle = "——\""+this.data.course_recommend.title + "\"" ;
        this.setData({
            str_text:       str_text,
            str_subtitle:   str_subtitle,
            str_title:      str_title,
        })
       
        // this.fetchImage();
    },

    makeTestData() {
      const course_recommend = {
        id : "1afbc",
        user_id : "1afbc",
        time : "2022/09/02",
        agree_cnt : "5",
        disagree_cnt : "3",
        course_id : "1afbcd",
        course_name:"软件工程",
        teacher_name : "孙青",
        semester : "21-22-3",
        rating_total : 5,
        rating_quality : 1.0,
        rating_workload : 5,
        rating_assesment : 5,
        title : "好课",
        text : "学到了很多东西，包括前端的微信小程序开发方法，后端的数据库相关知识。还有老师上课讲的软件工程相关知识。希望能在课程开始的时候讲下工具链，感觉直接上手有点难",
    };
      this.setData({course_recommend:course_recommend, announcement:"公告：欢迎使用北航课程宝，本学期课程已经更新"});
  },

    onShow() {
        console.log(this.data.course_list.length);
        console.log("hello");
    },

    fetchImage() {
        wx.request({
            url: 'https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/0884436661/p302255.png', // 替换为您要获取的图片地址
            responseType: 'arraybuffer', // 设置响应类型为二进制数组
            success: (res) => {
              const arrayBuffer = res.data; // 获取到的二进制数组
              const base64 = wx.getFileSystemManager().readFileSync({
                filePath: wx.env.USER_DATA_PATH + '/temp_image.jpg',
                data: arrayBuffer,
                encoding: 'base64',
              }); // 将二进制数据转换为 base64 字符串
              const imageUrl = `data:image/jpeg;base64,${base64}`; // 构建图片的 data URI
              this.setData({
                imageUrl: imageUrl, // 将图片路径存储在 data 中
              });
            },
            fail: (error) => {
              console.error('请求失败', error);
            }
          });
      },

    navigate_courseId(event) {
        // const id = event.currentTarget.dataset.id;
        const id = this.data.course_recommend.id;
        console.log("navigate" + id);
        wx.navigateTo({
            url: '/pages/review_overview/review_overview?id=' + id,
          });
    },

    handleClick() {
      if (getApp().globalData.user_name == null) {
        wx.showToast({
          title: '发布评测前请先登录',
          icon: 'none',
          duration: 1000,
          mask: true,
        });
        wx.navigateTo({
          url: '/pages/login_register/register/register',
        });
      } else {
        wx.navigateTo({
          url: '/pages/review_release/review_release',
        });
      }
      
    },

    changeHandle(e) {
        const { value } = e.detail;
        this.setData({
          value,
        });
        //console.log(value);

        //实现搜索的功能
        var list = this.data.course_list;		//先把第二条json存起来
        var list2 = [];		//定义一个数组
        //循环去取数据
        for(var i=0;i<list.length;i++) {
          var string = list[i].name;
          //查询json里的name是否包含搜索的关键词，如果有就把他装进list2数组
          if(string.indexOf(e.detail.value) >= 0){
           list2.push(list[i]);
           //console.log(i+list[i].name);
          }
        }
        //到这里list2就已经是你查出的数据
        //如果输入的关键词为空就加载原来的全部数据，不是空就加载搜索到的数据
        if(e.detail.value == ""){
          //加载全部
          this.setData({
            course_list_show: list
          })
        } else {
          this.setData({
            course_list_show: list2
          })
        }
      },
  
      focusHandle() {
        this.setData({
            showDropdown : true,
          // course_list_showtionText: '取消',
        });
      },
  
      blurHandle() {
        console.log("focus");
        this.setData({
            showDropdown : false,
          // course_list_showtionText: '',
        });
      },
  
      course_list_showtionHandle() {
        this.setData({
          value: '',
          course_list_showtionText: '',
        });
      },
  },

  
  
);
  