export const APIS ={
    main:{
        url: "",
        api_undefined: true //是否使用测试数据展示效果
    },
    login :{
      url: "/api/login",
      method: "POST"
    },
    register :{
        url: "/api/register",
        method: "POST"
    },
    review_release:{
        url: "/api/review/release",
        method: "POST"
    },
    review:{
        url: "/api/review",
        method: "POST"
    },
    courselist:{
        url: "/api/course_list",
        method: "GET"
    },
    interaction:{
        url: "/api/review/interaction",
        method: "POST"
    },
    report:{
        url: "/api/report",
        method: "POST"
    },
    concerning:{
        url: "/api/concerning",
        method: "GET"
    },
    recommend:{
        url: "/api/recommend",
        method: "GET"
    },
    announcement:{
        url: "/api/announcement",
        method: "GET"
    }
  }