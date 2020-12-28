"ui";
var form = {
    is目录: true,
    is内容: true,
    is从头开始截图: true,
    value书籍总页数: 9999,
    value书籍数量: 1,
    value第几本: 1,

}
ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="微信读书资源下载助手"/>
                <tabs id="tabs"/>
            </appbar>
            <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="15sp"/>
            <viewpager id="viewpager">
                <frame>
                    <ScrollView>
                        <vertical>
                            <card w="*" h="*" margin="10 5" cardCornerRadius="2dp"
                            cardElevation="1dp" gravity="center_vertical">
                            <ScrollView>
                                <vertical padding="18 8" h="auto">
                                    <text text="当前版本为初始功能，包含目录下载，内容截图等功能" textColor="#222222" textSize="14sp"/>
                                    <text text="其他功能请期待，谢谢！" textColor="#999999" textSize="14sp"/>
                                </vertical>
                            </ScrollView>
                            <View bg="#4caf50" h="*" w="10"/>
                        </card>
                        {/* <card w="*" h="*" margin="10 5" cardCornerRadius="2dp"
                        cardElevation="1dp" gravity="center_vertical">
                        <ScrollView>
                            <vertical padding="18 8" h="auto">
                                <text text="目录下载" textColor="#222222"/>
                                <radiogroup columns="2">
                                    <radio id="yes_subscribe"  text="是" marginTop="5">
                                    </radio>
                                    <radio  id="no_subscribe" text="否" checked = "true" >
                                    </radio>
                                </radiogroup>
                            </vertical>
                        </ScrollView>
                        <View bg="#2196f3" h="*" w="10"/>
                    </card>
                    <card w="*" h="*" margin="10 5" cardCornerRadius="2dp"
                    cardElevation="1dp" gravity="center_vertical">
                    <ScrollView>
                        <vertical padding="18 8" h="auto">
                            <text text="内容下载：" textColor="#222222"/>
                            <checkbox id="yes_read" text="文章学习时长任务(预计花费12分钟)" />
                            <checkbox id="yes_watch" text="视听学习时长任务(建议在wifi环境下执行，预计花费18分钟)" marginTop="5"/>
                        </vertical>
                    </ScrollView>
                    <View bg="#2196f3" h="*" w="10"/>
                </card> */}
                <card w="*" h="*" margin="10 5" cardCornerRadius="2dp"
                cardElevation="1dp" gravity="center_vertical">
                    <ScrollView>
                    <vertical padding="18 8" h="auto">
                        <text id="当前时间" text="当前时间是：" gravity="center" textColor="#222222"/>
                    </vertical>
                    </ScrollView>
                </card>
                <card w="*" h="*" margin="10 5" cardCornerRadius="2dp"
                cardElevation="1dp" gravity="center_vertical">
                <ScrollView>
                    <vertical padding="18 8" h="auto">
                        <text text="下载功能选择：" textColor="#222222"/>
                        <checkbox id="目录按钮" text="目录" checked = "true"/>
                        <checkbox id="内容按钮" text="内容" checked = "true" marginTop="5"/>
                        
                        <text textSize="16sp" textColor="black" text="需要下载的书籍页数"/>
                        <input id="书籍下载总页数" text="99999" inputType="number"/>
                        <text textSize="16sp" textColor="black" text="选择第几本开始进行下载"/>
                        <input id="第几本开始" text="1" inputType="number"/>
                        <text textSize="16sp" textColor="black" text="需要下载的书籍数量"/>
                        <input id="书籍下载数量" text="1" inputType="number"/>
                        <text textSize="16sp" textColor="black" text="每本是否进行从头开始截图"/>
                        <radiogroup columns="2">
                            <radio id="yes_subscribe"  text="是" checked = "true" marginTop="5">
                            </radio>
                            <radio  id="no_subscribe" text="否"  >
                            </radio>
                        </radiogroup>
                        <text id="数据保存路径" textSize="16sp" textColor="black" text="当前书籍保存路径:"/>
                        
                    </vertical>
                </ScrollView>
                <View bg="#2196f3" h="*" w="10"/>
            </card>
            <linear gravity="center">
                <button id="start" text="开始运行" style="Widget.AppCompat.Button.Colored" w="auto"/>
                <button id="stop" text="停止运行"  w="auto"/>
            </linear>
        </vertical>
    </ScrollView>
    
    </frame>
    <frame>
        <ScrollView>
            <vertical>
                
            </vertical>
        </ScrollView>
    </frame>
    </viewpager>
    </vertical>
    </drawer>
);

//设置滑动页面的标题
ui.viewpager.setTitles(["任务列表", "其他"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);

ui.目录按钮.on("check", function(check) {
    if (check)
        form.is目录 = true;
    else
        form.is目录 = false;
});
ui.内容按钮.on("check", function(check) {
    if (check)
        form.is内容 = true;
    else
        form.is内容 = false;
});
ui.yes_subscribe.on("check", function(check) {
    if (check)
        form.is从头开始截图 = true;
    else
        form.is从头开始截图 = false;
});
ui.no_subscribe.on("check", function(check) {
    if (check)
        form.is从头开始截图 = false;
    else
        form.is从头开始截图 = true;
});


ui.autoService.on("check", function(checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});

// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function() {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;

});

ui.start.on("click", function() {
    //程序开始运行之前判断无障碍服务
    if (auto.service == null) {
        toastLog("请先开启无障碍服务！");
        return;
    }
    form.value书籍总页数 = ui.书籍下载总页数.getText();
    form.value书籍数量 = ui.书籍下载数量.getText();
    form.value第几本 = ui.第几本开始.getText();
    main();
});

ui.stop.on("click", function() {
    threads.shutDownAll();
    engines.stopAll();
    exit();
    toast("已终止执行脚本");
});

threads.start(function() {
    ui.数据保存路径.setText("当前数据保存路径"+dirName);
    while(1){
        var currentDate = new Date();
        ui.当前时间.setText("当前时间为:"+currentDate);
       // toastLog(currentDate.getFullYear()+"-"+currentDate.getMonth()+"-"+currentDate.getDate());
        sleep(60000);
    }
});

var currentDate = new Date();
var dirName = "/storage/emulated/0/电子书/"+currentDate.getFullYear()+"-"+currentDate.getMonth()+"-"+currentDate.getDate()+"/";
var imgType = "jpg";
var currentPage = 0; //当前需要保存的页数
var lastPage = 0; //上次保存的页数
var totalPage = 0;
var errorPageNum = 0;
var retryFlagNum = 0;
var restoreFlag = 0;
var appPackageName = "com.tencent.weread";
var launchAppName = "微信读书";


//监听音量上键按下
events.onKeyDown("volume_up", function(event) {
    toast("音量上键被按下了,退出");
    sleep(1000);
    exit();

});

function 停止其余脚本() {
    let mm = 0;
    var 脚本数组 = engines.all();
    var 元素数量 = 脚本数组.length;
    var 当前脚本 = engines.myEngine();
    for (let i = 0; i < 元素数量; i++) {
        var 删除数组 = 脚本数组.pop();
        if (删除数组 != 当前脚本) {
            mm++;
            删除数组.forceStop();
        } else {}
    }

}

function main() {
    threads.start(function() {
        if (!requestScreenCapture()) {
            log("请先开启截图权限，以执行收截图功能！");
            return;
        }

        log("form.is目录:" + form.is目录);
        log("form.is内容:" + form.is内容);
        log("form.is从头开始截图:" + form.is从头开始截图);
        log("form.value书籍总页数:" + form.value书籍总页数);
        log("form.value书籍数量:" + form.value书籍数量);
        log("form.value第几本:" + form.value第几本);

        // while(1);

        width = device.width;
        height = device.height;
        log('width: ' + width + 'height: ' + height);
        var num = 0;

        停止其余脚本();
        toastLog('已停止其余脚本');

        while (!shell("am force-stop com.tencent.weread", true)) {
            toastLog("已关闭微信");
            sleep(1000);
        };

        //等待无障碍服务开启
        auto.waitFor();

        //启用按键监听
        //events.observeKey();

        device.wakeUp();


        while (!launchApp(launchAppName)) {
            num = num + 1;
            if ((num % 30) == 0) {
           //     toastLog("打开微信");
            }
            sleep(100);
        }

        // log("currentPackage:"+currentPackage());
        // sleep(300);
        // log("currentActivity:"+currentActivity());
        // sleep(300);
        while (appPackageName != currentPackage()) {
            num = num + 1;
            if ((num % 30) == 0) {
                toastLog("等待打开微信");
            }
            sleep(100);
        }
        num = 0;
        while (!id("rw").exists()) {
            num++;
            if ((num % 10) == 0) {
                back();
            }
            sleep(100);

        }
        // while(1){
        var isclick = id("rw").findOnce(0).click();
        log(isclick);
        sleep(500);
        // }
        // var target = className("android.widget.TextView").text("书架").depth(2).findOne();
        // while(1){
        //     var isclick = target.parent().click();
        //     sleep(1000);
        //     log(isclick);
        //     log("按一下");
        // }
        
        // log("0");
        // while(1);
        var target = className("android.widget.TextView").id("ho").findOnce();
   //     log("1");
        dirName = dirName + target.text();
   //     log(dirName);
//while(1);
     //   toastLog(dirName);
        target.parent().click();

        // while (1);

        if (form.is从头开始截图) {
            var firstPageFlag = 1;
            ReturnFirstPage();
        } else {
            向右翻页();
            restoreFlag = 1;
        }
            //创建目录
   // log(dirName);
    if (files.createWithDirs(dirName + "/")) {
        log("创建目录成功");
    } else {
        log("文件夹已存在");
    }
       // sleep(1000);
        // while(1){
        //     向左翻页();
        //     sleep(500);
        // }
        // 向左翻页();

        // StoreTable(dirName);
        // while(1);


        //requestScreenCapture(false);
        // sleep(500);
        //获取百度ocr的token码
        var tokenRes = Get_token_Res();

        do {
            try {
                //ocr获取页码及翻页    
                do {
                    log("开始截图ocr");
                    var img = captureScreen();
                    sleep(20);
                    下一页(); //翻页
                    log("已截图，向下翻一页")
                    // VolumeDown();
                    // if(firstPageFlag == 1){
                    //     sleep(50);
                    //     VolumeDown();

                    // }
                    //while(1);

                    //var clip = images.clip(img, width*4/5, height*59/60, width/5, height/60);
                    var clip = images.clip(img, width - 350, height - 95, 350, 75);
                    sleep(10);

                    //lastPage = 5
                    log("上一页的页码："+ lastPage.toString());
                    //log("当前页显示的页码："+ tempcurrentPage.toString());
                  //  var currentFilePath = dirName + "/" + "OCR"+lastPage.toString()+"." + imgType;
                  //  images.save(clip, currentFilePath, imgType);

                    var result = BaiDu_ocr(tokenRes, clip, false);
                    //显示当前ocr获取信息
                    log(result);
                    sleep(10);

                    if (result.words_result_num == 0) {
                        //第一页扉页 无页面  特殊处理
                        if (firstPageFlag == 1) {
                            log("保存扉页");
                            firstPageFlag = 0;
                            var currentFilePath = dirName + "/" + "1." + imgType;
                            images.save(img, currentFilePath, imgType);
                            lastPage = 1;
                            var currentFilePath = dirName + "/" + "OCR失败0"+"." + imgType;
                            // VolumeDown();
                            // sleep(1000);

                        }else{
                            var currentFilePath = dirName + "/" + "OCR失败"+lastPage.toString()+"." + imgType;
                            //退回上一页重新截图OCR
                            log("截图失败，返回上一页重新截图");
                            向右翻页();
                            //VolumeUp();
                            sleep(1500);
                        }
                        images.save(clip, currentFilePath, imgType);
                        log("OCR失败一次");
                    }
                    //ocr并发太快，出现错误
                    while (result.error_code == 18) {
                        var result = BaiDu_ocr(tokenRes, clip, false);
                        log(result);
                        sleep(500);
                    }
                    while (result.error_code == 282000) {
                        var result = BaiDu_ocr(tokenRes, clip, false);
                        log(result);
                        sleep(500);
                    }

                }
                while (result.words_result_num == 0);

                //获取当前页数及总页数
                var integralContent = result.words_result[0].words.split('/');
                currentPage = integralContent[0];
                log(integralContent.length);

                if(integralContent.length >=2)
                {
                totalPage = integralContent[1];
                }else{
                    totalPage = 9999;
                }
                log("当前页数：" + currentPage + "      " + "总页数：" + totalPage);
                var currentFilePath = "";
                var tempValue = currentPage - lastPage;
                log("前一个ocr值与当前值的差值:" + tempValue.toString());

                if (restoreFlag == 1) {
                    tempValue = 1;
                    restoreFlag = 0;
                    retryFlagNum = 0;
                }


                if(tempValue == 1){
                    retryFlagNum = 0;
                    //定义当前图片名称
                    var displaycurrentPage = currentPage;
                    currentFilePath = dirName + "/" + displaycurrentPage.toString() + "." + imgType;
                    //保存当前页数
                    log("页码连续 当前保存页:" + currentPage.toString());
                    lastPage = currentPage;
                }else { //当前文件与上一个文件不连续
                    errorPageNum = errorPageNum + 1;
                    // log("error lastPage:" + lastPage.toString());
                    // log("retryFlagNum:" + retryFlagNum.toString());
                    currentFilePath = dirName + "/" + lastPage.toString() + "错误" + errorPageNum + "." + imgType;
                    //重复操作三次
                    if (retryFlagNum < 2) {
                       // 向右翻页();
                       // VolumeUp();
                        retryFlagNum = retryFlagNum + 1;
                    } else {
                        //跳过无法解析的页
                        restoreFlag = 1;
                    }
                } 
                images.save(img, currentFilePath, imgType);

                //手动跳出微信读书页面
                if (appPackageName != currentPackage()) {
                    toastLog("手动退出微信读书，执行完毕！");
                    exit(); // 结束脚本
                }

                if (currentActivity() != "com.tencent.weread.ReaderFragmentActivity") {
                    toastLog(currentActivity());
                    toastLog("手动跳出微信读书截图页面,执行完毕");
                    exit();
                }
                if(!form.is内容){
                    currentPage =totalPage;
                    }
                //最后一页了
                if (currentPage == totalPage) {
                    //currentPage =0;
                    if(form.is内容){
                    toastLog("书籍截图完成");
                    }
                    向右翻页(); //返回上一页
                    if(form.is目录){
                    StoreTable(dirName);
                    toastLog("目录保存完成");
                    }
                    toastLog("全部完成，退出微信读书！");
                    //sleep(500);
                    //threads.shutDownAll();
                    //while(1);
                    //exit(); // 结束脚本
                }


            } catch (error) {
                toastLog(error);
                
                toastLog("出现异常,请关闭应用重新执行脚本！");
                exit(); // 有异常退出，结束脚本
            }
        }
        while (currentPage != totalPage);
//toastLog("Over");
exit();


    });
    
}




function ReturnFirstPage() {
    var num = 0;
    var ret = className("android.widget.ImageView").id("yn").desc("目录").findOnce();
    while (!ret) {
        ret = className("android.widget.ImageView").id("yn").desc("目录").findOnce();
        num = num + 1;
        if ((num % 10) == 0) {
            toastLog("正在寻找目录按键");
        }
        sleep(100);
    }
   // log("继续1");
    //目录按钮按下
    ret.click();
    ret = className("androidx.recyclerview.widget.RecyclerView").findOnce();
    //toastLog(ret);
    while (!ret) {
        ret = className("androidx.recyclerview.widget.RecyclerView").findOnce();
        num = num + 1;
        if ((num % 10) == 0) {
            toastLog("正在寻找目录内容框架");
        }
        sleep(100);
    }
    while (!className("android.widget.TextView").text("扉页").exists()) {
        ret.scrollBackward();
    }
    className("android.widget.TextView").text("扉页").findOnce().parent().click();
    log("进入扉页");

}


function StoreTable(dir) {
    var currentDirContent = dir + "/目录.txt";
//    toastLog("test5");
    var num = 0;
    files.createWithDirs(currentDirContent);
    var 目录文件 = open(currentDirContent, "w");
    var ret = className("android.widget.ImageView").id("yn").desc("目录").findOnce();
    while (!ret) {
        ret = className("android.widget.ImageView").id("yn").desc("目录").findOnce();
        num++;
        if ((num % 10) == 0) {
            gesture(200, [width / 2, height - 500], [width / 2, 1000]); //上滑
            toastLog("正在寻找目录按键");
        }
        sleep(100);
    }
    ret.click();
//toastLog("test6");

    while (!className("android.widget.TextView").text("扉页").exists()) {
        
        ret = className("androidx.recyclerview.widget.RecyclerView").findOnce();
        ret.scrollBackward();
    }
    log("到达目录最上头");
    var lastPageDataList = [];
    while (1) {
        var ret = className("androidx.recyclerview.widget.RecyclerView").findOnce();
        //toastLog(ret);
        while (!ret) {
            ret = className("androidx.recyclerview.widget.RecyclerView").findOnce();
            toastLog("正在寻找目录内容框架");
            sleep(3000);
        }
        var pageDataList = [];
        var allPageDataList = [];
        log("初始pageDataList长度:" + pageDataList.length);
        var 终极重复标志 = 0;
        //获取一页目录内容
        ret.children().forEach(function(ll) {
            var dataList = [];
            var 目录重复标志 = 0;
            var i = 0;
            //获取单个目录内容
            ll.children().forEach(function(tv) {
                dataList[i] = tv.text();
                i++;
            });
            //当前某一行与上一个列表中的任何项比较
            lastPageDataList.forEach(function(item, index) {
                if (lastPageDataList[index][1] == dataList[1]) {
                    //  log("lastPageDataList:"+lastPageDataList);
                    // log("发现重复目录");
                    // //  log("index"+index);
                    log("dataList:" + dataList);
                    目录重复标志 = 1;
                } else {
                    log("未发现重复目录");
                    log("lastPageDataList:" + lastPageDataList);
                    log("dataList:" + dataList);
                }
                //  log("index:"+index);
                //  log("item:"+item);
                //  log("lastPageDataList[index][1]:"+lastPageDataList[index][1]);
                //  log("dataList[1]:"+dataList[1]);
            });
            //无重复的写入当前列表中
            if (目录重复标志 == 0) {
                log("dataList的值：" + dataList);
                pageDataList.push(dataList);
            }
            allPageDataList.push(dataList);
            // log("dataList[1]:"+dataList[1]);
        });
        // log("lastPageDataList[0]:"+lastPageDataList[0]);
        // log("pageDataList[0]:"+pageDataList[0]);
        // if(lastPageDataList[0][1] == pageDataList[0][1]){
        //     目录文件.close();
        //     break;
        // }
        log("pageDataList.length:" + pageDataList.length);
        if (pageDataList.length == 0) {
            log("目录重复了");
            目录文件.close();
            break;
        }
        //更新当前最新目录到上一次的目录
        lastPageDataList = allPageDataList;
        //   log(pageDataList);
        pageDataList.forEach(function(item, index) {
            目录文件.writeline(item);
        });
        // if(终极重复标志 == 1){
        //     目录文件.close();
        //     break;
        // }
        ret.scrollForward();
        log("翻页一次");
        sleep(800);
    }
}

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
    return token_Res;
}


function BaiDu_ocr(tokenres, img, is位置) {
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


// function 查询是否存在(当前wen){

// };


// function 


function 向左翻页() {
    gesture(100, [width * 3 / 4, height / 2], [width / 2, height / 2]);
    sleep(500);

}

function 向右翻页() {
    gesture(100, [width / 4, height / 2], [width / 2, height / 2]);
    sleep(500);
}

function 下一页(){
    click(width - 30, height / 2); //翻页
}

//main();