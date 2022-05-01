"ui";
importClass(android.widget.AdapterView);
importClass(android.widget.SeekBar);
importClass(java.io.File);

// //导入插件
// var ocr2 = $plugins.load("com.hraps.ocr")

var OCR = $plugins.load('org.autojs.plugin.ocr');
var ocr = new OCR();
$events.on('exit', () => {
    ocr.end();
});

var 连续获取书籍数量列表Value = 1

var 图片压缩比Value = 15;
var 翻页延时时间Value = 40;

var 内容从头开始截图按钮Value = null;//BindVar-Create 内容从头开始截图按钮

var 自动获取书籍按钮Value = null;//BindVar-Create 获取内容按钮

var 显示想法按钮Value = null;

var 显示截图悬浮按钮Value = null

var 书籍目录包含日期按钮Value = null

var 截图应用微信读书按钮Value = null
var 截图应用微信读书Eink按钮Value = null

var entries = "一本书|二本书|三本书|四本书|五本书"

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
                        <text text="选择截图App" textColor="#222222"/>
                        <radiogroup>
                            <radio id="微信读书按钮" text="微信读书"/>
                            <radio id="微信读书Eink按钮" text="微信读书Eink"/>
                        </radiogroup>

                        <text text="连续获取书籍数量" textColor="#222222"/>
                        <spinner id="连续获取书籍数量列表" entries="{{entries}}" spinnerMode="dialog"/>
                        <seekbar id="图片压缩比"/>
                        <text text="当前图片压缩比:20%" id="当前图片压缩比显示值" textColor="#222222"/>
                        <seekbar id="翻页延时"/>
                        <text text="当前翻页延时:100ms" id="当前翻页延时显示值" textColor="#222222"/>
                        <text text="下载功能选择：" textColor="#222222"/>
                        <checkbox id="自动获取书籍按钮" text="自动获取书籍" checked = "true"/>
                        <checkbox id="显示想法按钮" text="显示想法" checked = "true"/>

                        <checkbox id="显示截图悬浮按钮" text="显示截图悬浮窗" checked = "true"/>
                        <checkbox id="书籍目录包含日期按钮" text="书籍目录包含日期" checked = "true"/>
                        
                        <text textSize="16sp" textColor="black" text="是否进行从头开始截图"/>
                        <checkbox id="内容从头开始截图按钮" text="是" checked = "true" marginTop="5"/>
                        
                        
                    </vertical>
                </ScrollView>
                <View bg="#2196f3" h="*" w="10"/>
            </card>
            <linear gravity="center">
                <button id="start" text="开始运行" w="auto"/>
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
)

//字符串格式化
String.prototype.format = function(args) {
    var result = this;
    if (arguments.length < 1) {
        return result;
    }
    var data = arguments;		//如果模板参数是数组
    if (arguments.length == 1 && typeof (args) == "object") {
        //如果模板参数是对象
        data = args;
    }
    for (var key in data) {
        var value = data[key];
        if (undefined != value) {
            result = result.replace("{" + key + "}", value);
        }
}
    return result;
}



//设置滑动页面的标题
ui.viewpager.setTitles(["任务列表", "其他"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);

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

ui.stop.on("click",()=>{
   // threads.shutDownAll();
   // engines.stopAll();
    exit();
});

ui.start.on("click",()=>{
    //程序开始运行之前判断无障碍服务
    if (auto.service == null) {
        toastLog("请先开启无障碍服务！");
        return;
    }

    if((!截图应用微信读书按钮Value)&&(!截图应用微信读书Eink按钮Value)){
        toastLog("未获取到需要截图的微信读书版本，请重新选择")
        return;
    }
        

  threads.start(function() {
    main()
  })

});

//BindSdcard-Init&Save
var uiStorage = storages.create("STORAGE_UI_VALUE_7891859369");
ui.emitter.on("resume",()=>{
    log("resume initUiValue")
    initUiValue();
});
ui.emitter.on("pause",()=>{
    saveUiValue();
});

function initUiValue(){
    ui.图片压缩比.setProgress(uiStorage.get("图片压缩比",图片压缩比Value));
    ui.翻页延时.setProgress(uiStorage.get("翻页延时",翻页延时时间Value));
    ui.连续获取书籍数量列表.setSelection(uiStorage.get("连续获取书籍数量",连续获取书籍数量列表Value));
    ui.内容从头开始截图按钮.setChecked(uiStorage.get("内容从头开始截图按钮",false));
    ui.自动获取书籍按钮.setChecked(uiStorage.get("自动获取书籍按钮",false));

    ui.显示想法按钮.setChecked(uiStorage.get("显示想法按钮",false));
    ui.显示截图悬浮按钮.setChecked(uiStorage.get("显示截图悬浮按钮",false));

    ui.书籍目录包含日期按钮.setChecked(uiStorage.get("书籍目录包含日期按钮",false));
    
    ui.微信读书按钮.setChecked(uiStorage.get("微信读书按钮",false));
    ui.微信读书Eink按钮.setChecked(uiStorage.get("微信读书Eink按钮",截图应用微信读书Eink按钮Value));


    内容从头开始截图按钮Value = ui.内容从头开始截图按钮.checked;
    自动获取书籍按钮Value = ui.自动获取书籍按钮.checked;
    显示想法按钮Value = ui.显示想法按钮.checked;
    显示截图悬浮按钮Value = ui.显示截图悬浮按钮.checked;

    书籍目录包含日期按钮Value = ui.书籍目录包含日期按钮.checked;

    截图应用微信读书按钮Value =ui.微信读书按钮.checked
    截图应用微信读书Eink按钮Value =ui.微信读书Eink按钮.checked

    连续获取书籍数量列表Value = ui.连续获取书籍数量列表.getSelectedItemPosition()+1

    图片压缩比Value = ui.图片压缩比.getProgress();
    翻页延时时间Value = ui.翻页延时.getProgress();


    ui.当前图片压缩比显示值.text("当前图片压缩比:{0}%".format(图片压缩比Value))
    ui.当前翻页延时显示值.text("当前翻页延时:{0}ms".format(翻页延时时间Value*5))

    log("initUiValue...")
}
function saveUiValue(){
    uiStorage.put("图片压缩比",ui.图片压缩比.getProgress());
    uiStorage.put("翻页延时",ui.翻页延时.getProgress());
    uiStorage.put("连续获取书籍数量",ui.连续获取书籍数量列表.getSelectedItemPosition());
    uiStorage.put("内容从头开始截图按钮",ui.内容从头开始截图按钮.checked);
    uiStorage.put("自动获取书籍按钮",ui.自动获取书籍按钮.checked);
    uiStorage.put("显示想法按钮",ui.显示想法按钮.checked);
    uiStorage.put("显示截图悬浮按钮",ui.显示截图悬浮按钮.checked);

    uiStorage.put("书籍目录包含日期按钮",ui.书籍目录包含日期按钮.checked);

    uiStorage.put("微信读书按钮",ui.微信读书按钮.checked);
    uiStorage.put("微信读书Eink按钮",ui.微信读书Eink按钮.checked);

    
}

ui.内容从头开始截图按钮.on("check",(checked)=>{
    uiStorage.put("内容从头开始截图按钮",ui.内容从头开始截图按钮.checked);
    内容从头开始截图按钮Value = ui.内容从头开始截图按钮.checked;
    log("内容从头开始截图:"+内容从头开始截图按钮Value)

});
ui.自动获取书籍按钮.on("check",(checked)=>{
    uiStorage.put("自动获取书籍按钮",ui.自动获取书籍按钮.checked);
    自动获取书籍按钮Value = ui.自动获取书籍按钮.checked;
    log("自动获取书籍:"+自动获取书籍按钮Value)

});

ui.显示想法按钮.on("check",(checked)=>{
    uiStorage.put("显示想法按钮",ui.显示想法按钮.checked);
    显示想法按钮Value = ui.显示想法按钮.checked;
    log("显示想法:"+显示想法按钮Value)
});

ui.显示截图悬浮按钮.on("check",(checked)=>{

    uiStorage.put("显示截图悬浮按钮",ui.显示截图悬浮按钮.checked);
    显示截图悬浮按钮Value = ui.显示截图悬浮按钮.checked;
    log("显示截图悬浮:"+显示截图悬浮按钮Value)   
});

ui.微信读书按钮.on("check",(checked)=>{
    if(checked){
        uiStorage.put("微信读书按钮",ui.微信读书按钮.checked);
        截图应用微信读书按钮Value = ui.微信读书按钮.checked;
    
        uiStorage.put("微信读书Eink按钮",false);
        截图应用微信读书Eink按钮Value = false;
    
        log("截图应用微信读书按钮Value:"+截图应用微信读书按钮Value)
        log("截图应用微信读书Eink按钮Value:"+截图应用微信读书Eink按钮Value)
    }

});

ui.微信读书Eink按钮.on("check",(checked)=>{
    if(checked){
        uiStorage.put("微信读书Eink按钮",ui.微信读书Eink按钮.checked);
        截图应用微信读书Eink按钮Value = ui.微信读书Eink按钮.checked;
    
        uiStorage.put("微信读书按钮",false);
        截图应用微信读书按钮Value = false;
    
        log("截图应用微信读书按钮Value:"+截图应用微信读书按钮Value)
        log("截图应用微信读书Eink按钮Value:"+截图应用微信读书Eink按钮Value)
    }

});

ui.书籍目录包含日期按钮.on("check",(checked)=>{
    uiStorage.put("书籍目录包含日期按钮",ui.书籍目录包含日期按钮.checked);
    书籍目录包含日期按钮Value = ui.书籍目录包含日期按钮.checked;
    log("书籍目录包含日期按钮:"+书籍目录包含日期按钮Value)
});


ui.连续获取书籍数量列表.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener({onItemSelected : function(parent,view,i,id){
    连续获取书籍数量列表Value = ui.连续获取书籍数量列表.getSelectedItemPosition()+1;
    log("连续获取书籍数量列表Value:"+连续获取书籍数量列表Value)
}}));

ui.图片压缩比.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener({onProgressChanged : function(bar,i,isFromUser){
    图片压缩比Value = ui.图片压缩比.getProgress();
    ui.当前图片压缩比显示值.text("当前图片压缩比:"+图片压缩比Value)
    log("图片压缩比Value:"+图片压缩比Value)
}}));

ui.翻页延时.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener({onProgressChanged : function(bar,i,isFromUser){
    翻页延时时间Value = ui.翻页延时.getProgress();
    ui.当前翻页延时显示值.text("当前翻页延时:"+翻页延时时间Value*5)
    log("翻页延时时间Value:"+翻页延时时间Value*5)
}}));

function main(){

    if(截图应用微信读书按钮Value == true){
        var 截图应用 = "微信应用"
    }
    else if(截图应用微信读书Eink按钮Value == true){
        var 截图应用 = "微信Eink应用"
    }
    else{
        var 截图应用 =null
        toastLog("未获取到需要截图的微信读书版本，请重新选择")
    }

    if(内容从头开始截图按钮Value == true){
        var currentPage = 1
    }else{
        var currentPage = 0
    }

    log("currentPage:"+currentPage);

    log("图片压缩比Value的类型:"+typeof(图片压缩比Value))
    log("图片压缩比Value:"+图片压缩比Value)

    device.keepScreenOn()

    EinkRead.打开微信读书(截图应用)

    EinkRead.进入书架界面(截图应用)

    if(自动获取书籍按钮Value == true){
        var choiceBookindex = 0
    }else{
        var bookNameList = EinkRead.获取书架列表(截图应用)
        var choiceBookindex = dialogFile.下载数据选择对话框(bookNameList)
    }

    log("choiceBookindex:"+choiceBookindex)



    while(连续获取书籍数量列表Value--){


        var 当前书籍名 = EinkRead.打开书籍(choiceBookindex,截图应用)

        EinkRead.跳转到首页(currentPage,显示想法按钮Value,截图应用)
 
        var dirName = EinkRead.获取当前书籍存储路径(当前书籍名,书籍目录包含日期按钮Value)
    
        EinkRead.打开截图权限()
    
        var tokenRes= baiduOCR.Get_token_Res()
    
        EinkRead.截整本书(tokenRes,dirName,currentPage,baiduOCR,图片压缩比Value,ocr,翻页延时时间Value,截图应用)

        choiceBookindex++
        EinkRead.进入书架界面()

    }

    toastLog("截图完成退出")
    device.cancelKeepingAwake()
    threads.shutDownAll();
    engines.stopAll();

}


var EinkRead = require('EinkRead.js');
var baiduOCR = require('baiduOCR.js');
var jsonUtil = require('jsonUtil.js');
var dialogFile = require('dialogFile.js');

EinkRead.删除全部其他脚本(engines.myEngine())
initUiValue();