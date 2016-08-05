var Utils = require('../../common/utils');
module.exports = {
    init: function() {
        var me = this;
        
        var header = new Headroom(document.querySelector("header"), {
            tolerance: 5,
            offset : 205,
            classes: {
              initial: "animated",
              pinned: "slideDown",
              unpinned: "slideUp"
            }
        });
        header.init();

        var jPanelMenu = {};
        jPanelMenu = $.jPanelMenu({
            menu: '.menu',
            panel: '.page-content',
            beforeOpen: function(){
                $('#header').appendTo('.jPanelMenu-panel');
            },
            afterClose: function(){
                $('#header').appendTo('body');
            }
        });
        jPanelMenu.on();

        if(Utils.isLogin()) {
            var nick = Utils.getCookie('nick_name');
            $('.menu-profile .profile-lnk').attr('href', './profile.html');
            $('.menu-profile .login-info').text(nick);
        }
    }
  
};
