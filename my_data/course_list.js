const image = 'https://tdesign.gtimg.com/miniprogram/images/example2.png';
const items = new Array(12).fill({ label: '标题文字', image }, 0, 12);
var course_list = [
    { "label": "01 材料","title": "01 材料学院","badgeProps": {}, "items" : items.slice(0,9)},
]

module.exports = {courseList:course_list}