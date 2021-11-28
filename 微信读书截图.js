"ui";
var form = {
    is获取书籍目录: true,
    is获取书籍内容: true,
    is从头开始截图: true,
    value书籍截图总页数: 2,
    value书籍截图数量: 1,
    value第几本开始截图: 1,
    is截图完成删除书架:0,
    is书籍离线预下载:0,
    value书籍离线下载数量:10,


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
                        <checkbox id="获取目录按钮" text="获取目录" checked = "true"/>
                        <checkbox id="获取内容按钮" text="获取内容" checked = "true" marginTop="5"/>
                        
                        <text textSize="16sp" textColor="black" text="需要截图的书籍页数"/>
                        <input id="书籍截图总页数" text="99999" inputType="number"/>
                        <text textSize="16sp" textColor="black" text="选择第几本开始进行截图"/>
                        <input id="第几本开始截图" text="1" inputType="number"/>
                        <text textSize="16sp" textColor="black" text="需要截图的书籍数量"/>
                        <input id="书籍截图数量" text="1" inputType="number"/>
                        <text textSize="16sp" textColor="black" text="第一本是否进行从头开始截图"/>
                        <checkbox id="内容从头开始截图按钮" text="是" checked = "true" marginTop="5"/>
                        
                        <text textSize="16sp" textColor="black" text="截图完成是否删除书籍"/>
                        <checkbox id="删除书籍按钮" text="是" checked = "false" marginTop="5"/>

                        <text textSize="16sp" textColor="black" text="书籍离线预下载"/>
                        <checkbox id="书籍离线预下载按钮" text="是" checked = "false" marginTop="5"/>
                        <text textSize="16sp" textColor="black" text="需要离线下载的书籍数量" />
                        {/* <input id="离线下载书籍数量" text="10" inputType="number" />  */}
                                   
                        <text id="数据保存路径" textSize="16sp" textColor="black" text="当前书籍保存路径:"/>
                        
                    </vertical>
                </ScrollView>
                <View bg="#2196f3" h="*" w="10"/>
            </card>
            <linear gravity="center">
                <button id="start" text="开始运行" style="Widget.AppCompat.Button.Colored" w="auto"/>
                <button id="stop" text="退出"  w="auto"/>
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

ui.获取目录按钮.on("check", function(check) {
    if (check)
        form.is获取书籍目录 = true;
    else
        form.is获取书籍目录 = false;
});
ui.获取内容按钮.on("check", function(check) {
    if (check)
        form.is获取书籍内容 = true;
    else
        form.is获取书籍内容 = false;
});
ui.内容从头开始截图按钮.on("check", function(check) {
    if (check)
        form.is从头开始截图 = true;
    else
        form.is从头开始截图 = false;
});
ui.删除书籍按钮.on("check", function(check) {
    if (check)
        form.is截图完成删除书架 = true;
    else
        form.is截图完成删除书架 = false;
});

ui.书籍离线预下载按钮.on("check", function(check) {
    if (check)
        form.is书籍离线预下载 = true;
    else
        form.is书籍离线预下载 = false;
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
    form.value书籍截图总页数 = parseInt(ui.书籍截图总页数.getText());
    form.value书籍截图数量 = parseInt(ui.书籍截图数量.getText());
    form.value第几本开始截图 = parseInt(ui.第几本开始截图.getText());
  //  form.value书籍离线下载数量 = parseInt(ui.离线下载书籍数量.getText());
    main();
});

ui.stop.on("click", function() {
    threads.shutDownAll();
    engines.stopAll();
    exit();
    toast("已终止执行脚本");
});


var currentDate = new Date();
var realMonth = currentDate.getMonth()+1;
var dirName = "/storage/emulated/0/电子书/"+currentDate.getFullYear()+"-"+realMonth+"-"+currentDate.getDate()+"/";
var imgType = "jpg";
var currentPage = 0; //当前需要保存的页数
var lastPage = 0; //上次保存的页数
var totalPage = 0;
var errorPageNum = 0;
var retryFlagNum = 0;
var restoreFlag = 0;
var appPackageName = "com.tencent.weread";
var launchAppName = "微信读书";
var firstPageFlag = 0;
var ocrFailTime = 0;

threads.start(function() {
    while(1){
        ui.数据保存路径.setText("当前数据保存路径"+dirName);
        var currentDate = new Date();
        ui.当前时间.setText("当前时间为:"+currentDate);
       // toastLog(currentDate.getFullYear()+"-"+currentDate.getMonth()+"-"+currentDate.getDate());
        sleep(60000);
    }
});

//监听音量上键按下
events.onKeyDown("volume_up", function(event) {
    toast("音量上键被按下了,退出");
    sleep(1000);
    exit();

});

function 书架界面选择全部离线下载(){
    返回书架页面();
    //长按选择书架
    var target = className("android.widget.TextView").id("ho").findOnce();
  //  dirName = dirName + target.text();
    target.parent().longClick();
    sleep(200);
    //点击全选按钮
    target = className("android.widget.TextView").id("ja").text("全选").findOne(); 
    target.click();
    sleep(300);

    //再次确认
    target = className("android.widget.TextView").id("atm").text("下载到本地").findOne(1000); 

    target.parent().click();
    sleep(1000);
    if(id("ja").exists()){
        back();
    }
    sleep(1000);

}

function 删除第一本书(){
    返回书架页面();
    //长按选择书架
    var target = className("android.widget.TextView").id("ho").findOnce();
  //  dirName = dirName + target.text();
    target.parent().longClick();
    sleep(200);
    //点击移出按钮
    target = className("android.widget.TextView").text("移出书架").findOne();
    target.parent().click();
    sleep(300);

    //再次确认
    className("androidx.recyclerview.widget.RecyclerView").findOne().children().forEach(child => {
        var target = child.findOne(className("android.widget.TextView"));
        target.parent().click();
        sleep(300);
        });

}

function 比较内容是否在列表里(list,value){
    var 重复flag = false;
    list.forEach(function(item, index) {
        if (list[index] == value) {
            重复flag = true;
        } 
    });
    return 重复flag;
}

function 寻找当前书架书籍及离线预下载(num){
    var 全部书籍名称list = [];
    var 书籍搜索完成flag = 0;
    var 书籍数量Temp = num;
   // 返回书架页面();
    书架界面选择全部离线下载();
    log("1");

    while(!书籍搜索完成flag){
        var ret = className("androidx.recyclerview.widget.RecyclerView").depth(17).findOne();
        try{
            ret.children().forEach(child => {
                log(child);
                var target = child.findOne(className("android.widget.TextView"));
                if(target!=null){
                    var 当前书籍名 = target.text().replace(/\[icon\]/ig,"");
                    log("当前书籍名："+当前书籍名);
                    if(!比较内容是否在列表里(全部书籍名称list,当前书籍名)){
                        全部书籍名称list.push(当前书籍名);
                        log("dirName:"+dirName);
                        var bookPathTemp = dirName+当前书籍名+"/";
                        log("bookPathTemp:"+bookPathTemp);
                        if(!files.exists(bookPathTemp+"已下载")){
                            files.createWithDirs(bookPathTemp+"书籍离线下载已完成");
                        }
                        log("创建一次目录状态文件");
                        书籍数量Temp--;
                        if(!书籍数量Temp){
                            书籍搜索完成flag = 1;
                        }
                       // var storeDirtemp = 打开某本书(target);
                       // 数据离线下载使能(storeDirtemp);
                    }  
                }  
                else{
                    书籍搜索完成flag = 1;
                }
                if(书籍搜索完成flag){
                    throw new Error("ending");//报错，就跳出循环
                }
            });
        }catch(e){
            ;
           // toastLog(e);
        }
        ret.scrollForward();
        sleep(100);
    }
    log("书籍寻找完成");
}

function 打开某本书(目标Text控件){
    var dirNametemp = dirName + 目标Text控件.text().replace(/\[icon\]/ig,"")+"/";
    log("当前正在打开书籍的文件夹名称:"+dirNametemp);
    目标Text控件.parent().click();
    sleep(500);
    return dirNametemp;
}

function 打开第一本书(){
    返回书架页面();
    var target = className("android.widget.TextView").id("ho").findOnce();
    return 打开某本书(target);
}

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

function 返回书架页面(){
    var num = 0;
    while (!id("rw").exists()) {
        num++;
        if ((num % 10) == 0) {
            back();
        }
        sleep(100);

    }
    var isclick = id("rw").findOnce(0).click();
    log("书架页面点击成功状态："+isclick);
    //停顿防止按键按到其他界面
    sleep(500);
}

function 关闭微信进程(){
    while(!shell("am force-stop com.tencent.weread", true)){
        toastLog("已关闭微信");
        sleep(1000);
    }
}

function 数据离线下载使能(bookPath){
    if(!files.exists(bookPath+"书籍离线下载已完成")){
        //第一步
        id("a0w").findOne().click();
        //第二步
        var target =className("android.widget.TextView").text("下载到本地").findOne(2000);
        if(target != null){
            target.parent().click();
            sleep(1000);
        }
        back();
        files.createWithDirs(bookPath+"书籍离线下载已完成");
    }
}

function 检查是否正在读书界面(){
    if (currentActivity() != "com.tencent.weread.ReaderFragmentActivity") {
        toastLog(currentActivity());
        toastLog("手动跳出微信读书截图页面,执行完毕");
        exit();
    }
}


function 完整截图首本书(tokenRes){
    var num = 0;
    var openBookPathName =打开第一本书();
    if (form.is从头开始截图) {
        firstPageFlag = 1;
        数据离线下载使能(openBookPathName);
        ReturnFirstPage();
    } else {
        //返回上一页，用于获取前一页的页码
        向右翻页();
        restoreFlag = 1;
    }

    //创建书籍目录
    if (files.createWithDirs(openBookPathName)) {
    log("创建目录成功");
    } else {
        log("文件夹已存在");
    }

    do {
        try {
            //ocr获取页码及翻页    
            do {
                log("开始截图ocr");
                var img = captureScreen();
                sleep(20);                  
                下一页(); //翻页
                log("已截图，向下翻一页")
                var clip = images.clip(img, width - 350, height - 95, 350, 75);
                sleep(10);

                if(restoreFlag == 0){
                    log("上一页的页码："+ lastPage.toString());
                    var a = lastPage+1;
                    log("a:"+a);
                }
                else{
                    log("中断后重新开始状态，或者第一页开始扫描，无上一页数据");
                }

                var result = BaiDu_ocr(tokenRes, clip, false);
                //显示当前ocr获取信息
                log(result);
                
                sleep(10);

                if (result.words_result_num == 0) {
                    //第一页扉页 无页面  特殊处理
                    if (firstPageFlag == 1) {
                        log("保存扉页");
                        while(1);
                        firstPageFlag = 0;
                        var currentFilePath = openBookPathName  + "1." + imgType;
                        images.save(img, currentFilePath, imgType);
                        //保存第一页值
                        lastPage = 1;
                        var b = lastPage+1;
                        log("b:"+b);
                       // var currentFilePath = dirName + "/" + "OCR失败0"+"." + imgType;
                        // VolumeDown();
                        // sleep(1000);

                    }else{
                       // var currentFilePath = dirName + "/" + "OCR失败"+lastPage.toString()+"." + imgType;
                        //退回上一页重新截图OCR
                        var c = lastPage+1;
                        log("c:"+c);
                        log("截图失败，返回上一页重新截图");
                        log("lastPage:"+lastPage);
                        ocrFailTime++;
                        if(ocrFailTime>=2){
                            ocrFailTime = 0;
                            var currentPage = lastPage+1;
                            var currentFilePath = openBookPathName + currentPage+"." + imgType;
                            images.save(img, currentFilePath, imgType);
                            lastPage = lastPage+1;
                        }else{
                            向右翻页();
                        }
                        sleep(800);
                    }
                    
                   // images.save(clip, currentFilePath, imgType);
                    log("OCR失败一次");
                }
                //ocr并发太快，出现错误

                while (result.error_code>0 && result.error_code<9999999) {
                    var result = BaiDu_ocr(tokenRes, clip, false);
                    log(result);
                    sleep(500);
                }
                检查是否正在读书界面();

            }
            while (result.words_result_num == 0);

            ocrFailTime = 0;
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
            var d = lastPage+1;
            log("d:"+d);
            log("前一个ocr值与当前值的差值:" + tempValue.toString());

            //继续上一次的页码保存流程或者多次比较数据错误，直接跳转到下一页
            if (restoreFlag == 1) {
                tempValue = 1;
                restoreFlag = 0;
                retryFlagNum = 0;
            }

            if(tempValue == 1){
                retryFlagNum = 0;
                //定义当前图片名称
                var displaycurrentPage = currentPage;
                currentFilePath = openBookPathName + displaycurrentPage.toString() + "." + imgType;
                //保存当前页数
                log("页码连续 当前保存页:" + currentPage.toString());
                lastPage = parseInt(currentPage);
                var e = lastPage+1;
                log("e:"+e);
            }else { //当前文件与上一个文件不连续
                var displaycurrentPage = lastPage+1;
                log("f:"+displaycurrentPage);
                currentFilePath = openBookPathName + displaycurrentPage.toString()+ "." + imgType;

                log("正在保存的页："+currentFilePath);
                //错误次数加一
                errorPageNum = errorPageNum + 1;
                //重复操作三次
                log("retryFlagNum:"+retryFlagNum);
                if (retryFlagNum < 2) {
                    retryFlagNum = retryFlagNum + 1;
                    //返回上一页重新截图ocr
                    向右翻页();
                   // while(1);
                } else {
                    restoreFlag = 1;
                    lastPage = lastPage+1;
                    
                }
                
            } 
            images.save(img, currentFilePath, imgType);
            sleep(50);

            //手动跳出微信读书页面
            if (appPackageName != currentPackage()) {
                toastLog("手动退出微信读书，执行完毕！");
                exit(); // 结束脚本
            }
            检查是否正在读书界面();

            if(!form.is获取书籍内容){
                currentPage =totalPage;
                }
            //最后一页了
            if (currentPage == totalPage) {
                //currentPage =0;
                if(form.is获取书籍内容){
                toastLog("书籍截图完成");
                }
                向右翻页(); //返回上一页
                if(form.is获取书籍目录){
                    StoreTable(openBookPathName);
                    toastLog("目录保存完成");         
                }
                if(form.is截图完成删除书架 == 1){
                    删除第一本书();
                }
            }


        } catch (error) {
            toastLog(error);
            toastLog("出现异常,请关闭应用重新执行脚本！");
            exit(); // 有异常退出，结束脚本
        }
    }
    while (currentPage != totalPage);
}

function main() {
    threads.start(function() {
        if (!requestScreenCapture()) {
            log("请先开启截图权限，以执行收截图功能！");
            return;
        }
        width = device.width;
        height = device.height;
        log('width: ' + width + 'height: ' + height);

        //获取百度ocr的token码
        var baiduocrtokenRes = Get_token_Res();
        log("baiduocrtokenRes:"+baiduocrtokenRes)

        var num = 0;

        停止其余脚本();
        toastLog('已停止其余脚本');

        关闭微信进程();

        //等待无障碍服务开启
        auto.waitFor();

        //启用按键监听
        //events.observeKey();

        while (!launch(appPackageName)) {
            num = num + 1;
            if ((num % 30) == 0) {
                log("打开微信");
            }
            sleep(100);
        }

        while (appPackageName != currentPackage()) {
            num = num + 1;
            if ((num % 30) == 0) {
                log("等待打开微信");
            }
            sleep(100);
        }

        
        if(form.is书籍离线预下载){
            寻找当前书架书籍及离线预下载(form.value书籍截图数量);
        }
        while(form.value书籍截图数量 != 0){
            form.value书籍截图数量--;
            log("form.value书籍截图数量:"+form.value书籍截图数量);
            完整截图首本书(baiduocrtokenRes);
            if(!form.is截图完成删除书架){
                form.value书籍截图数量 = 0; 
            }
        }

        toastLog("全部完成，退出微信读书！");
        关闭微信进程();
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
    sleep(500);

}

function StoreTable(dir) {
    var currentDirContent = dir + "目录.txt";
//    toastLog("test5");
    var num = 0;
    //创建目录文件
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
            sleep(1000);
        }
        log("获取到目录框架");
        let pageDataList = [];
        let allPageDataList = [];
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
                    log("当前数据重复     "+"dataList:" + dataList);
                    目录重复标志 = 1;
                } else {
                    log("未发现重复目录");
                    log("lastPageDataList:" + lastPageDataList);
                    log("dataList:" + dataList);
                }
            });
            //无重复的写入当前列表中
            if (目录重复标志 == 0) {
                log("目标未重复    当前存入的dataList的值：" + dataList);
                pageDataList.push(dataList);
                log("pageDataList:"+pageDataList);
            }
            allPageDataList.push(dataList);
            // log("dataList[1]:"+dataList[1]);
        });
        log("pageDataList.length:" + pageDataList.length);
        if (pageDataList.length == 0) {
            log("目录重复了");
            目录文件.close();
            back();
            break;
        }
        //更新当前最新目录到上一次的目录
        lastPageDataList = [];
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
    //点击页码处即可

    click(width-60,height-60);
   // click(width - 30, height / 2); //翻页
}
