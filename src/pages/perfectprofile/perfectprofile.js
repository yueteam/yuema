var Utils = require('../../common/utils');
var Apimap = require('../../common/apimap');
var Loading = require('../../components/loading/loading');
var Tips = require('../../components/tips');
var FormValid = require('../../components/formvalid');
var Ajax = require('../../components/ajax');
$(function() {

    var fv = new FormValid({
        container: '.fm',
        checkIntime: false,
        handAllResult: function (errors) {
            if (errors.length) {
                var elem = $(errors[0].elem);
                var type = errors[0].type || 'require';
                var msg = elem.data(type+'-msg');

                Tips.show({
                    type: 'error',
                    title: msg
                });
            }
        },
        handFieldResult: function (elem, msg, isShow) {

        }
    });

    var submitData = {};

    var app = {
    	init: function() {
    		this.initEvent();
    	},

    	/**
         * 初始化步骤2事件
         */
        initEvent: function () {
        	var me = this;

        	// 上传图片
        	$(".file-upload").on('change', function() {
		    	$('#formFile')[0].submit();
		    });

            // 选择性别
            $('.sex-item').on('tap', function() {
                if(!$(this).hasClass('selected')) {
                    var sexVal = $(this).data('val');
                    $('.sex-row .selected').removeClass('selected');
                    $(this).addClass('selected');

                    $('#sex').val(sexVal);
                }
            });

            // 选择城市
            $(document).on('tap', '#chooseCity', function() {
                Utils.stopEventTap();
                $('.city-panel').addClass('open');
            });

            $(document).on('tap', '.city-item', function() {
                Utils.stopEventTap();

                var $this = $(this),
                    text = $this.text(),
                    value = $this.data('val');
                if(!$this.hasClass('active')) {
                    $('.city-list .active').removeClass('active');
                    $this.addClass('active');
                    $('#chooseCity').text(text);
                    $('#cityId').val(value);
                }
                $('.city-panel').removeClass('open');
            });

            // 选择圈子
            $(document).on('tap', '#chooseQz', function() {
                Utils.stopEventTap();
                $('.qz-panel').addClass('open');
            });

            $(document).on('tap', '.qz-item', function() {
                Utils.stopEventTap();

                var $this = $(this),
                    text = $this.text(),
                    value = $this.data('val');
                if(!$this.hasClass('active')) {
                    $('.qz-list .active').removeClass('active');
                    $this.addClass('active');
                    $('#chooseQz').text(text);
                    $('#socialId').val(value);
                }
                $('.qz-panel').removeClass('open');
            });

		    // 注册提交事件
            $('#save').on('tap', function () {
                var $this = $(this);

                var valid = fv.checkAll();

                if (!valid) {
                    console.log('表单验证不通过');
                    return;
                } else {
                    me.setSubmitData();
                }
            });
        },

    	/**
         * 设置提交数据
         */
        setSubmitData: function () {
        	var me = this;

            $('.fm').find('[data-submit]').each(function() {

                var $this = $(this);
                var isSubmit = $this.data('submit');
                var type = $this.attr('id');
                var value = $this.val();

                if (isSubmit == 'true' || isSubmit == true) {
					submitData[type] = value;
                }

            });

            console.log('setSubmitData', submitData);
            me.doSubmit();
        },

        /**
         * 提交数据
         */
        doSubmit: function () {
            var me = this;

            Loading.show();
           
            Ajax.post(Apimap.perfectApi, {
					'userInfo': JSON.stringify(submitData)
				},
				function(d){
					Loading.hide();

				    Tips.show({
	                    type: 'success',
	                    title: '保存成功'
	                });

                    setTimeout(function() {
                        window.location.href = './profile.html';
                    }, 500);
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