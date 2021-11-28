var baiduOCR = {};

baiduOCR.Get_token_Res = function (){
    var API_Key = "4PtlSmrqerRG45vGF2DYaQ5L";
    var Secret_Key = "YMhDItMR3G5ul1zw0DEZn70NHah1ds8Z";

    var getTokenUrl = "https://aip.baidubce.com/oauth/2.0/token";
    //token获取地址。
    var token_Res = http.post(getTokenUrl, {
        grant_type: "client_credentials",
        client_id: API_Key,
        client_secret: Secret_Key,
    });
    log("获取ocr token成功")
    return token_Res;
}

baiduOCR.BaiDu_ocr=function(tokenres, img, is位置,imgType) {
    var imag64 = images.toBase64(img, imgType, 100);
    var token = tokenres.body.json().access_token;
    // log("token:"+token);
    var ocrUrl1 = "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic"; //每天可用5000次。
    //  文字识别。
    var ocrUrl2 = "https://aip.baidubce.com/rest/2.0/ocr/v1/general"; //每天可用500次。
    //   含位置信息。

    // var ocrUrl1 = "https://aip.baidubce.com/rest/2.0/ocr/v1/accurate";
    // var ocrUrl2 = "https://aip.baidubce.com/rest/2.0/ocr/v1/accurate";

    var ocrUrl3 = "https://aip.baidubce.com/rest/2.0/ocr/v1/numbers";
    //数字识别

    var ocrUrl = ocrUrl1;
    if (is位置) {
        ocrUrl = ocrUrl2;
    };
    var ocr_Res = http.post(ocrUrl, {
        headers: {
            "Content - Type": "application/x-www-form-urlencoded"
        },
        access_token: token,
        image: imag64,
        paragraph: true,
    });

    var json = ocr_Res.body.json();
    //   log("OCR数据结果："+json);
    return json;
}

module.exports = baiduOCR;