// pages/course-list/course-list.js
const image = 'https://tdesign.gtimg.com/miniprogram/images/example2.png';
const items = new Array(12).fill({ label: '计算机网络实验', image }, 0, 12);
var course_list_json = require('../../my_data/course_list')

Page({
  offsetTopList: [],
  data: {
    catValue: 0, // category value
    sideBarIndex: 1,
    scrollTop: 0,
    // categories: course_list_json.courseList
    categories: [
      {
        label: '01 材院',
        title: '01 材料学院',
        badgeProps: {},
        items: items.slice(0,9),
      },
      {
        label: '06 计院',
        title: '06 计算机学院',
        badgeProps: {
          dot: true,
        },
        items: items.slice(0,9),
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
    init();


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
