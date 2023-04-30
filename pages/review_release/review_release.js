Component({
    data: {
      cityText: '',
      cityValue: [],
      dateText: '',
      dateValue: [],
      years: [
        { label: '2021-2022', value: '2021' },
        { label: '2020-2021', value: '2020' },
        { label: '2019-2020', value: '2019' },
      ],
      seasons: [
        { label: '秋季', value: '1' },
        { label: '春季', value: '3' },
        { label: '暑假', value: '4' },
        { label: '寒假', value: '2' },
      ],
      value: [3, 3, 0],
        texts: ['1分', '2分', '3分', '4分', '5分'],
    },
  
    methods: {
      onColumnChange(e) {
        console.log('picker pick:', e);
      },
  
      onPickerChange(e) {
        const { key } = e.currentTarget.dataset;
        const { value } = e.detail;
  
        console.log('picker change:', e.detail);
        this.setData({
          [`${key}Visible`]: false,
          [`${key}Value`]: value,
          [`${key}Text`]: value.join(' '),
        });
      },
  
      onPickerCancel(e) {
        const { key } = e.currentTarget.dataset;
        console.log(e, '取消');
        console.log('picker1 cancel:');
        this.setData({
          [`${key}Visible`]: false,
        });
      },
  
      onCityPicker() {
        this.setData({ cityVisible: true });
      },
  
      onSeasonPicker() {
        this.setData({ dateVisible: true });
      },
      onChange(e) {
        const { index } = e.currentTarget.dataset;
        const { value } = e.detail;
        this.setData({
          [`value[${index}]`]: value,
        });
      },
    },
  });
  