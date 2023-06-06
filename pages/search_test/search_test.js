Page({
    data: {
      searchInput: '',
      showDropdown: false,
      searchResults: [],
      resultsData: [
        '计算机科学与技术',
        '软件工程',
        '信息安全',
        '数据科学与大数据技术',
        '人工智能',
        '云计算与大数据技术',
        '物联网工程',
        '通信工程',
        '电子信息工程',
        '自动化',
        '机械工程',
        '能源与动力工程',
        '电气工程及其自动化',
        '材料科学与工程',
        '土木工程',
        '交通工程',
        '航空航天工程',
        '环境工程',
        '化学工程与工艺',
        '生物医学工程',
        '药学',
        '生物科学',
        '生物技术',
        '食品科学与工程',
        '医学影像学',
        '临床医学',
        '口腔医学',
        '护理学',
        '公共卫生学',
        '法学',
        '行政管理',
        '社会工作',
        '社会学',
        '心理学',
        '教育学',
        '汉语言文学',
        '新闻传播学',
        '历史学',
        '哲学',
        '考古学',
        '经济学',
        '国际经济与贸易',
        '金融学',
        '市场营销',
        '工商管理',
        '旅游管理',
        '人力资源管理',
        '酒店管理',
        '艺术设计',
        '音乐学',
        '舞蹈学',
        '戏剧与影视学'
      ]
    },
    onInput(e) {
      const inputText = e.detail.value.trim();
      const keywords = inputText.split(' ');
  
      const filteredResults = this.data.resultsData.filter((result) => {
        return keywords.every((keyword) => {
          return result.includes(keyword);
        });
      });
  
      this.setData({
        searchInput: inputText,
        showDropdown: true,
        searchResults: filteredResults
      });
    },
    selectItem(e) {
      const selectedItem = e.currentTarget.dataset.item;
      console.log(selectedItem);
      this.setData({
        searchInput: selectedItem,
        showDropdown: false
      });
    }
  });
  