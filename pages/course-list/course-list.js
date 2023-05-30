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
      if(apis.main.api_undefined == true) this.makeTestData();
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

  makeTestData() {
    const items = [
        { name: '信息系统分析与设计', id: 'id' },
        { name: '学科技术前沿讲座', id: 'id' },
        { name: '计算机网络安全技术', id: 'id' },
        { name: '科研课堂', id: 'id' },
        { name: '计算机网络', id: 'id' },
        { name: '面向对象设计与构造', id: 'id' },
        { name: '软件项目管理', id: 'id' },
        { name: '操作系统', id: 'id' },
        { name: '计算机科学方法论', id: 'id' },
        { name: '网络攻防技术', id: 'id' },
        { name: 'X86汇编程序设计', id: 'id' },
        { name: '物联网与大数据系统设计', id: 'id' },
        { name: '软件工程', id: 'id' },
        { name: '机器学习工程基础', id: 'id' },
        { name: '人机交互', id: 'id' },
        { name: '虚拟现实理论与算法', id: 'id' },
        { name: '计算机网络实验', id: 'id' },
        { name: 'FPGA多核并行计算', id: 'id' },
        { name: '离散数学（3）', id: 'id' },
        { name: '离散数学（1）', id: 'id' },
        { name: '电子商务', id: 'id' },
        { name: '大数据分析', id: 'id' },
        { name: '人工智能', id: 'id' },
        { name: '人工智能安全导论', id: 'id' },
        { name: '虚拟现实人机交互', id: 'id' },
        { name: '社会计算', id: 'id' },
        { name: '数据可视化分析技术', id: 'id' },
        { name: '计算引论', id: 'id' },
        { name: '信号处理与信息推断', id: 'id' },
        { name: '高级算法设计与分析', id: 'id' },
        { name: '新型计算机系统设计与性能优化', id: 'id' }
      ];      
    const categories = [ 
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
      ];
    this.setData({
       categories: categories,
    })
    }
});
