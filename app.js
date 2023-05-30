import gulpError from './utils/gulpError';
App({

    globalData: {
        navigate_courseId: null, // 初始化全局变量 courseId
    },
    onShow() {
        if (gulpError !== 'gulpErrorPlaceHolder') {
            wx.redirectTo({
                url: `/pages/gulp-error/index?gulpError=${gulpError}`,
            });
        }
    },
});
