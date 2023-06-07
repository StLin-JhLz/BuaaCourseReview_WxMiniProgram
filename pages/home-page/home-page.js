const app = getApp(); // 引入全局的 App 实例

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
        ]
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

       
        // this.fetchImage();
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
        const id = event.currentTarget.dataset.id;
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
  