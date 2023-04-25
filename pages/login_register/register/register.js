Page({
    data: {
      formData: {},
      showPassword: false,
      showPassword_confirm: false,
    },
    changEye: function () {
      this.setData({
        showPassword: !this.data.showPassword
      })
    },
    changEye_confirm: function () {
        this.setData({
          showPassword_confirm: !this.data.showPassword_confirm
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

    register: function (res) {
      let account = this.data.formData.account
      let password = this.data.formData.password
      let password_confirm = this.data.formData.password_confirm
  
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

      if (password != password_confirm) {
        wx.showToast({
            icon: 'none',
            title: "两次密码输入不一致",
          })
          return
      }

      // 查询数据库，校验账号密码是否正确

      wx.request({
        url: 'buaa.edu.cn/api/user/login', //仅为示例，并非真实的接口地址
        data: {
          account: account,
          password: password
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
            wx.showToast({
                icon: 'none',
                title: "注册成功",
              })
              return
        }
        })     
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
    wx.showToast({
        icon: 'none',
        title: "注册失败",
    })
    },
    login:function () {
        wx.navigateTo({
            url: '/pages/login_register/login/login',
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