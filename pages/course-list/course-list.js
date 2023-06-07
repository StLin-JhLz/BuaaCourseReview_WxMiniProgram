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


    const categories = getApp().globalData.college_course_list;
    for (let i = 0; i < categories.length; i++) {
      for (let j = 0; j < categories[i].courses.length; j++) {
        // console.log(categories[i].courses[j].id.charAt(1));
        categories[i].courses[j].module = categories[i].courses[j].id.charAt(1);
        // console.log(categories[i].courses[j].module);
      }
      categories[i].courses_show = [];
      categories[i].courses_show = categories[i].courses_show.concat(categories[i].courses); // 初始化：全部加入
      // console.log(categories[i].courses_show);
    }
    

    this.setData({
      categories : categories
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
    const value = e.detail.value;
    const categories = this.data.categories;
    // console.log(value);
    if (value === '-1') { // 筛选“全部” 全部加入
      for (let i = 0; i < categories.length; i++) {
        categories[i].courses_show = [];
        categories[i].courses_show = categories[i].courses_show.concat(categories[i].courses); // 初始化：全部加入
      }
    } else { // 其它筛选情况
      // console.log("test"+value);
      for (let i = 0; i < categories.length; i++) {
        categories[i].courses_show = [];
        for (let j = 0; j < categories[i].courses.length; j++) {
          if (categories[i].courses[j].module === value)
            categories[i].courses_show.push(categories[i].courses[j]);
        }
        console.log("len" + categories[i].courses_show.length);
      }
    }
    this.setData({
      categories:categories
    })
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
