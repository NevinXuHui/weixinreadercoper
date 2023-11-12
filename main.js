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
      <text id="text" textSize="16sp" textColor="#3b17dbff" />
      <button id="captureAndOcr" text="截图识别" />
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


window.exitOnClose();
恢复悬浮窗初始状态()

window.text.click(() => {
  window.setAdjustEnabled(!window.isAdjustEnabled());
});

setInterval(() => {
  //对控件的操作需要在UI线程中执行
  ui.run(function () {
    window.text.setText(dynamicText());
  });
}, 1000);

setInterval(function () {
    // toastLog("1s刷新", "forcible");
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
  if (!(bookname === null)) str += "bookname: " + bookname + "\n";

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

function 恢复悬浮窗初始状态() {
  bookname = null;
  ocrresult = [];
  window.setSize(800, 700);
  window.setPosition(140, 100);
  ocrstart = 0;
}

function 微信读书页存在其他控件() {
  if (text("上滑显示工具栏").exists()) {
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

function ocrfuction() {
  if (packageName("com.tencent.weread").id("pull_description").exists()) {
    if (bookname === null) {
      if (id("reader_top_more").exists()) {
        id("reader_top_more").findOnce().click();
        sleep(300);
        bookname = className("TextView").depth(5).findOnce().text();
        setScreenMetrics(1080, 1920);
        swipe(540, 960, 540, 1900, 30);
      } else {
        setScreenMetrics(1080, 1920);
        swipe(540, 960, 540, 100, 100);
      }
    } else {
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
