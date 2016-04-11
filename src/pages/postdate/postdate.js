$(function() {
	var Utils = require("../../common/utils");
	var Tips = require('../../components/tips');
	var Dialog = require("../../components/dialog/dialog");
	var Loading = require("../../components/loading/loading");
	var Ajax = require('../../components/ajax');
	
	var app = {
    	init: function() {
    		$('#dateDesc').focus();

    		var listH = $(window).height() - 300;
    		$('.opt-panel').height(listH);

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

            $(document).on('tap', '.opt-item', function () {
            	var $this = $(this),
            		opt = $this.data('opt');

            	if($this.hasClass('active')) {
            		return false;
            	}

            	$('.post-option .active').removeClass('active');
            	$this.addClass('active');
            	$('.opt-panel.open').removeClass('open');
            	$('.'+opt+'-block').addClass('open');
            });

        },

        /**
         * 提交数据
         */
        doSubmit: function () {
            var me = this;

            Loading.show();
           
            Ajax.post('http://test.yuema.us/open-api/regist', {
            		'method': 'regist',
					'userInfo': JSON.stringify(submitData)
				},
				function(d){
					Loading.hide();

				    Tips.show({
	                    type: 'success',
	                    title: '保存成功'
	                });
				},
				function(d){
					Loading.hide();

				    Tips.show({
	                    type: 'error',
	                    title: d.resultMsg
	                });
				}
			);

        }
    };

    app.init();
	
});