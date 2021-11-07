log("微信打开成功状态："+app.launch("com.tencent.weread.eink"))
while("com.tencent.weread.eink"!=currentPackage()){
    sleep(200)
}
log("当前包名："+currentPackage())
log("当前活动："+currentActivity())

while(className("android.widget.TextView").text("书架").exists
