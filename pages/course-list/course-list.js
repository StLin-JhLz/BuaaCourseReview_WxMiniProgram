// pages/course-list/course-list.js
const image = 'https://tdesign.gtimg.com/miniprogram/images/example2.png';
// const items = new Array(12).fill({ label: '计算机网络实验', image }, 0, 12);
const items = [{label:'信息系统分析与设计',image},{label:'学科技术前沿讲座',image},{label:'计算机网络安全技术',image},{label:'科研课堂',image},{label:'计算机网络',image},{label:'面向对象设计与构造',image},{label:'软件项目管理',image},{label:'操作系统',image},{label:'计算机科学方法论',image},{label:'网络攻防技术',image},{label:'X86汇编程序设计',image},{label:'物联网与大数据系统设计',image},{label:'软件工程',image},{label:'机器学习工程基础',image},{label:'人机交互',image},{label:'虚拟现实理论与算法',image},{label:'计算机网络实验',image},{label:'FPGA多核并行计算',image},{label:'离散数学（3）',image},{label:'离散数学（1）',image},{label:'电子商务',image},{label:'大数据分析',image},{label:'人工智能',image},{label:'人工智能安全导论',image},{label:'虚拟现实人机交互',image},{label:'社会计算',image},{label:'数据可视化分析技术',image},{label:'计算引论',image},{label:'信号处理与信息推断',image},{label:'高级算法设计与分析',image},{label:'新型计算机系统设计与性能优化',image}];
const items_src = ['计算机组成','计算机网络','面向对象设计与构造','操作系统','软件工程','离散数学（1）','计算机科学方法论','软件工程','计算机网络实验'];
var course_list_json = require('../../my_data/course_list');

Page({
  offsetTopList: [],
  data: {
    catValue: 0, // category value
    sideBarIndex: 1,
    scrollTop: 0,
    // categories: course_list_json.courseList
    categories: [ 
      {
        label: '06 计院',
        title: '06 计算机学院',
        badgeProps: {},
        items: items,
      },
      {
        label: '08 经管',
        title: '',
        badgeProps: {},
        items: [],
      },
      {
        label: '09 数学',
        title: '',
        badgeProps: {},
        items: [],
      },
      {
        label: '10 生医',
        title: '',
        badgeProps: {},
        items: [],
      },
      {
        label: '11 人文',
        title: '',
        badgeProps: {},
        items: [],
      },
      {
        label: '12 外语',
        title: '',
        badgeProps: {},
        items: [],
      },
      {
        label: '13 交通',
        title: '',
        badgeProps: {},
        items: [],
      },
      {
        label: '14 可靠',
        title: '',
        badgeProps: {},
        items: [],
      },
      {
        label: '15 宇航',
        title: '',
        badgeProps: {},
        items: [],
      },
      {
        label: '16 飞行',
        title: '',
        badgeProps: {},
        items: [],
      },
      {
        label: '23 高工',
        title: '23 沈元荣誉学院',
        badgeProps: {},
        items: items.slice(0, 9),
      },
      {
        label: '73 书院',
        title: '标题四',
        badgeProps: {
          count: 6,
        },
        items: items.slice(0, 6),
      },
      {
        label: '智慧树',
        title: '标题五',
        badgeProps: {},
        items: items.slice(0, 3),
      },
    ]
  },
  onLoad() {
    //init();


    const query = wx.createSelectorQuery().in(this);
    const { sideBarIndex } = this.data;

    query
      .selectAll('.title')
      .boundingClientRect((rects) => {
        this.offsetTopList = rects.map((item) => item.top);
        this.setData({ scrollTop: rects[sideBarIndex].top });
      })
      .exec();
  },

  init() {
    var items = this.items;
    for(var i = 0 ; i <this.data.items_src.length; i++) {
        var dict = {};
        items.push()
    }
    this.setData()
    // wx.request({
    //     url: './api/course_list', //仅为示例，并非真实的接口地址
    //     data: {
    //     },
    //     header: {
    //       'content-type': 'application/json' // 默认值
    //     },
    //     success (res) {
    //         var cat = this.data.categories;
    //         var dep2course = res.data.dep2course;
    //         for(let key in dep2course) {
    //             //初始化数组
    //             var course_id = [];
    //             var course_name = [];
    //             var dep_num = 
    //             var src_course_id = dep2course[key];
    //             for (var i = 0 ; i < src_course_id.length; i++) {
    //                 var dep_num = 
    //                 course_id.push(src_course_id[i]);
    //                 course_name.push(get_course_name_by_id(src_course_id[i]));//TODO
    //             }
    //         }
    //       console.log(res.data)
    //     }
    //   })
  },

  onTabsChange(e) {
    this.setData({ catValue: e.detail.value })
  },

  onSideBarChange(e) {
    const { value } = e.detail;

    this.setData({ sideBarIndex: value, scrollTop: this.offsetTopList[value] });
  },
  onScroll(e) {
    const { scrollTop } = e.detail;
    const threshold = 50; // 下一个标题与顶部的距离

    if (scrollTop < threshold) {
      this.setData({ sideBarIndex: 0 });
      return;
    }

    const index = this.offsetTopList.findIndex((top) => top > scrollTop && top - scrollTop <= threshold);

    if (index > -1) {
      this.setData({ sideBarIndex: index });
    }
  },
});
