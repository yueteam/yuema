$(function() {
	var Utils = require("../../common/utils");
	var Apimap = require('../../common/apimap');
	var Tips = require('../../components/tips');
	var Ajax = require('../../components/ajax');
	var Nodata = require('../../components/nodata');
	var Loading = require('../../components/loading/loading');
	var Flipsnap = require("../../components/flipsnap");
	var Yue = require("../../mods/yue/yue");
    var width = $(window).width();
	var app = {
    	init: function() {
    		var me = this;

    		var scrollerW = width * $('.scroller .item').length;
            $('.basic-info').height(width);
            $('.scroller .item').width(width);
    		$('.scroller').width(scrollerW);
            me.initEvent();   		
    	},

    	/**
         * 初始化事件
         */
        initEvent: function () {
        	var me = this;

        	Yue.init();

        	var $pointer = $('.icons i');
			var flipsnap = Flipsnap('.scroller', {
			    distance: width
			});

			flipsnap.element.addEventListener('fspointmove', function() {
				$pointer.filter('.current').removeClass('current');
			    $pointer.eq(flipsnap.currentPoint).addClass('current');
			}, false);
		},

		/**
         * 获取列表数据
         */
        getData: function (cb) {
            var me = this;
           
            Ajax.get(Apimap.listApi, {
					'page': pageNo
				},
				function(d){
					Loading.hide();

				    if(d.result && d.result.datingList) {
				    	var listData  = d.result.datingList;

				    	if(listData.length === 0) {
				    		pageEnd = true;
				    		if(pageNo === 1) {
				    			Nodata.show('现在暂时没什么约会，过会来看看吧~');
				    		} else {
				    			$('#loadmore').html('没有更多约会了~');
				    		}
				    	} else {
				    		me.renderData(listData);
				    		$('#loadmore').html('上拉加载更多');
				    		pageNo++;
				    	}
				    	cb & cb();
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
        	var iconMap = {
        		'2': 'icon-coffee',
        		'3': 'icon-food',
        		'4': 'icon-film',
        		'5': 'icon-run',
        		'6': 'icon-photo',
        		'7': 'icon-badminton',
        		'8': 'icon-riding',
        		'9': 'icon-drive',
        		'1': 'icon-lquote'
        	};
        	var typeName = {
        		'2': '喝咖啡/茶',
        		'3': '美食',
        		'4': '看电影',
        		'5': '跑步',
        		'6': '摄影',
        		'7': '羽毛球',
        		'8': '骑行',
        		'9': '自驾',
        		'1': '其他'       		
        	};
        	$.each(listArr, function(index, item){
        		var sex = item.postUserInfo.sex,
        			birthday = item.postUserInfo.birthday,
        			postTime = item.postTime,
        			typeId = item.typeId;

        		listArr[index].age = new Date().getFullYear() - parseInt(birthday.substr(0,4));
        		listArr[index].sex = sex === 'M' ? '男' : '女';
        		listArr[index].time = postTime.substr(0,10);
        		listArr[index].iconCls = iconMap[typeId];
        		listArr[index].typeName = typeName[typeId];
        	});
        	var html = Utils.template($('#listTmpl').html(), 
	        	{
					list: listArr
				});

			$('.list').html(html);
        }
    };

    app.init();
});