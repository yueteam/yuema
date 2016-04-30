$(function() {
	var Utils = require("../../common/utils");
	var Yue = require("../../mods/yue/yue");

	var html = Utils.template($('#list-tmpl').html(), {
		list: [
			{
				'id': 123,
				'words': '美队3要上映了，周末去看吗',
				'time': '2016/05/06',
				'tag': 3,
				'iconCls': 'icon-film',
				'what': '电影'
			},
			{
				'id': 123,
				'words': '美队3要上映了，周末去看吗',
				'time': '2016/05/06',
				'tag': 3,
				'iconCls': 'icon-film',
				'what': '电影'
			},
			{
				'id': 123,
				'words': '美队3要上映了，周末去看吗',
				'time': '2016/05/06',
				'tag': 3,
				'iconCls': 'icon-film',
				'what': '电影'
			}
		]
	});
	$('.list').html(html);

	Yue.init();

});