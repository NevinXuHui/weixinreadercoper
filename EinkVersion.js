function Get_token_Res() {
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

function BaiDu_ocr(tokenres, img, is位置,imgType) {
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
};

function 向前翻页() {
    gesture(10, [device.width  / 4, device.height / 2], [device.width / 2, device.height / 2]);
    sleep(500);

}

function 向后翻页() {
    gesture(10, [device.width*3 / 4, device.height / 2], [device.width / 2, device.height / 2]);
    sleep(500);
}


function 获取目录(dirName,flag){
    var currentDirContent = dirName + "目录.txt";
    //创建目录文件
    files.createWithDirs(currentDirContent);
    var 目录文件 = open(currentDirContent, "w");
    //显示底下框
    while(!className("android.widget.TextView").text("目录").exists()){
        log("当前包名111："+currentPackage())
        log("当前活动1111："+currentActivity())
        if("com.tencent.weread.ReaderFragmentActivity"==currentActivity()){
            click(device.width/2, device.height/2)
            sleep(200)
        }
    }
    //显示目录页面
    while(!className("androidx.recyclerview.widget.RecyclerView").depth(17).exists()){
        className("android.widget.TextView").text("目录").depth(16).findOnce().parent().click()
        sleep(200)
    }
    log("进入微信读书目录页面")
    let allDataList = [];
    let lastPageDataList = [];

    if(flag == 1){
        if(className("android.widget.TextView").depth(17).text("去顶部").exists()){
            className("android.widget.TextView").depth(17).text("去顶部").findOnce().parent().click()
            sleep(500)
        }
        log("回到顶部")
    }
    var 到底部标志 = 0
    while(到底部标志<2){
        let pageDataList = [];
        className("androidx.recyclerview.widget.RecyclerView").findOnce().children().forEach(function(child1){
            let dataList = [];
            child1.children().forEach(function(child2,index){
                dataList[index]=child2.text()
            })
            let 目录重复标志 = 0
            lastPageDataList.forEach(function(item, index){
                if(lastPageDataList[index][1] == dataList[1]){
                    目录重复标志 = 1
                }
            })
            if(目录重复标志 == 0){
                pageDataList.push(dataList)

            }
            log("dataList:")
            log(dataList)
            
        })
        lastPageDataList = pageDataList
        pageDataList.forEach(function(item) {
            目录文件.writeline(item);
        });
        className("android.view.ViewGroup").id("fm").depth(15).findOnce().click()
        sleep(100)
        if(className("android.widget.TextView").depth(17).text("去顶部").exists()){
            到底部标志++
        }
    }
    //log("pageDataList:"+pageDataList)
    
    目录文件.close();
    log("目录获取完成")
    
    click(className("android.widget.TextView").text("目录").depth(16).findOnce().bounds().left,className("android.widget.TextView").text("目录").depth(16).findOnce().bounds().top)
    click(device.width/2, device.height/2)
    sleep(200)

}

function 删除全部其他脚本(){
    var 所有脚本=engines.all()
    var 当前脚本 = engines.myEngine();
    for(let i = 0;i<所有脚本.length;i++){
        var 删除脚本=所有脚本.pop()
        log("删除脚本:"+删除脚本)
        if (删除脚本 != 当前脚本){
            删除脚本.forceStop()
        }
        
    }
}


function 打开微信读书(){
    log("微信读书打开成功状态："+app.launch("com.tencent.weread.eink"))
    while("com.tencent.weread.eink"!=currentPackage()){
        sleep(200)
    }
    log("当前包名："+currentPackage())
    log("当前活动："+currentActivity())
}

function 进入书架界面(){
    while(!className("android.widget.TextView").text("书架").exists()){
        log("不在微信读书主界面")
        log("当前包名："+currentPackage())
        log("当前活动："+currentActivity())
        if("com.tencent.weread.ReaderFragmentActivity"==currentActivity()){
            log("device.width:"+device.width/2)
            log("device.height:"+device.height/10)
            // click(device.width/2, device.height/2)
            swipe(device.width/2, device.height/2,device.width/2,device.height/10,10)
            sleep(200)
        }
        if(className("android.widget.TextView").text("返回").exists()){
            className("android.widget.TextView").text("返回").findOnce().parent().click()
            log("返回")
        }
        sleep(200)
    }
    className("android.widget.TextView").text("书架").findOnce().parent().parent().click()
    log("进入微信读书书架页面")
    sleep(500)
}

function 打开书籍(){
    var 当前书籍名 = className("android.widget.TextView").depth(17).id("d8").findOnce().text().replace(/\[icon\]/ig,"");
    className("android.widget.RelativeLayout").depth(17).findOnce().parent().click()
    
    log("当前书籍名："+当前书籍名)
    return 当前书籍名
}

function 跳转到首页(){
    while(!className("android.widget.TextView").text("进度").exists()){
        log("当前包名："+currentPackage())
        log("当前活动："+currentActivity())
        if("com.tencent.weread.ReaderFragmentActivity"==currentActivity()){
            click(device.width/2, device.height/2)
            sleep(200)
        }
    }
    
    while(!className("android.widget.ImageButton").depth(15).id("vk").exists()){
        className("android.widget.TextView").text("进度").depth(16).findOnce().parent().click()
        sleep(200)
    }
    log("进入微信读书书本进度条页面")
    swipe((className("android.widget.FrameLayout").depth(16).findOnce().bounds().left+className("android.widget.FrameLayout").depth(16).findOnce().bounds().right)/2, (className("android.widget.FrameLayout").depth(15).findOnce().bounds().top+className("android.widget.FrameLayout").depth(15).findOnce().bounds().bottom)/2, 
    className("android.widget.FrameLayout").depth(15).id("vi").findOnce().bounds().left, className("android.widget.FrameLayout").depth(15).id("vi").findOnce().bounds().top, 100)
    sleep(200)
    click(device.width/2, device.height/2)
    sleep(200)
    log("进入书籍首页")
}

function 获取当前书籍存储路径(当前书籍名){
    var currentDate = new Date()
    var realMonth = currentDate.getMonth()+1
    var dirName = "/storage/emulated/0/电子书/"+currentDate.getFullYear()+"-"+realMonth+"-"+currentDate.getDate()+"/"+当前书籍名+"/"  
    files.ensureDir(dirName)
    log("获取当前书籍存储路径并创建文件夹成功:"+dirName)
    return dirName
}

function 打开截图权限(){
    requestScreenCapture()
    sleep(200)
    log("打开截图权限成功")
}

function 保存一页图片(dirName,imgType,currentPage,img){
    if(currentPage<10){
        var page ="0000"+currentPage
    }else if(currentPage<100){
        var page ="000"+currentPage
    }else if(currentPage<1000){
        var page ="00"+currentPage
    }else if(currentPage<10000){
        var page ="0"+currentPage
    }
    var currentFilePath = dirName + page+"." + imgType
    images.save(img, currentFilePath, imgType,40)
    log("正在截图中，保存页："+currentPage)
}

function 截整本书(tokenRes,dirName){
    log("开始截图")
    var imgType = "jpg"
    var currentPage = 1
    var ocrcurrentPage = 0
    var ocrendPage = -1
    while(ocrcurrentPage != ocrendPage){
        if(!className("android.view.ViewGroup").depth(15).desc("字体").id("uz").exists()){
            if(!className("android.widget.TextView").depth(14).text("前路虽长，尤可期许").exists()){

                var img = captureScreen()
                sleep(20)
                var clip = images.clip(img, device.width - 300, device.height - 120, 300, 120);
                sleep(20);
                // var currentFilePath = dirName + currentPage+"-1." + imgType
                // images.save(clip, currentFilePath, imgType,100)
                var result = BaiDu_ocr(tokenRes, clip, false,imgType);
                clip.recycle()
                log("result")
                log(result)
                sleep(20);
        
                //第一页
                if(currentPage == 1){
                    press(device.width-60,device.height-60,10)
                    sleep(500)
                    保存一页图片(dirName,imgType,currentPage,img)
                    currentPage++
                }
                if(result.words_result_num>0)
                {
                    var integralContent = result.words_result[0].words.split('/');
                    ocrcurrentPage = integralContent[0];
                    ocrendPage = integralContent[1]
                    log("ocrcurrentPage:"+ocrcurrentPage)
                    log("currentPage:"+currentPage)
                    //最后一页
                    if(integralContent[0] == integralContent[1] ){
                        if(currentPage == integralContent[0]){
                            获取目录(dirName,1)
                        }
                    }

                    if(ocrcurrentPage==currentPage){
                        press(device.width-60,device.height-60,10)
                        sleep(100)
                        保存一页图片(dirName,imgType,currentPage,img)
                        currentPage++
                    }
                    else if(ocrcurrentPage>currentPage){
                        向前翻页()
                        log("当前页面太大")
                        
                    }
                    else if(ocrcurrentPage<currentPage){
                        向后翻页()
                        log("当前页面太小")
                    }
                    
                }      
                
            }
        }
        else{
            log("暂停截图中。。。")
            sleep(500)
        }

        if("com.tencent.weread.ReaderFragmentActivity"!=currentActivity()){
            log("currentActivity:"+currentActivity())
            if("com.stardust.autojs.core.image.capture.ScreenCaptureRequestActivity"!=currentActivity()){           
                toastLog("截图脚本强制退出")
                exit(); // 有异常退出，结束脚本
            }
            
        }
    }


}

device.keepScreenOn()
删除全部其他脚本()

打开微信读书()

进入书架界面()

var 当前书籍名 = 打开书籍()

跳转到首页()

var dirName = 获取当前书籍存储路径(当前书籍名)

打开截图权限()

var tokenRes= Get_token_Res()

截整本书(tokenRes,dirName)

    // var img1 = images.copy(img)
    // sleep(100)
    // img = captureScreen()
    // var img2 = images.copy(img)
    // sleep(100)
    // var p =  findImage(img1, img2,{
    //      threshold: 1})

    // log("p="+p)

    // while(!p){
    //     img1 =images.copy(img)
    //     img = captureScreen()
    //     img2 = images.copy(img)
    //     sleep(100)
    //     p =  findImage(img1, img2,{
    //         threshold: 1})
    //     log("截图未准备好")
    // }
toastLog("截图完成退出")
device.cancelKeepingAwake()





