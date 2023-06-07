import gulpError from './utils/gulpError';
const test = true
import { APIS } from "utils/api.js"
const apis = APIS

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
      
        const self = this;
        if (test == true) {
            this.makeTestData();
        } 

        wx.request({
          url: apis.main.url + apis.courselist.url ,
          method : apis.courselist.method,
          success(res) {
              self.globalData.college_course_list = college_course_list;
          },
          fail() {
            console.log("fail in app.js");
          }
        })

        for (let i=0; i<this.globalData.college_course_list.length; i++) {
            for(let j=0; j<this.globalData.college_course_list[i].courses.length; j++) {
                this.globalData.course_list.push(this.globalData.college_course_list[i].courses[j]);
                //console.log(j+this.globalData.college_course_list[i].courses[j].name);
            }
        }
        
    },

    makeTestData() {
        const courses = [
            { name: '软件工程', id: 'B1A12345', department:'计算机学院', credit:'2', teachers:['欧阳','孙青'] },
            { name: '学科技术前沿讲座', id: 'B1A12345' },
            { name: '计算机网络安全技术', id: 'B1A12345' },
            { name: '科研课堂', id: 'B1A12345' },
            { name: '计算机网络', id: 'B1A12345' },
            { name: '面向对象设计与构造', id: 'B1A12345' },
            { name: '软件项目管理', id: 'B1A12345' },
            { name: '操作系统', id: 'B1A12345' },
            { name: '计算机科学方法论', id: 'B1A12345' },
            { name: '网络攻防技术', id: 'B1A12345' },
            { name: 'X86汇编程序设计', id: 'B1A12345' },
            { name: '物联网与大数据系统设计', id: 'B1A12345' },
            { name: '机器学习工程基础', id: 'B1A12345' },
            { name: '人机交互', id: 'B1A12345' },
            { name: '虚拟现实理论与算法', id: 'B1A12345' },
            { name: '计算机网络实验', id: 'B1A12345' },
            { name: 'FPGA多核并行计算', id: 'B1A12345' },
            { name: '离散数学（3）', id: 'B1A12345' },
            { name: '离散数学（1）', id: 'B1A12345' },
            { name: '电子商务', id: 'B1A12345' },
            { name: '大数据分析', id: 'B1A12345' },
            { name: '人工智能', id: 'B1A12345' },
            { name: '人工智能安全导论', id: 'B1A12345' },
            { name: '虚拟现实人机交互', id: 'B1A12345' },
            { name: '社会计算', id: 'B1A12345' },
            { name: '数据可视化分析技术', id: 'B1A12345' },
            { name: '计算引论', id: 'B1A12345' },
            { name: '信号处理与信息推断', id: 'B1A12345' },
            { name: '高级算法设计与分析', id: 'B1A12345' },
            { name: '新型计算机系统设计与性能优化', id: 'B1A12345' }
          ];      
        
        this.globalData.college_course_list = [
            {
             name:"材料科学与工程学院",
             num:"01",
             name_s:"材料",
             courses:courses,
            },
            {
             name:"电子信息工程学院",
             num:"02",
             name_s:"电子",
            },
            {
             name:"自动化科学与电气工程学院",
             num:"03",
             name_s:"自动化",
            },
            {
             name:"能源与动力工程学院",
             num:"04",
             name_s:"能源",
            },
            {
             name:"航空科学与工程学院",
             num:"05",
             name_s:"航空",
            },
            {
             name:"计算机学院",
             num:"06",
             name_s:"计算机",
            },
            {
             name:"机械工程及自动化学院",
             num:"07",
             name_s:"机械",
            },
            {
             name:"经济管理学院",
             num:"08",
             name_s:"经管",
            },
            {
             name:"数学科学学院",
             num:"09",
             name_s:"数院",
            },
            {
             name:"生物与医学工程学院",
             num:"10",
             name_s:"生医",
            },
            {
             name:"人文社会科学学院",
             num:"11",
             name_s:"人文",
            },
            {
             name:"外国语学院",
             num:"12",
             name_s:"外国语",
            },
            {
             name:"交通科学与工程学院",
             num:"13",
             name_s:"交通",
            },
            {
             name:"可靠性与系统工程学院",
             num:"14",
             name_s:"可靠性",
            },
            {
             name:"宇航学院",
             num:"15",
             name_s:"宇航",
            },
            {
             name:"飞行学院",
             num:"16",
             name_s:"飞院",
            },
            {
             name:"仪器科学与光电工程学院",
             num:"17",
             name_s:"仪光",
            },
            {
             name:"北京学院",
             num:"18",
             name_s:"北院",
            },
            {
             name:"物理学院",
             num:"19",
             name_s:"物院",
            },
            {
             name:"法学院",
             num:"20",
             name_s:"法学院",
            },
            {
             name:"软件学院",
             num:"21",
             name_s:"软院",
            },
            {
             name:"未来空天技术学院/高等理工学院",
             num:"23",
             name_s:"沈元",
            },
            {
             name:"中法工程师学院",
             num:"24",
             name_s:"中法",
            },
            {
             name:"国际学院",
             num:"25",
             name_s:"国际",
            },
            {
             name:"新媒体艺术与设计学院",
             num:"26",
             name_s:"新媒体",
            },
            {
             name:"美育中心",
             num:"26",
             name_s:"美育",
            },
            {
             name:"化学学院",
             num:"27",
             name_s:"化院",
            },
            {
             name:"马克思主义学院",
             num:"28",
             name_s:"马院",
            },
            {
             name:"人文与社会科学高等研究院",
             num:"29",
             name_s:"高研院",
            },
            {
             name:"空间与环境学院",
             num:"30",
             name_s:"环境",
            },
            {
             name:"工程训练中心",
             num:"32",
             name_s:"工训",
            },
            {
             name:"体育部",
             num:"33",
             name_s:"体育部",
            },
            {
             name:"国际通用工程学院",
             num:"35",
             name_s:"国通",
            },
            {
             name:"网络空间安全学院",
             num:"39",
             name_s:"网安",
            },
            {
             name:"人工智能研究院",
             num:"42",
             name_s:"AI",
            },
            {
             name:"集成电路科学与工程学院",
             num:"49",
             name_s:"集电",
            },
            {
             name:"学生处武装部",
             num:"51",
             name_s:"武装部",
            },
            {
             name:"图书馆",
             num:"52",
             name_s:"图书馆",
            },
            {
             name:"校团委",
             num:"53",
             name_s:"校团委",
            },
            {
             name:"校医院",
             num:"56",
             name_s:"校医院",
            },
            {
             name:"招生就业处",
             num:"56",
             name_s:"招就处",
            },
            {
             name:"校机关",
             num:"56",
             name_s:"校机关",
            },
            {
             name:"校内其它单位",
             num:"56",
             name_s:"其他",
            },
            {
             name:"北航学院",
             num:"70",
             name_s:"书院",
            },
            {
             name:"医学科学与工程学院",
             num:"83",
             name_s:"医工",
            },
            {
             name:"航空发动机研究院",
             num:"86",
             name_s:"航发",
            },
            {
             name:"校外单位",
             num:"A1",
             name_s:"校外",
            },
            {
             name:"沙河高教园区高校联盟",
             num:"FF",
             name_s:"高教园",
            },
           ];
           for(let i=1; i<this.globalData.college_course_list.length;i++) {
            this.globalData.college_course_list[i].courses = [];
        }  
        // this.globalData.college_course_list = [ 
        //     {
        //       label: '42计算机',
        //       title: '06 计算机学院',
        //       badgeProps: {},
        //       courses: courses,
        //     },
        //     {
        //       label: '8经管',
        //       title: '',
        //       badgeProps: {},
        //       courses: [],
        //     },
        //     {
        //       label: '09 数学',
        //       title: '',
        //       badgeProps: {},
        //       courses: [],
        //     },
        //     {
        //       label: '10 生医',
        //       title: '',
        //       badgeProps: {},
        //       courses: [],
        //     },
        //     {
        //       label: '11 人文',
        //       title: '',
        //       badgeProps: {},
        //       courses: [],
        //     },
        //     {
        //       label: '12 外语',
        //       title: '',
        //       badgeProps: {},
        //       courses: [],
        //     },
        //     {
        //       label: '13 交通',
        //       title: '',
        //       badgeProps: {},
        //       courses: [],
        //     },
        //     {
        //       label: '14 可靠',
        //       title: '',
        //       badgeProps: {},
        //       courses: [],
        //     },
        //     {
        //       label: '15 宇航',
        //       title: '',
        //       badgeProps: {},
        //       courses: [],
        //     },
        //     {
        //       label: '16 飞行',
        //       title: '',
        //       badgeProps: {},
        //       courses: [],
        //     },
        //     {
        //       label: '23 高工',
        //       title: '23 沈元荣誉学院',
        //       badgeProps: {},
        //       courses: [],
        //     },
        //     {
        //       label: '73 书院',
        //       title: '标题四',
        //       badgeProps: {
        //         count: 6,
        //       },
        //       courses: [],
        //     },
        //     {
        //       label: '智慧树',
        //       title: '标题五',
        //       badgeProps: {},
        //       courses: [],
        //     },
        //   ];
    }
});
