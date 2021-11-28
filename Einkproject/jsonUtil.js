var jsonUtil = {}

jsonUtil.readJSON = function(fileName){
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
jsonUtil.writeJSON = function(fileName,data){
    if(typeof fileName == "string"){
        try{
            files.write(fileName,JSON.stringify(data))
        }catch(e){
            console.log("Hava Error!!!")
        }
    }
}

module.exports = jsonUtil