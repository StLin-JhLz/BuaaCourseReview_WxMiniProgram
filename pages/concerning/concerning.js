// pages/concerning/concerning.js
import { APIS } from "../../utils/api.js"
const apis = APIS

Page({

    /**
     * 页面的初始数据
     */
    data: {
        text : "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if (apis.main.api_undefined == true)
            this.makeTestData();
        wx.request({
            url: 'apis.main.url' + 'apis.concerning.url', 
            method: "apis.review.method",
            
            success: function (res){
                console.log(res.data);
                self.setData({
                    text : res.data.text
                })
            },

            fail: function (err){
                console.log(err)
            }
        })

    },

    makeTestData(){
        this.setData({
            'text' : '1'
        })
    },

    
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})