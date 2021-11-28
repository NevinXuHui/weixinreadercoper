"ui";
importClass(android.widget.AdapterView);
importClass(android.widget.SeekBar);

var 测试列表Value = null
var 图片压缩比Value = null;
var 内容从头开始截图按钮Value = null;//BindVar-Create 内容从头开始截图按钮
var 获取内容按钮Value = null;//BindVar-Create 获取内容按钮
var 获取目录按钮Value = null;//BindVar-Create 获取目录按钮
var entries = "1|2|3"

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
                        <spinner id="测试列表" entries="{{entries}}"/>
                        <seekbar id="图片压缩比"/>
                        <text text="下载功能选择：" textColor="#222222"/>
                        <checkbox id="获取目录按钮" text="获取目录" checked = "true"/>
                        <checkbox id="获取内容按钮" text="获取内容" checked = "true" marginTop="5"/>
                        
                        {/* <text textSize="16sp" textColor="black" text="需要截图的书籍页数"/>
                        <input id="书籍截图总页数" text="99999" inputType="number"/> */}
                        {/* <text textSize="16sp" textColor="black" text="选择第几本开始进行截图"/>
                        <input id="第几本开始截图" text="1" inputType="number"/>
                        <text textSize="16sp" textColor="black" text="需要截图的书籍数量"/>
                        <input id="书籍截图数量" text="1" inputType="number"/> */}
                        <text textSize="16sp" textColor="black" text="是否进行从头开始截图"/>
                        <checkbox id="内容从头开始截图按钮" text="是" checked = "true" marginTop="5"/>
                        
                        <text textSize="16sp" textColor="black" text="截图完成是否删除书籍"/>
                        <checkbox id="删除书籍按钮" text="是" checked = "false" marginTop="5"/>

                        <text textSize="16sp" textColor="black" text="书籍离线预下载"/>
                        <checkbox id="书籍离线预下载按钮" text="是" checked = "false" marginTop="5"/>
                        {/* <text textSize="16sp" textColor="black" text="需要离线下载的书籍数量" /> */}
                        {/* <input id="离线下载书籍数量" text="10" inputType="number" />  */}
                                   
                        <text id="数据保存路径" textSize="16sp" textColor="black" text="当前书籍保存路径:"/>
                        
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

//BindSdcard-Init&Save
var uiStorage = storages.create("STORAGE_UI_VALUE_789185");
ui.emitter.on("resume",()=>{
    initUiValue();
});
ui.emitter.on("pause",()=>{
    saveUiValue();
});
initUiValue();
function initUiValue(){
    ui.图片压缩比.setProgress(uiStorage.get("图片压缩比",0));
    ui.测试列表.setSelection(uiStorage.get("测试列表",0));
    ui.内容从头开始截图按钮.setChecked(uiStorage.get("内容从头开始截图按钮",false));
    ui.获取内容按钮.setChecked(uiStorage.get("获取内容按钮",false));
    ui.获取目录按钮.setChecked(uiStorage.get("获取目录按钮",false));
}
function saveUiValue(){
    uiStorage.put("图片压缩比",ui.图片压缩比.getProgress());
    uiStorage.put("测试列表",ui.测试列表.getSelectedItemPosition());
    uiStorage.put("内容从头开始截图按钮",ui.内容从头开始截图按钮.checked);
    uiStorage.put("获取内容按钮",ui.获取内容按钮.checked);
    uiStorage.put("获取目录按钮",ui.获取目录按钮.checked);
}

ui.内容从头开始截图按钮.on("check",(checked)=>{
    uiStorage.put("内容从头开始截图按钮",ui.内容从头开始截图按钮.checked);
    内容从头开始截图按钮Value = ui.内容从头开始截图按钮.checked;
});
//Bind-Connect 获取内容按钮
ui.获取内容按钮.on("check",(checked)=>{
    uiStorage.put("获取内容按钮",ui.获取内容按钮.checked);
    获取内容按钮Value = ui.获取内容按钮.checked;
});
//Bind-Connect 获取目录按钮
ui.获取目录按钮.on("check",(checked)=>{
    uiStorage.put("获取目录按钮",ui.获取目录按钮.checked);
    获取目录按钮Value = ui.获取目录按钮.checked;
});

ui.测试列表.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener({onItemSelected : function(parent,view,i,id){
    // 测试列表Value = ui.测试列表.getSelectedItemPosition();
    测试列表Value = ui.测试列表.getSelectedItem();
    toastLog(测试列表Value)
}}));

ui.图片压缩比.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener({onProgressChanged : function(bar,i,isFromUser){
    图片压缩比Value = ui.图片压缩比.getProgress();
    toastLog("比例改变："+图片压缩比Value)
}}));


toastLog('Hello, Auto.js ' + $app.autojs.versionName);

function readJSON(fileName){
    if(typeof fileName == "string"){
        var strList = fileName.split(".");
        if(strList[strList.length-1].toLowerCase() == "json"){
            var data = files.read(fileName);
            return JSON.parse(data);
        }else{
            throw Error("not JSON File")
        }
    }else{
        throw Error("not file name")
    }
}
function writeJSON(fileName,data){
    if(typeof fileName == "string"){
        try{
            files.write(fileName,JSON.stringify(data))
        }catch(e){
            console.log("Hava Error!!!")
        }
    }
}

var jsonData = readJSON("project.json")
writeJSON("data.json",jsonData)
log("jsonData.name:"+jsonData.name)

var EinkRead = require('EinkRead.js');
var baiduOCR = require('baiduOCR.js');
console.log("半径为 4 的圆的面积是 %d", EinkRead.area(4));
console.log("半径为 4 的圆的面积是 %d", baiduOCR.Get_token_Res);

