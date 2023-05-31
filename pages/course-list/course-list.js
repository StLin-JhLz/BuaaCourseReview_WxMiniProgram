// pages/course-list/course-list.js
import { APIS } from "../../utils/api.js"
const apis = APIS

Page({
  offsetTopList: [],
  data: {
    catValue: 0, // category value
    sideBarIndex: 1,
    scrollTop: 0,
    // categories: course_list_json.courseList
    categories: [], // 课程列表
  },
  onLoad() {
    this.setData({
        categories : getApp().globalData.college_course_list
    });
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

  onShow() {
      
  },

  clickCourse(event){
      const id = event.currentTarget.dataset.id;
      getApp().globalData.navigate_courseId = id;
    wx.navigateTo({
        url: '/pages/review_overview/review_overview?id=' + id,
      });
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
