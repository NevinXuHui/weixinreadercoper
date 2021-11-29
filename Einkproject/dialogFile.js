var dialogFile = {}

dialogFile.thelist = function(str) {
    let file = new File(str)
    let file0 = ['...']
    if (str != '/sdcard') {
        for (let keys in file.list()) {
            file0.push(file.list()[keys])
        }
    } else {
        file0 = file.list()
    }
    dialogs.build({
        title: "请选择",
        items: file0,
        itemsSelectMode: "select"
    }).on("item_select", (index, item, dialog) => {
        if (item == '...') {
            return dialogFile.thelist((new File(str)).getParent())
        }
        if ((new File(str + '/' + item)).isDirectory()) {
            return dialogFile.thelist(str + '/' + item)
        } else if ((new File(str + '/' + item)).isFile()) {
            return alert(str + '/' + item)
        }
    }).show();
}


dialogFile.下载数据选择对话框 = function(bookNameList){
    var choiceBookindex = null
    var lock = threads.lock()
    var complete = lock.newCondition()
    // var sum = threads.disposable();
    threads.start(function(){
        dialogs.build({
            title: "请选择",
            items: bookNameList,
            itemsSelectMode: "single"
        }).on("single_choice", (index, item, dialog) => {
            toastLog("选择了66666"+item)
            choiceBookindex = index
            // sum.setAndNotify(item);
            //通知主线程接收结果
            lock.lock();
            complete.signal();
            lock.unlock();
        }).show();
        

   })
    lock.lock()
    complete.await()
    lock.unlock()
    return choiceBookindex

    // dialogs.build({
    //     title: "单选",
    //     items: ["选项1", "选项2", "选项3", "选项4"],
    //     itemsSelectMode: "single",
    //     itemsSelectedIndex: 3
    // }).on("single_choice", (index, item)=>{
    //     toast("您选择的是" + item);
    // }).show();
    // dialogs.build({
    //     //对话框标题
    //     title: "发现新版本",
    //     //对话框内容
    //     content: "更新日志: 新增了若干了BUG",
    //     //确定键内容
    //     positive: "下载",
    //     //取消键内容
    //     negative: "取消",
    //     //中性键内容
    //     neutral: "到浏览器下载",
    //     //勾选框内容
    //     checkBoxPrompt: "不再提示"
    // }).on("positive", ()=>{
    //     //监听确定键
    //     toast("开始下载....");
    // }).on("neutral", ()=>{
    //     //监听中性键
    //     app.openUrl("https://www.autojs.org");
    
    // }).on("check", (checked)=>{
    //     //监听勾选框
    //     log(checked);
    // }).show();

}

module.exports =dialogFile