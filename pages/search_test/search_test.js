Page({
    data: {
      searchInput: '',
      showDropdown: false,
      searchResults: [],
      resultsData: [
        { title: 'Computer Science and Technology', subtitle: '计算机科学与技术' },
        { title: 'Software Engineering', subtitle: '软件工程' },
        { title: 'Information Security', subtitle: '信息安全' },
        // 其他数据项...
      ]
    },
    onInput(e) {
      const inputText = e.detail.value.trim();
      const keywords = inputText.split(' ');
  
      if (keywords.length > 0) {
        const results = this.data.resultsData.filter((result) => {
          return keywords.every((keyword) => {
            return result.title.includes(keyword);
          });
        });
  
        this.setData({
          searchInput: inputText,
          showDropdown: true,
          searchResults: results,
        });
      } else {
        this.setData({
          searchInput: inputText,
          showDropdown: true,
          searchResults: [],
        });
      }
    },
    selectItem(e) {
      const selectedItem = e.currentTarget.dataset.item;
      console.log(selectedItem.title);
      this.setData({
        searchInput: selectedItem.title,
        showDropdown: false,
      });
    },
  });
  