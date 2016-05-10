var Message = {};

Message.socket = null;

Message.connect = (function(host) {
    if ('WebSocket' in window) {
        Message.socket = new WebSocket(host);
    } else if ('MozWebSocket' in window) {
        Message.socket = new MozWebSocket(host);
    } else {
        console.log('Error: WebSocket is not supported by this browser.');
        return;
    }

    Message.socket.onopen = function () {
        console.log('Info: WebSocket connection opened.');
    };

    Message.socket.onclose = function () {
        console.log('Info: WebSocket closed.');
    };

    Message.socket.onmessage = function (message) {
        Message.render(message.data);
    };
});

Message.initialize = function() {
    if (window.location.protocol == 'http:') {
        Message.connect('ws://' + window.location.host + '/websocket/message');
    } else {
        Message.connect('wss://' + window.location.host + '/websocket/message');
    }
};

Message.sendMessage = (function() {
    var message = document.getElementById('chat').value;
    if (message != '') {
        Message.socket.send(message);
        document.getElementById('chat').value = '';
    }
});

Message.render = (function(message) {
    if(!$('.notice-bar')[0]) {
        var $notice = $('<div class="notice-bar"></div>');

        $('body').append($notice);
    }
    $('.notice-bar').html(message).addClass('notice-in');

    setTimeout(function() {
        $('.notice-bar').removeClass('notice-in');

    }, 3000);
});

module.exports = Message;
