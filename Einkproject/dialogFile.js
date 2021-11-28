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

module.exports =dialogFile