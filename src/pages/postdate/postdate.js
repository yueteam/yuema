$(function() {
	var Utils = require('../../common/utils');
	var Tips = require('../../components/tips');
	var Ajax = require('../../components/ajax');
	var Dialog = require('../../components/dialog/dialog');
	var Loading = require('../../components/loading/loading');
	var Calendar = require('../../components/calendar/calendar');
	
	var now = new Date(),
        today = new Date(now.setHours(0, 0, 0, 0)),
        last30days = new Date(today.getTime() + 29 * 86400 * 1000);

       var submitData = {};

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

            // 选择约什么
            $(document).on('tap', '.what-item', function () {
            	var $this = $(this),
            		val = $this.data('val'),
            		text = $this.html();

            	if($this.hasClass('selected')) {
            		return false;
            	}
            	submitData.tag = val;
            	$('.what-list .selected').removeClass('selected');
            	$this.addClass('selected');
            	$('#optWhat').html(text);
            });

            // 选择约时间
            $(document).on('tap', '.when-item', function () {
            	var $this = $(this),
            		val = $this.data('val');

            	if(val == 3) {

            	} else {
            		var text = $this.html();
            		$('#optWhen').html('<span class="iconfont icon-calendar"></span>'+text);
            	}
            	submitData.when = val;
            });

            // 日历组件
            new Calendar({
                dateFormat: 'yyyy-mm-dd',
                value: '',
                multiple: false,
                minDate: today,
                closeOnSelect: true,
                input: $('#calLink'),
                footer: true,
                onChange: function (p, values) {

                }
            });

            // 发送
            $(document).on('tap', '#sendBtn', function () {
            	submitData.desc = $.trim($('#dateDesc').val());

            	if(submitData.desc === '') {
            		Tips.show({
	                    type: 'error',
	                    title: '说点什么吧'
	                });
            	} else {
            		submitData.date = $('#calLink').val();
            		console.log(submitData);
            		me.doSubmit();
            	}
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