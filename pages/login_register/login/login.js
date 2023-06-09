import { APIS } from "../../../utils/api.js"
const apis = APIS

Page({
    data: {
      formData: {},
      showPassword: false,
    },
    changEye: function () {
      this.setData({
        showPassword: !this.data.showPassword
      })
    },
    inputChange: function (e) {
      let prop = e.currentTarget.dataset.prop
      let value = e.detail.value
      this.data.formData[prop] = value
      this.setData({
        formData: this.data.formData
      })
    },
    login: function (res) {
      let account = this.data.formData.account
      let password = this.data.formData.password
  
      if (!account) {
        wx.showToast({
          icon: 'none',
          title: "账号不能为空",
        })
        return
      }
  
      if (!password) {
        wx.showToast({
          icon: 'none',
          title: "密码不能为空",    
          
        })
        return
      }
      // 查询数据库，校验账号密码是否正确
      
      wx.request({
        url: apis.main.url + apis.login.url, //仅为示例，并非真实的接口地址
        method: apis.login.method,
        data: {
          user_name: account,
          password: password
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          if(res.data.res==0) {
            console.log("登录成功");
            getApp().globalData.user_name = account; // 记录；
            wx.setStorage({key:"user_name", data:account});//存入缓存
            wx.navigateTo({url:'/pages/home-page/home-page'}); //跳转到首页
          } else {
            wx.showToast({
              title: '用户名或密码错误，登录失败',
              icon: 'none',
              duration: 1000,
              mask: true,
            });
            console.log("登录失败");
          }
          
        },
        fail (res) {
            console.log(res.data)
        }
    // 查询数据库，校验账号密码是否正确
    // wx.cloud.database().collection('user').where({
    //   account: account,
    //   password: password
    // }).get().then(
    //   res => {
    //     let data = res.data
    //     if (data.length > 0) {
    //       wx.showToast({
    //         icon: "success",
    //         title: "登录成功",
    //       })
    //     } else {
    //       wx.showToast({
    //         icon: "error",
    //         title: "账号或密码错误，请重试",
    //       })
    //     }
    //   })
        })     
    },
    register:function () {
        wx.navigateTo({
            url: '/pages/login_register/register/register',
            fail: () => {
                wx.navigateTo({
                    url: '/pages/home/navigateFail/navigateFail',
                });
            },
        });
    },

    onShow() {
      //this.getTabBar().init();
    },
  })