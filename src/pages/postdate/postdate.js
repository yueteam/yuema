$(function() {
	var Utils = require('../../common/utils');
    var Apimap = require('../../common/apimap');
	var Tips = require('../../components/tips');
	var Ajax = require('../../components/ajax');
	var Dialog = require('../../components/dialog/dialog');
	var Loading = require('../../components/loading/loading');
	var Calendar = require('../../components/calendar/calendar');
	
	var now = new Date(),
        today = new Date(now.setHours(0, 0, 0, 0)),
        tommorrow = new Date(today.getTime() + 1 * 86400 * 1000),
        last30days = new Date(today.getTime() + 29 * 86400 * 1000);

       var submitData = {
    		   typeId:1
       };

	var app = {
    	init: function() {
            if(!Utils.isLogin()) {
                window.location.href = './login.html';
                return false;
            }

    		$('#dateDesc').focus();

    		var listH = $(window).height() - $('.textarea-box').height() - $('.post-option').height();
            $('.panels').height(listH);
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

            var getOptWhereWidth = function() {
            	var conW = $('.bar-con').width(),
            		whatW = $('#optWhat').width(),
            		whenW = $('#optWhen').width();

            	var whereW = conW - whatW - whenW - 33;
            	$('#optWhere').css('maxWidth', whereW);
            };

            // 选择约什么
            $(document).on('tap', '.what-item', function () {
            	var $this = $(this),
            		val = $this.data('val'),
            		text = $this.html();

            	if($this.hasClass('selected')) {
            		return false;
            	}
            	$('.what-list .selected').removeClass('selected');
            	$this.addClass('selected');
            	$('#optWhat').html(text).show();
            	getOptWhereWidth();
            	submitData.typeId = val;
            });

            // 选择约时间
            $(document).on('tap', '.when-item', function () {
            	var $this = $(this),
            		val = $this.data('val');

            	$('.when-list .selected').removeClass('selected');
            	$this.addClass('selected');
            	if(val != 3) {
            		var text = $this.html();
            		$('#optWhen').html('<span class="iconfont icon-calendar"></span>'+text).show();
            		getOptWhereWidth();
            	}
                if(val == 1) {
                    var theDate = Utils.formatDate(today);
                    $('#calLink').val(theDate);
                } else if(val == 2) {
                    var theDate = Utils.formatDate(tommorrow);
                    $('#calLink').val(theDate);
                } else if(val == 0) {
                    $('#calLink').val('');
                }
            	// submitData.datingTimeType = val;
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
                	var date = Utils.formatDate(new Date(values[0]));
                	date = date.replace(/\-/g,'/');
                	$('#optWhen').html('<span class="iconfont icon-calendar"></span>'+date).show();
                	getOptWhereWidth();
                }
            });

            // 发送
            $(document).on('tap', '#sendBtn', function () {
            	var desc = $.trim($('#dateDesc').val());

            	if(desc === '') {
            		Tips.show({
	                    type: 'error',
	                    title: '说点什么吧'
	                });
            	} else {
            		submitData.article = desc;
            		if($('#calLink').val() !== '') {
            			submitData.datingTime = $('#calLink').val();
            		}
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
           
            Ajax.post(Apimap.postDatingApi, {
					'datingInfo': JSON.stringify(submitData)
				},
				function(d){
					Loading.hide();

				    Tips.show({
	                    type: 'success',
	                    title: '发布成功'
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