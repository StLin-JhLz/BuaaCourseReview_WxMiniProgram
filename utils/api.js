export const APIS ={    
    main:{
        //url: "http://127.0.0.1:8080",
        url : "",
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
    release:{
        url: "/api/review/release",
        method: "POST"
    },
    review:{
        url: "/api/review",
        method: "GET"
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