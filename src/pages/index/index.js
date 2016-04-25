$(function() {
	var Utils = require("../../common/utils");
	var Flipsnap = require("../../components/flipsnap");
	var Yue = require("../../mods/yue/yue");

	var $pointer = $('.icons i'),
		$item = $('.scroller .item');

	var flipsnap = Flipsnap('#daily-sale .scroller', {
	    distance: $item.width()+8
	});

	flipsnap.element.addEventListener('fspointmove', function() {
		if(flipsnap.currentPoint == flipsnap._maxPoint){
			
		}
		$item.filter('.current').removeClass('current');
	    $item.eq(flipsnap.currentPoint).addClass('current');
	    $pointer.filter('.current').removeClass('current');
	    $pointer.eq(flipsnap.currentPoint).addClass('current');
	}, false);

	flipsnap.moveToPoint(1);

	var html = Utils.template($('#result-tmpl').html(), {
		title: 'test',
		content: 'hahaha'
	});

	Yue.init();

});