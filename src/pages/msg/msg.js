$(function() {
	var Utils = require('../../common/utils');
	var Apimap = require('../../common/apimap');
	var Tips = require('../../components/tips');
	var Ajax = require('../../components/ajax');
	var Nodata = require('../../components/nodata');
	var Loading = require('../../components/loading/loading');
    var Nav = require('../../mods/nav/nav');
	var Mscroll = require('../../components/mscroll');
    var Notice = require('../../mods/notice/notice');

	var app = {
    	init: function() {
    		var me = this;          

            Nav.init();

            Loading.show();
    		me.getData();
            me.initEvent();
    		
    	},

    	/**
         * 初始化事件
         */
        initEvent: function () {
        	var me = this;

            Notice.initialize();
		},

		/**
         * 获取列表数据
         */
        getData: function () {
            var me = this;
           
            var apiData = {
                
            };

            Ajax.get(Apimap.chatListApi, apiData,
				function(d){
					Loading.hide();

				    if(d.result && d.result.chatList) {
				    	var listData  = d.result.chatList;

				    	if(listData.length === 0) {
				    		Nodata.show('暂时还没什么消息~');
				    	} else {
				    		me.renderData(listData);
				    	}
				    } else {
				    	Tips.show({
		                    type: 'error',
		                    title: '返回的数据格式有问题'
		                });
				    }
				},
				function(d){
					Loading.hide();

	                Nodata.show(d.resultMsg);
				}
			);

        },

        /**
         * 渲染列表数据
         */
        renderData: function (listArr) {
        	
        	$.each(listArr, function(index, item){
        		var sendTime = item.sendTime || '';

        		listArr[index].sendTime = sendTime.substr(5,11);
        	});
        	var html = Utils.template($('#listTmpl').html(), 
	        	{
					list: listArr
				});

			$('.list').append(html);
        }
    };

    app.init();

});