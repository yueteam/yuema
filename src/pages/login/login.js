$(function() {
	var Utils = require('../../common/utils');
	var Apimap = require('../../common/apimap');
	var Tips = require('../../components/tips');
	var Ajax = require('../../components/ajax');
	var CryptoJS = require('../../components/sha1');
	var Loading = require('../../components/loading/loading');

	var app = {
    	init: function() {
    		if(Utils.isLogin()) {
                window.location.href = './profile.html';
                return false;
            }
    		
    		this.initEvent();
    	},

    	/**
         * 初始化事件
         */
        initEvent: function () {
        	var me = this;
			var $pwdInput = $('#password'),
				$owl = $("#owl");

			$pwdInput.on('focus', function() {
				$owl.addClass('password');
			});
			$pwdInput.on('blur', function() {
				$owl.removeClass('password');
			});

			$('.login-form').on('submit', function() {
				me.doSubmit();
				return false;
			});
		},

		/**
         * 提交数据
         */
        doSubmit: function () {
            var me = this;
            var account = $('#email').val(),
            	password = $('#password').val();

            Loading.show();
           
            Ajax.post(Apimap.loginApi, {
					'account': account,
					'pwd': CryptoJS.SHA1(password).toString()
				},
				function(d){
					Loading.hide();

				    window.location.href = './profile.html'
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