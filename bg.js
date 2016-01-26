chrome.contextMenus.create({
  title: 'Download background image',
  contexts: ['page','selection','link','editable','image','video', 'audio'],
  onclick: (_, tab) => chrome.tabs.sendMessage(tab.id, 'downloadbg')
});
