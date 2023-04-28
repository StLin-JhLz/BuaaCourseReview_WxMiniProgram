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
        label: '01 材料',
        title: '01 材料学院',
        badgeProps: {},
        items,
      },
      {
        label: '06 计算机',
        title: '06 计算机学院',
        badgeProps: {
          dot: true,
        },
        items: items.slice(0, 9),
      },
      {
        label: '选项三',
        title: '标题三',
        badgeProps: {},
        items: items.slice(0, 9),
      },
      {
        label: '选项四',
        title: '标题四',
        badgeProps: {
          count: 6,
        },
        items: items.slice(0, 6),
      },
      {
        label: '选项五',
        title: '标题五',
        badgeProps: {},
        items: items.slice(0, 3),
      },
    ]
  },
  onLoad() {
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
