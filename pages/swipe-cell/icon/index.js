Component({
  data: {
    right: [
      {
        text: '编辑',
        icon: {
          name: 'edit',
          size: 16,
        },
        className: 'btn edit-btn',
      },
      {
        text: '删除',
        icon: {
          name: 'delete',
          size: 16,
        },
        className: 'btn delete-btn',
      },
    ],
    rightIcon: [
      {
        icon: 'edit',
        className: 'btn edit-btn',
      },
      {
        icon: 'delete',
        className: 'btn delete-btn',
      },
    ],
  },
  methods: {
    onActionClick({ detail }) {
      wx.showToast({ title: `你点击了${detail.text}`, icon: 'none' });
    },

    onDelete() {
      wx.showToast({ title: '你点击了删除', icon: 'none' });
    },
    onEdit() {
      wx.showToast({ title: '你点击了编辑', icon: 'none' });
    },
    onFavor() {
      wx.showToast({ title: '你点击了收藏', icon: 'none' });
    },
    onChoice() {
      wx.showToast({ title: '你点击了选择', icon: 'none' });
    },
  },
});
