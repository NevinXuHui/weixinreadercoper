auto();
var path = "./main_copy.js"
var EinkRead = require('EinkRead.js');

EinkRead.删除全部其他脚本(engines.myEngine())

var  书籍选择触摸坐标=null 
var  书架列表 = null

var 书架页切换标志 = false

//启用触摸监听
events.observeTouch()
//注册触摸监听器
events.onTouch(function(p){
    //触摸事件发生时, 打印出触摸的点的坐标
    log(p.x + ", " + p.y)
})

threads.start(function() {



    var window = floaty.window(
        <frame>
            <horizontal padding="18 8" h="auto">
                <button id="action" text="截图" w="90" h="40" bg="#77ffffff"/>
                <button id="action2" text="打开设置界面" w="90" h="40" bg="#77ffffff"/>
            </horizontal>           
        </frame>
    )
    setInterval(() => {
        log("主进程当前包名："+currentPackage())
        log("主进程当前活动："+currentActivity())
        if("com.tencent.weread.eink" == currentPackage() && 
            ("com.tencent.weread.WeReadFragmentActivity" == currentActivity())&&
            (className("android.view.ViewGroup").depth(14).id("a0m").exists())){
                    log("当前在书架页")
                    if(书架页切换标志 == true){
                        书架页切换标志 = false
                        书架列表 = EinkRead.获取书架列表()
                        log("获取书籍列表:"+书架列表)
                    }
        }
        else{

            书架页切换标志 = true
            if("com.tencent.weread.eink" == currentPackage() && 
            ("com.tencent.weread.ReaderFragmentActivity" == currentActivity())){
                
                var localX = 0
                var localY = 0
                var XNum = 0
                var YNum = 0
                var i = 0
                while(书架列表[i][1].left<书架列表[i+1][1].left){
                    i++
                }
                XNum = i+1
                YNum = 书架列表.length /XNum

                log("书籍有"+XNum+"列  "+"有"+YNum+"行")

                i = 0
                while(书架列表[i][1].left<书籍选择触摸坐标.x){
                    i++
                }
                localX = i

                i = 0
                while(书架列表[i*XNum][1].top<书籍选择触摸坐标.y){
                    log("书籍选择触摸坐标.y:"+书籍选择触摸坐标.y)
                    log("书架列表[i*XNum][1].top:"+书架列表[i*XNum][1].top)
                    log("i:"+i)
                    i++
                }
                localY = i

                log("localX:"+localX)
                log("localY:"+localY)

                log("书籍选择坐标："+"x="+书籍选择触摸坐标.x+"y="+书籍选择触摸坐标.y)
                log("第二本坐标"+书架列表[1][1].left+","+书架列表[1][1].right+","+书架列表[1][1].top+","+书架列表[1][1].bottom)

        }
        }
    }, 1000);

    window.setPosition(device.width/2,device.height/2)

    var execution = null;
    
    //记录按键被按下时的触摸坐标
    var x = 0,
        y = 0;
    //记录按键被按下时的悬浮窗位置
    var windowX, windowY;
    //记录按键被按下的时间以便判断长按等动作
    var downTime;
    
    window.action.setOnTouchListener(function(view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                windowX = window.getX();
                windowY = window.getY();
                downTime = new Date().getTime();
                return true;
            case event.ACTION_MOVE:
                //移动手指时调整悬浮窗位置
                window.setPosition(windowX + (event.getRawX() - x),
                    windowY + (event.getRawY() - y));
                //如果按下的时间超过1.5秒判断为长按，退出脚本
                if (new Date().getTime() - downTime > 2000) {
                    log("长按时间超过3s，退出程序")
                    threads.shutDownAll();
                    engines.stopAll();
                    exit();
                }
                return true;
            case event.ACTION_UP:
                //手指弹起时如果偏移很小则判断为点击
                if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                    onClick();
                }
                return true;
        }
        return true;
    });

    window.action2.setOnTouchListener(function(view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                windowX = window.getX();
                windowY = window.getY();
                downTime = new Date().getTime();
                return true;
            case event.ACTION_MOVE:
                //移动手指时调整悬浮窗位置
                window.setPosition(windowX + (event.getRawX() - x),
                    windowY + (event.getRawY() - y));
                //如果按下的时间超过1.5秒判断为长按，退出脚本
                if (new Date().getTime() - downTime > 2000) {
                    log("长按时间超过3s，退出程序")
                    threads.shutDownAll();
                    engines.stopAll();
                    exit();
                }
                return true;
            case event.ACTION_UP:
                //手指弹起时如果偏移很小则判断为点击
                if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                    onClick2();
                }
                return true;
        }
        return true;
    });

    
    function onClick() {
        log("onclick当前包名："+currentPackage())
        log("onclick当前活动："+currentActivity())
        if("com.tencent.weread.ReaderFragmentActivity"!=currentActivity()){
             toastLog("截图失败，不在微信读书界面")
        }
        else{
            toastLog("截图完成")
        }
        

        // if (window.action.getText() == '开始运行') {
        //    // execution = engines.execScriptFile(path);
        //     window.action.setText('停止运行');
        // } else {
        //     // if (execution) {
        //     //     execution.getEngine().forceStop();
        //     // }
        //     window.action.setText('开始运行');
        // }
    }

    function onClick2() {
        if (window.action2.getText() == '打开设置界面') {
            log("打开设置界面")
             execution = engines.execScriptFile(path);
             //window.action2.setText('停止运行');
         } else {
             // if (execution) {
             //     execution.getEngine().forceStop();
             // }
             //window.action2.setText('开始运行');
         }
    }
    })

