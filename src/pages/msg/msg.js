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

	var pageNo = 1;
	var pageEnd = false;

	var app = {
    	init: function() {
    		var me = this;          

            Nav.init();

            Loading.show();
    		me.getData(function() {
    			me.initEvent();
    		});
    		
    	},

    	/**
         * 初始化事件
         */
        initEvent: function () {
        	var me = this;

            Notice.initialize();

        	//滚动监控
            Mscroll.init({
                'scrollToBottom': function(){
                    if(pageEnd) {
                        Mscroll.stop();
                        return;
                    }

                    pageNo > 1 && $('#loadmore').html('');
                    Loading.show({
                        renderTo: '#loadmore'
                    });

                    me.getData(function(){
                        Mscroll.after();
                    });
                }
            });

		},

		/**
         * 获取列表数据
         */
        getData: function (cb) {
            var me = this;
           
            var apiData = {
                'page': pageNo
            };

            Ajax.get(Apimap.chatListApi, apiData,
				function(d){
					Loading.hide();

				    if(d.result && d.result.chatList) {
				    	var listData  = d.result.chatList;

				    	if(listData.length === 0) {
				    		pageEnd = true;
				    		if(pageNo === 1) {
				    			Nodata.show('暂时没什么约会，过会来看看吧~');
				    		} else {
				    			$('#loadmore').html('没有更多约会了~');
				    		}
				    	} else {
				    		me.renderData(listData);
				    		$('#loadmore').html('上拉加载更多');
				    		pageNo++;
				    	}
				    	cb && cb();
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