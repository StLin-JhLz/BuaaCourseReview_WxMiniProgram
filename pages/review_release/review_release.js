import { APIS } from "../../utils/api.js"
const apis = APIS
Page({
    data: {
      teacherText: '',
      teacherValue: [],
      semesterText: '',
      semesterValue: [],
      years: [
        { label: '22-23', value: '22-23' },
        { label: '21-22', value: '21-22' },
        { label: '20-21', value: '20-21' },
        { label: '19-20', value: '19-20' },
        { label: '18-19', value: '18-19' },
        { label: '17-18', value: '17-18' },
      ],
      semesters: [
        { label: '秋季', value: '-1' },
        { label: '春季', value: '-3' },
        { label: '暑假', value: '-4' },
        { label: '寒假', value: '-2' },
      ],
      teachers:[],
      value: [0,0,0,0],
        texts: ['1分', '2分', '3分', '4分', '5分'],
    
          //用于搜索
          focus : false,
          searchValue: '',
          course_list_showtionText: '',

          course_select: null,
          course_select_str : "未选择",
          //存储数据
          course_list : [],
          course_list_show : [],

      title : "",
      text:"",
      value1:0,
      value2:0,
      value3:0,
      value4:0,

    },
    submit() {
      console.log("submit");
      // 获取当前日期
      const currentDate = new Date();
      // 获取年份
      const year = currentDate.getFullYear();
      // 获取月份（注意月份是从 0 开始的）
      const month = currentDate.getMonth() + 1;
      // 获取日期
      const day = currentDate.getDate();
      const time_str = year + "/" + month + "/" + day;
      const review = {
        //id : "1afbc", 缺省，交给后端生成
        user_id : getApp().globalData.user_name, //  TODO 
        time : time_str,
        agree_cnt : 0,
        disagree_cnt : 0,
        //course_id : "1afbcd", TODO 等待搜索框补全
        teacher_name : "欧阳元新",
        semester : "21-22-3",
        // rating_total : 5, 缺省
        // rating_quality : 1.0, 缺省
        // rating_workload : 5, 缺省
        // rating_assesment : 5, 缺省
        title : "好课",
        text : "这是一条正经的评价这是一条正经的评价这\n是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价这是一条正经的评价",
      };


      wx.request({
        url: apis.main.url + apis.release.url, // 请求的 URL
        method: apis.release.method, // 请求方法，可选值：OPTIONS、GET、HEAD、POST、PUT、DELETE、TRACE、CONNECT，默认为 GET
        data: { // 请求的参数，以键值对的形式传递
          review : review // todo
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
          wx.showToast({
            title: '提交失败，建议先将评价内容保存到本地以防丢失',
            icon:'fail',  
          })
        },
        complete: function () {
          // 请求完成的回调函数，无论成功还是失败都会执行
        }
      });
    },

    input1(e) {
      const { value } = e.detail;
      this.setData({title:value});
    },

    input2() {
      const { value } = e.detail;
      this.setData({text:value});
    },

    onChange1(e) { //打分
      const { index } = e.currentTarget.dataset;
      const { value } = e.detail;
      this.setData({value1:value});
      this.setData({
        [`value[${index}]`]: value,
      });
    },

    onChange2(e) { //打分
      const { value } = e.detail;
      this.setData({value2:value});
      const { index } = e.currentTarget.dataset;
      this.setData({
        [`value[${index}]`]: value,
      });
    },

    onChange3(e) { //打分
      const { value } = e.detail;
      this.setData({value3:value});
      const { index } = e.currentTarget.dataset;
      this.setData({
        [`value[${index}]`]: value,
      });
    },

    onChange4(e) { //打分
      const { value } = e.detail;
      this.setData({value4:value});
      const { index } = e.currentTarget.dataset;
      this.setData({
        [`value[${index}]`]: value,
      });
    },

    semesterConfirm(event) {
      const value = event.currentTarget.dataset.value;
      const label = event.currentTarget.dataset.label;
      const columns = event.currentTarget.dataset.columns;
      // 使用传递的参数进行相应的逻辑处理
      console.log('Confirm clicked with value:', value);
      console.log('Label:', label);
      console.log('Columns:', columns);
    },



    onLoad() {
      wx.onKeyboardHeightChange(this.onKeyboardHeightChange);
        this.setData({
            course_list : getApp().globalData.course_list,
        });
    },
    onKeyboardHeightChange(event) {
      const { height } = event.detail;
      const bottomDistance = height + 'px';
      this.setData({
        keyboardBottomDistance: bottomDistance
      });
    },
    navigate_courseId(event) {
        const course = event.currentTarget.dataset.course;
        var teachers = [];
        for (let i=0; i<course.teachers.length; i++) {
            let tmp = {};
            tmp["label"] = course.teachers[i];
            tmp["value"] = course.teachers[i];
            teachers.push(tmp);
        }
        this.setData({
            course_select_str: course.name + "(" + course.department + ", " + course.credit + "学分)",
            teachers : teachers
        });
    },
    onColumnChange(e) {
        console.log('picker pick:', e);
      },
  
      onPickerChange(e) {
        const { key } = e.currentTarget.dataset;
        const { value } = e.detail;
  
        console.log('picker change:', e.detail);
        this.setData({
          [`${key}Visible`]: false,
          [`${key}Value`]: value,
          [`${key}Text`]: value.join(' '),
        });
      },
  
      onPickerCancel(e) {
        const { key } = e.currentTarget.dataset;
        console.log(e, '取消');
        console.log('picker1 cancel:');
        this.setData({
          [`${key}Visible`]: false,
        });
      },
  
      onTeacherPicker() {
        this.setData({ teacherVisible: true });
      },
  
      onSemesterPicker() {
        this.setData({ semesterVisible: true });
      },
      

      changeHandle(e) { // 搜索课程名
        const { value } = e.detail;
        const searchValue = value;
        this.setData({
          searchValue,
        });
        //console.log(value);

        //实现搜索的功能
        var list = this.data.course_list;		//先把第二条json存起来
        var list2 = [];		//定义一个数组
        //循环去取数据
        for(var i=0;i<list.length;i++) {
          var string = list[i].name;
          //查询json里的name是否包含搜索的关键词，如果有就把他装进list2数组
          if(string.indexOf(searchValue) >= 0){
           list2.push(list[i]);
           //console.log(i+list[i].name);
          }
        }
        //到这里list2就已经是你查出的数据
        //如果输入的关键词为空就加载原来的全部数据，不是空就加载搜索到的数据
        if(searchValue == ""){
          //加载全部
          this.setData({
            course_list_show: list
          })
        } else {
          this.setData({
            course_list_show: list2
          })
        }
        //console.log("length"+this.data.course_list_show.length);
      },
  
      focusHandle() {
        this.setData({
            focus : true,
          course_list_showtionText: '取消',
        });
      },
  
      blurHandle() {
        this.setData({
            focus : false,
          course_list_showtionText: '',
        });
      },
  
      course_list_showtionHandle() {
        this.setData({
          searchValue: '',
          course_list_showtionText: '',
        });
      },
  });
  