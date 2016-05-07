$(function() {
	var Utils = require('../../common/utils');
    var Apimap = require('../../common/apimap');
	var Loading = require('../../components/loading/loading');
	var Tips = require('../../components/tips');
	var FormValid = require('../../components/formvalid');
	var Ajax = require('../../components/ajax');
    var CryptoJS = require('../../components/sha1');

    var fv = new FormValid({
        container: '.reg-form',
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

            $('.reg-form').find('[data-submit]').each(function() {

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
           
            Ajax.post(Apimap.registApi, {
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