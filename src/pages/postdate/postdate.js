$(function() {
	var Utils = require("../../common/utils");
	var dialog = require("../../components/dialog/dialog");
	var loading = require("../../components/loading/loading");
	
	var app = {
    	init: function() {
    		$('#dateDesc').focus();

    		var listH = $(window).height() - 300;
    		$('.what-block').height(listH);
    		
    		this.initEvent();
    	},

    	/**
         * 初始化事件
         */
        initEvent: function () {
        	var me = this;

        	$(document).on('focus', 'textarea', function () {
                // $('.post-option')[0].scrollIntoView(true);
                
            });

        }
    };

    app.init();
	
});