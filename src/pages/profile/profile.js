$(function() {
	var Utils = require("../../common/utils");
	
	var width = $(window).width();
	$('.photo').height(width/2);
	$('.tags').height(width/2);

	$('.details').addClass('open');
});