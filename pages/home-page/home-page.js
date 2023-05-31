Page({
    data: {
        //用于搜索
        focus : false,
      value: '',
      course_list_showtionText: '',
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
        const id = event.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/review_overview/review_overview?id=' + id,
          });
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
        for(var i=0;i<list.length;i++){
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
          value: '',
          course_list_showtionText: '',
        });
      },
  },

  
  
);
  