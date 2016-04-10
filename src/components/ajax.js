
    var goRedirectUrl = function(data) {
        if (data.isRedirect == true) {
            setTimeout(function() {
                window.location.href = data.redirectURL;
            }, 2000);
        }
    };

    module.exports = {
        post: function(api, param, succ_call, fail_call) {
            $.ajax({
                url: api,
                data: param,
                type: 'post',
                dataType: 'json',
                success: function(data) {
                    //重定向
                    goRedirectUrl(data);
                    if (data.resultCode === 'SUCCESS')
                        succ_call(data);
                    else
                        fail_call(data);
                },
                error: function(data) {
                    var status = data.status || 500;
                    var msg = "对不起，服务器正在维护，请稍后再试...";
                    switch(data.status){
                        case 404: msg = "对不起，你访问的接口不存在...";break;
                        case 403: msg = "对不起，你没有权限访问该接口...";break;
                        case 500: msg = "对不起，正在进行服务器维护，请稍后再来...";break;
                        case 502: msg = "对不起，你访问的接口程序出错...";break;
                        case 503: msg = "对不起，你访问的接口后端异常...";break;
                        default : msg = "对不起，服务器正在维护，请稍后再试...";break;
                    }
                    var data = {
                        "isRedirect": false,
                        "result": {},
                        "resultCode": "SERVER ERROR",
                        "resultMsg": msg
                    };
                    fail_call(data);
                }
            });
        },
        get: function(api, param, succ_call, fail_call) {
            var self = this;
            $.ajax({
                url: api,
                data: param,
                type: 'get',
                dataType: 'json',
                success: function(data) {
                    //重定向
                    goRedirectUrl(data);
                    if (data.resultCode === 'SUCCESS')
                        succ_call(data);
                    else
                        fail_call(data);
                },
                error: function(data) {
                    var status = data.status || 500;
                    var msg = "对不起，服务器正在维护，请稍后再试...";
                    switch(data.status){
                        case 404: msg = "对不起，你访问的接口不存在...";break;
                        case 403: msg = "对不起，你没有权限访问该接口...";break;
                        case 500: msg = "对不起，正在进行服务器维护，请稍后再来...";break;
                        case 502: msg = "对不起，你访问的接口程序出错...";break;
                        case 503: msg = "对不起，你访问的接口后端异常...";break;
                        default : msg = "对不起，服务器正在维护，请稍后再试...";break;
                    }
                    var data = {
                        "isRedirect": false,
                        "result": {},
                        "resultCode": "ERROR",
                        "resultMsg": msg
                    };
                    fail_call(data);
                }
            });
        }
    };
