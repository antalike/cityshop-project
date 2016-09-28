function doAjax(param, callback, beforeSend) {
    $.ajax({
        type: 'GET',
        url: 'http://192.168.2.80:8801/AxServices/AXServices.svc/axserviceMethod',
        dataType: "json",
        data: param,
        cache: false,
        beforeSend: function () {
            if (beforeSend) {
                beforeSend();
            }
        },
        success: function (data) {
            if (data.length != 0) {
                data = JSON.parse(data);
            }
            callback(data);
        }
    })
}