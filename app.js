import gulpError from './utils/gulpError';
const test = true

App({

    globalData: {
        navigate_courseId: null, // 初始化全局变量 courseId
        college_course_list:[],
        course_list:[],
    },
    onShow() {
        if (gulpError !== 'gulpErrorPlaceHolder') {
            wx.redirectTo({
                url: `/pages/gulp-error/index?gulpError=${gulpError}`,
            });
        }
    },
    onLaunch() {
        if (test == true) {
            this.makeTestData();
        }

        //wx.request

        for (let i=0; i<this.globalData.college_course_list.length; i++) {
            for(let j=0; j<this.globalData.college_course_list[i].items.length; j++) {
                this.globalData.course_list.push(this.globalData.college_course_list[i].items[j]);
                //console.log(j+this.globalData.college_course_list[i].items[j].name);
            }
        }
        //console.log(this.globalData.course_list.length);
    },

    makeTestData() {
        const items = [
            { name: '信息系统分析与设计', id: 'id', department:'计算机学院', credit:'2' },
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
        this.globalData.college_course_list = [ 
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
              items: [],
            },
            {
              label: '73 书院',
              title: '标题四',
              badgeProps: {
                count: 6,
              },
              items: [],
            },
            {
              label: '智慧树',
              title: '标题五',
              badgeProps: {},
              items: [],
            },
          ];
    }
});
