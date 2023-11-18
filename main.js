let currentEngine = engines.myEngine();
let runningEngines = engines.all();
let currentSource = currentEngine.getSource() + "";
if (runningEngines.length > 1) {
  runningEngines.forEach((compareEngine) => {
    let compareSource = compareEngine.getSource() + "";
    if (
      currentEngine.id !== compareEngine.id &&
      compareSource === currentSource
    ) {
      // 强制关闭同名的脚本
      compareEngine.forceStop();
    }
  });
}

var window = floaty.window(
  <frame gravity="center">
    <vertical>
      {/* <text id="text" textSize="16sp" textColor="#e61414" /> */}
      <button id="captureAndOcr" text="半自动截图识别" />
      <button id="autocaptureAndOcr" text="自动截图识别" />
      <button id="storeToc" text="保存目录" />
      <button id="closeBtn" text="退出" />
    </vertical>
  </frame>
);

// 点击关闭
window.closeBtn.click(function () {
  exit();
});
var ocrstart = 0;

window.captureAndOcr.click(function () {
  // toastLog("开始识别", "forcible");
  ocrstart = 1;
});

window.autocaptureAndOcr.click(function () {
  // toastLog("开始识别", "forcible");
  ocrstart = 2;
});

//启用按键监听
events.observeKey();
//监听音量上键按下
events.onKeyDown("volume_up", function(event) {
    toast("音量上键被按下了,暂停截图");
  // sleep(1000);
  ocrstart =0
      恢复悬浮窗初始状态();
    // exit();

});

window.exitOnClose();
恢复悬浮窗初始状态();

// window.text.click(() => {
//   window.setAdjustEnabled(!window.isAdjustEnabled());
// });

setInterval(() => {
  //对控件的操作需要在UI线程中执行
  ui.run(function () {
    // window.text.setText(dynamicText());
  });
}, 1000);

setInterval(function () {
  // toastLog("1s刷新", "forcible");
  if (ocrstart == 2)
  {
    ocrstart = 1
    打开微信()
  }
  if (ocrstart == 1) {
    // toastLog("开始识别 ocr", "forcible");
    ocrfuction();
  }
}, 1000);

function dynamicText() {
  var date = new Date();
  var str = util.format(
    "时间: %d:%d:%d\n",
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  );
  str += util.format("内存使用量: %d%%\n", getMemoryUsage());
  str += "当前活动: " + currentActivity() + "\n";
  str += "当前包名: " + currentPackage() + "\n";
  if (!(bookname === null)) {
    str += "bookname: " + bookname + "\n";
  }

  if (ocrresult.length > 0) {
    str += "ocrresult:" + ocrresult[ocrresult.length - 1];
  }
  return str;
}

//获取内存使用率
function getMemoryUsage() {
  var usage = (100 * device.getAvailMem()) / device.getTotalMem();
  //保留一位小数
  return Math.round(usage * 10) / 10;
}

toastLog("Hello, AutoJs6 " + app.autojs.versionName);
toastLog(ocr.mode);
var bookname = null;
var ocrresult = [];

// console
//   .build({
//     size: [0.8, 0.6],
//     position: [0.1, 0.15],
//     title: "HELLO WORLD",
//     titleTextSize: 18,
//     contentTextSize: 16,
//     backgroundColor: "deep-orange-900",
//     titleBackgroundAlpha: 0.8,
//     contentBackgroundAlpha: 0.5,
//     exitOnClose: 6e3,
//   })
//   .show();

function 打开微信() {
  app.launch("com.tencent.weread")
 }


function 恢复悬浮窗初始状态() {
  bookname = null;
  ocrresult = [];
  window.setSize(800, 700);
  window.setPosition(140, 100);
  ocrstart = 0;
}

function 微信读书页存在其他控件() {
  if (text("上滑显示工具栏").exists()) {
    log("存在上滑工具栏按钮")
    return 1;
  }
  if (textContains("返回原进度").exists()) {
    log("存在返回原进度按钮")
    return 1;
  }
  if (textContains("你正在使用付费会员卡").exists()) {
    log("存在正在使用付费会员卡按钮")
    return 1;
  }
  return 微信读书页面需要重新下载()
}

function 微信读书页面需要重新下载() {
  if (className("android.widget.Button").clickable().text("重新下载").exists()) {  
    log("存在重新下载按钮")
    id("empty_view_button").findOnce().click();
    return 1;
  }
  return 0;

}

function 悬浮窗口消失() {
  window.setSize(0, 0);
}

function OCR并截图保存() {
  images.requestScreenCapture();
  let img = images.captureScreen();
  ocrresult = ocr(img);
  let openBookPathName = "/storage/emulated/0/book/" + bookname;

  var integralContent = ocrresult[ocrresult.length - 1].split("/");
  currentPage = integralContent[0];

  files.createWithDirs(openBookPathName + "/");
  images.saveImage(img, openBookPathName + "/" + currentPage + ".jpg");
}

function 向左滑动() {
  setScreenMetrics(1080, 1920);
  swipe(960, 960, 200, 960, 100);
}


function 获取书籍名称()
{
  if (bookname === null) {
      if (id("reader_top_more").exists()) {
        id("reader_top_more").findOnce().click();
        sleep(300);
        if (className("TextView").depth(5).exists()) {
          bookname = className("TextView").depth(5).findOnce().text();
        } else if (className("TextView").depth(4).exists()) {
          bookname = className("TextView").depth(4).findOnce().text();
        }
        setScreenMetrics(1080, 1920);
        swipe(540, 960, 540, 1900, 30);
      } else {
        setScreenMetrics(1080, 1920);
        swipe(540, 960, 540, 100, 100);
      }
    }
}

function ocrfuction() {
  if (packageName("com.tencent.weread").id("pull_description").exists()) {
    获取书籍名称()
    if (bookname !== null)  {
      if (id("reader_top_more").exists()) {
        setScreenMetrics(1080, 1920);
        click(540, 960);
      } else {
        if (!微信读书页存在其他控件()) {
          悬浮窗口消失();
          OCR并截图保存();
          向左滑动();
        }
      }
    }
  } else if (packageName("com.tencent.mm").exists()) {
    恢复悬浮窗初始状态();
  } else {
    恢复悬浮窗初始状态();
  }
}

function 保存目录() {
    var currentDirContent = dir + "/目录.txt";
    toastLog("test5");
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
toastLog("test6");

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


