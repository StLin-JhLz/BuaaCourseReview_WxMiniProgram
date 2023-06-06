Page({
    data: {
      teacherText: '',
      teacherValue: [],
      semesterText: '',
      semesterValue: [],
      years: [
        { label: '2021-2022', value: '2021' },
        { label: '2020-2021', value: '2020' },
        { label: '2019-2020', value: '2019' },
      ],
      semesters: [
        { label: '秋季', value: '1' },
        { label: '春季', value: '3' },
        { label: '暑假', value: '4' },
        { label: '寒假', value: '2' },
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


    },
    onLoad() {
        this.setData({
            course_list : getApp().globalData.course_list,
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
      onChange(e) { //打分
        const { index } = e.currentTarget.dataset;
        const { value } = e.detail;
        this.setData({
          [`value[${index}]`]: value,
        });
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
  