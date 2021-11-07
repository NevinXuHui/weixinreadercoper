log("微信打开成功状态："+app.launch("com.tencent.weread.eink"))
while("com.tencent.weread.eink"!=currentPackage()){
    sleep(200)
}
log("当前包名："+currentPackage())
log("当前活动："+currentActivity())

while(!className("android.widget.TextView").text("书架").exists()){
    log("不在微信读书主界面")
    log("当前包名："+currentPackage())
    log("当前活动："+currentActivity())
    if("com.tencent.weread.ReaderFragmentActivity"==currentActivity()){
        click(device.width/2, device.height/2)
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

className("android.widget.RelativeLayout").depth(17).findOnce().parent().click()

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

requestScreenCapture()
sleep(200)
img = captureScreen()
sleep(100)
var currentDate = new Date()
var realMonth = currentDate.getMonth()+1
var dirName = "/storage/emulated/0/电子书/"+currentDate.getFullYear()+"-"+realMonth+"-"+currentDate.getDate()+"/"
var imgType = "jpg"
var currentPage = 1
var openBookPathName = 0
files.ensureDir(dirName)

// 截图
while(1){
    img = captureScreen()
    var img1 = images.copy(img)
    sleep(100)
    img = captureScreen()
    var img2 = images.copy(img)
    sleep(100)
    var p =  findImage(img1, img2,{
         threshold: 1})

    log("p="+p)

    while(!p){
        img1 =images.copy(img)
        img = captureScreen()
        img2 = images.copy(img)
        sleep(100)
        p =  findImage(img1, img2,{
            threshold: 1})
        log("截图未准备好")
    }

    click(device.width-60,device.height-60)
    sleep(100)
    var currentFilePath = dirName + currentPage+"." + imgType
    images.save(img, currentFilePath, imgType)
    img1.recycle()
    img2.recycle()
    log("保存页："+currentPage)
    currentPage++
    if("com.tencent.weread.ReaderFragmentActivity"!=currentActivity()){
        exit(); // 有异常退出，结束脚本
    }
}






