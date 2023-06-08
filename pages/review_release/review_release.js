import { APIS } from "../../utils/api.js"
const apis = APIS
Page({
    data: {
      //课程列表
      course_list : [],
      course_list_show : [],

      // 搜索课程名相关
      searchInput: '',
      showDropdown: false, // 是否展示下拉框
      searchResults: [],
      course_list: [
        { title: 'Computer Science and Technology', subtitle: '计算机科学与技术' },
        { title: 'Software Engineering', subtitle: '软件工程' },
        { title: 'Information Security', subtitle: '信息安全' },
        // 其他数据项...
      ],
      
      // 选择器相关
      teachers:[],
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
      

      //打分相关
      // value: [0,0,0,0],
        texts: ['1分', '2分', '3分', '4分', '5分'],

      //选择结果
      course_select: null,
      course_select_str : "未选择",
      teacher_name_select : null,
      semester_select : null,

      value1:0,
      value2:0,
      value3:0,
      value4:0,    
      title : "",
      text:"",
      score:"",
      

    },
    //search相关
    handleSearchInput(e) {
        // console.log("Helloworld");
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

      focusHandle() {
          // console.log("focus");
        this.setData({
            showDropdown : true,
          // course_list_showtionText: '取消',
        });
      },
  
      blurHandle() {
        // console.log("blur");
        this.setData({
            showDropdown : false,
          // course_list_showtionText: '',
        });
      },

      selectItem(event) {
        var selectedItem = event.currentTarget.dataset.item;
        const course = event.currentTarget.dataset.item;
        if (this.data.course_select!= null && course.id != this.data.course_select.id) { // 更换课程则清空教师选择
          this.setData({
            teacher_name_select:null,
          })
        }
        
        var teachers = [];
        for (let i=0; i<course.teachers.length; i++) {
            let tmp = {};
            tmp["label"] = course.teachers[i];
            tmp["value"] = course.teachers[i];
            teachers.push(tmp);
        }
        this.setData({
            showDropdown : false,
            course_select : course,
            course_select_str: course.name + ' (' + course.department + ', ' + course.id + ')',
            teachers:teachers,
        })
        // 在这里可以对选中的课程信息进行进一步处理

      },


    submit() {
      if (this.data.course_select == null) {
        wx.showToast({
          title: '请选择课程',
          icon : "error",
        })
        return
      }
      else if ( this.data.teacher_name_select == null) {
        wx.showToast({
          title: '请选择教师',
          icon : "error",
        })
        return
      }
      else if (this.data.semester_select == null) {
        wx.showToast({
          title: '请选择学期',
          icon : "error",
        })
        return
      }
      
      else if(this.data.value1 * this.data.value2 * this.data.value3 * this.data.value4 == 0){
            wx.showToast({
                title: '请完成评分',
                icon : "error",
              })
              return
      }else if(this.data.title.length == 0){
        wx.showToast({
            title: '标题不能为空',
            icon : "error",
          })
          return
      }else if(this.data.text.length < 10){
        wx.showToast({
          title: '正文不能少于10个字',
          icon : "error",
        })
        return
    } 
    //   console.log("submit");
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
        course_id : this.data.course_select.id,
        teacher_name : this.data.teacher_name_select,
        semester : this.data.semester_select,
        // rating_total : 5, 缺省
        // rating_quality : 1.0, 缺省
        // rating_workload : 5, 缺省
        // rating_assesment : 5, 缺省
        title : this.data.title,
        text : this.data.text,
      };
      console.log( review);
	  const self = this;
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
			wx.navigateTo({
				url: '/pages/review_overview/review_overview?id=' + self.data.course_select.id,
			  });
          
        },
        fail: function (err) {
          // 请求失败的回调函数
          wx.showToast({
            title: '提交失败',
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

    input2(e) {
      const { value } = e.detail;
      this.setData({text:value});
    },

    input3(e) {
        const { value } = e.detail;
        this.setData({score:value});
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
      const semester = event.detail.value[0] + event.detail.value[1];
      // const value = event.currentTarget.dataset.value;
      // const label = event.currentTarget.dataset.label;
      // const columns = event.currentTarget.dataset.columns;
      // 使用传递的参数进行相应的逻辑处理
      console.log(semester);
      this.setData({
        semester_select : semester,
      })
      //console.log(teacher_name == null);
    },

    teacherConfirm(event) {
      const teacher_name = event.detail.value[0];
      // const value = event.currentTarget.dataset.value;
      // const label = event.currentTarget.dataset.label;
      // const columns = event.currentTarget.dataset.columns;
      // 使用传递的参数进行相应的逻辑处理
      console.log(teacher_name);
      this.setData({
        teacher_name_select : teacher_name,
      })
      //console.log(teacher_name == null);
    },



    onLoad() {
        wx.onKeyboardHeightChange(this.onKeyboardHeightChange);
        this.setData({
            course_list : getApp().globalData.course_list,
        });
		wx.setNavigationBarTitle({
			title: '北航课程测评-发布评测'  // 替换成你想要的新标题
		  });
    },
    onKeyboardHeightChange(event) {
      const { height } = event.detail;
      const bottomDistance = height + 'px';
      this.setData({
        keyboardBottomDistance: bottomDistance
      });
    },
    onColumnChange(e) {
        console.log('picker pick:', e);
      },
  
      // onPickerChange(e) {
      //   const { key } = e.currentTarget.dataset;
      //   const { value } = e.detail;
  
      //   console.log('picker change:', e.detail);
      //   this.setData({
      //     [`${key}Visible`]: false,
      //     [`${key}Value`]: value,
      //     [`${key}Text`]: value.join(' '),
      //   });
      // },
  
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
      

      // changeHandle(e) { // 搜索课程名
      //   const { value } = e.detail;
      //   const searchValue = value;
      //   this.setData({
      //     searchValue,
      //   });
      //   //console.log(value);

      //   //实现搜索的功能
      //   var list = this.data.course_list;		//先把第二条json存起来
      //   var list2 = [];		//定义一个数组
      //   //循环去取数据
      //   for(var i=0;i<list.length;i++) {
      //     var string = list[i].name;
      //     //查询json里的name是否包含搜索的关键词，如果有就把他装进list2数组
      //     if(string.indexOf(searchValue) >= 0){
      //      list2.push(list[i]);
      //      //console.log(i+list[i].name);
      //     }
      //   }
      //   //到这里list2就已经是你查出的数据
      //   //如果输入的关键词为空就加载原来的全部数据，不是空就加载搜索到的数据
      //   if(searchValue == ""){
      //     //加载全部
      //     this.setData({
      //       course_list_show: list
      //     })
      //   } else {
      //     this.setData({
      //       course_list_show: list2
      //     })
      //   }
      //   //console.log("length"+this.data.course_list_show.length);
      // },
  
    //   focusHandle() {
    //     this.setData({
    //         focus : true,
    //       course_list_showtionText: '取消',
    //     });
    //   },
  
    //   blurHandle() {
    //     this.setData({
    //         focus : false,
    //       course_list_showtionText: '',
    //     });
    //   },
  
      course_list_showtionHandle() {
        this.setData({
          searchValue: '',
          course_list_showtionText: '',
        });
      },
	  onShow() {
		this.setData({
			course_select: null,
			course_select_str : "未选择",
			teacher_name_select : null,
			semester_select : null,
	  
			value1:0,
			value2:0,
			value3:0,
			value4:0,    
			title : "",
			text:"",
			score:"",})
	  }
  });
  