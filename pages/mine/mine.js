Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_name : null,
    
  },

  logOut() {
    getApp().globalData.user_name = "";
    wx.setStorage({
      key:"user_name",
      data:null,
    })
    console.log("退出成功");
    wx.showToast({
      title: '退出成功',
      icon: 'none',
      duration: 1000,
      mask: true,
    });
    this.setData({
      user_name: null,
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      username: getApp().globalData.user_name,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})