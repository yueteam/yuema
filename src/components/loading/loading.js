module.exports = {

    hide : function(){
        $('.preloader-indicator-overlay, .preloader-indicator-modal, .preloader-label').remove();
    },

    show: function(options){
        var msg = '数据加载中...';

        //标签加载器
        if(typeof options === 'object'){
            msg = options.msg || msg;
            var $renderTo = $(options.renderTo),
                $loaderLabel = $('<div class="preloader-label"></div>'),
                $loaderIcon = $('<span class="preloader"></span>'),
                $loaderText = $('<span class="msg">'+msg+'</span>');

            $loaderIcon.appendTo($loaderLabel);
            $loaderText.appendTo($loaderLabel);

            //防止加载多个
            if($renderTo.find('.preloader-label').length === 0){
                $loaderLabel.appendTo($renderTo);
            }

            var w = parseInt($loaderText.width());
            //25是loading图标20px,marginLeft:5px, 1是bugfix
            $loaderLabel.css('width', (w + 25 + 1) + 'px');

        }
        //全局加载器
        else{
            msg = options || msg;
            var $loaderOverlay = $('<div class="preloader-indicator-overlay"></div>'),
                $loaderModal = $('<div class="preloader-indicator-modal"></div>'),
                $loaderIcon = $('<span class="preloader preloader-white"></span>'),
                $loaderText = $('<span class="msg">'+msg+'</span>');

            $loaderIcon.appendTo($loaderModal);
            $loaderText.appendTo($loaderModal);

            $loaderOverlay.appendTo($('body'));
            $loaderModal.appendTo($('body'));

            var w = parseInt($loaderModal.width())/2;
            var h = parseInt($loaderModal.height())/2;

            //25是loading图标的一半是17，padding的8
            $loaderIcon.css('marginLeft', (w-25) + 'px');

            $loaderModal.css({
                'marginLeft': '-' + w + 'px',
                'marginTop': '-' + h + 'px'
            });
        }
    }

};
