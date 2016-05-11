// 无数据显示
module.exports = {
    _getNodata : function () {

        if (!$('.g-nodata').length) {
            var $nodata  = '<div class="g-nodata">';
                $nodata += '<i class="iconfont icon-warn"></i><div></div>';
                $nodata += '</div>';

            $('body').append($nodata);
        }

        return $('.g-nodata');

    },

    show : function (msg) {
        var $el = this._getNodata();

        $('.g-nodata div').text(msg || '还没有任何数据记录');

        $el.show();

    },

    hide : function () {
        var $el = this._getNodata();
        $el.hide();

    }
};

