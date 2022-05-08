var EinkRead = {};

EinkRead.向前翻页 = function() {
  gesture(10, [device.width  / 4, device.height / 2], [device.width / 2, device.height / 2]);
  sleep(500);

}

EinkRead.向后翻页 = function() {
  gesture(10, [device.width*3 / 4, device.height / 2], [device.width / 2, device.height / 2]);
  sleep(500);
}


EinkRead.获取目录 = function(dirName,flag,截图应用){
  var currentDirContent = dirName + "目录";
  //创建目录文件
  files.createWithDirs(currentDirContent);
  var 目录文件 = open(currentDirContent, "w");
  log("创建目录文件完成")

  //显示底下框

  if(截图应用 == "微信应用"){
    while(!className("android.widget.ImageView").desc("目录").exists()){
      log("当前包名111："+currentPackage())
      log("当前活动1111："+currentActivity())
      if("com.tencent.weread.ReaderFragmentActivity"==currentActivity()){
        gesture(10, [device.width*3/4,device.height/2],[device.width*3/4,device.height*1/4]);
        log("触发上滑寻找获取目录按钮")
          // click(device.width/2, device.height/2)
          sleep(200)
      }
    }
  }else if(截图应用 == "微信Eink应用"){
    while(!className("android.widget.TextView").text("目录").exists()){
      log("当前包名111："+currentPackage())
      log("当前活动1111："+currentActivity())
      if("com.tencent.weread.ReaderFragmentActivity"==currentActivity()){
          click(device.width/2, device.height/2)
          sleep(200)
      }
    }
  }

  log("已找到目录按钮")


  // if(截图应用 == "微信应用"){

  // }else if(截图应用 == "微信Eink应用"){
    
  // }

  if(截图应用 == "微信应用"){
    //显示目录页面
    while(!className("android.widget.TextView").id("chapter_page_number").exists()){
      className("android.widget.ImageView").id("reader_chapter").desc("目录").findOnce().click()
      log("微信读书点击目录按钮")
      sleep(200)
    }

  }else if(截图应用 == "微信Eink应用"){
    //显示目录页面
    while(!className("android.widget.TextView").id("chapter_page_number").exists()){
      className("android.view.ViewGroup").id("reader_chapter").desc("目录").findOnce().click()
      log("微信读书Eink点击目录按钮")
      sleep(200)
    }
  }

  log("进入微信读书目录页面")
  let allDataList = [];
  let lastPageDataList = [];

  if(flag == 1){
    var i =0
    if(截图应用 == "微信应用"){
      while(!className("android.widget.TextView").text("扉页").exists()){
        className("androidx.recyclerview.widget.RecyclerView").depth(2).findOnce().scrollBackward()
        log("上滑一次")
      }
      log("回到顶部")
      
    }else if(截图应用 == "微信Eink应用"){
      if(className("android.widget.TextView").text("去顶部").exists()){
        className("android.widget.TextView").text("去顶部").findOnce().parent().click()
        log("点击去顶部Eink")
        sleep(500)
      }
      log("回到顶部Eink")
    }      
  }

  var 到底部标志 = 0
  while(到底部标志<2){
      let pageNewDataList = [];
      let pageDataList = [];
      let 目录全部重复标志 = 0
      if(截图应用 == "微信应用"){
        
        var c1 = className("android.widget.TextView").id("chapter_name").find();
        var c2 = className("android.widget.TextView").id("chapter_page_number").find();

        if((!c1.empty())&& (!c2.empty())){
          目录全部重复标志 = 0
          c1.forEach(function(item,index){
            let dataList = [];
            dataList[0] = item.text()
            dataList[1] = c2.get(index).text()
            

            let 目录重复标志 = 0
            
            lastPageDataList.forEach(function(item, index){
              if(lastPageDataList[index][1] == dataList[1]){
                  目录重复标志 = 1
                  log("出现重复目录")
              }
            })
            if(目录重复标志 == 0){
              目录全部重复标志 = 1
              pageNewDataList.push(dataList)
              log("dataList:"+dataList)
            }
            pageDataList.push(dataList)
          })
        }
        
          
      }else if(截图应用 == "微信Eink应用"){
        className("androidx.recyclerview.widget.RecyclerView").depth(2).findOnce().children().forEach(function(child1){
          let dataList = [];
          child1.children().forEach(function(child2,index){
            log("child2:"+child2)
            if(child2 != null){
              dataList[index]=child2.text()
            }
              
          })
          let 目录重复标志 = 0
          lastPageDataList.forEach(function(item, index){
              if(lastPageDataList[index][1] == dataList[1]){
                  目录重复标志 = 1
              }
          })
          if(目录重复标志 == 0){
            pageNewDataList.push(dataList)
            log("不重复的dataList:"+dataList)
          }
          pageDataList.push(dataList)
          
      })
      }

      lastPageDataList = pageDataList
      pageNewDataList.forEach(function(item) {
          目录文件.writeline(item);
          log("写了一行目录："+item)
      });

      if(截图应用 == "微信应用"){
        if(目录全部重复标志 == 0){
          到底部标志++
        }
        className("androidx.recyclerview.widget.RecyclerView").depth(2).findOnce().scrollForward()
        log("下滑一次")
        sleep(2000)

      }else if(截图应用 == "微信Eink应用"){
        className("android.view.ViewGroup").id("bottombar_next").findOnce().click()
        sleep(100)
        if(className("android.widget.TextView").text("去顶部").exists()){
          到底部标志++
          log("到底部了呢")
        }
      }
  }
  
  目录文件.close();
  log("目录获取完成")
  
  if(截图应用 == "微信应用"){
    className("android.widget.ImageView").id("reader_chapter").desc("目录").findOnce().click()
    log("微信读书点击目录按钮")

  }else if(截图应用 == "微信Eink应用"){
    click(className("android.view.ViewGroup").id("reader_chapter").desc("目录").findOnce().bounds().centerX(),className("android.view.ViewGroup").id("reader_chapter").desc("目录").findOnce().bounds().centerY())
    log("微信读书点击目录按钮2")
  }

  sleep(200)

}

EinkRead.删除全部其他脚本 = function(当前脚本){
  var 所有脚本=engines.all()
  for(let i = 0;i<所有脚本.length;i++){
      var 删除脚本=所有脚本.pop()
      log("删除脚本:"+删除脚本)
      if (删除脚本 != 当前脚本){
          删除脚本.forceStop()
      }
      
  }
}

EinkRead.打开微信读书 = function(截图应用){

  if(截图应用 == "微信应用"){
    log("微信读书打开成功状态："+app.launch("com.tencent.weread"))
    while("com.tencent.weread"!=currentPackage()&&("com.tencent.weread.WeReadFragmentActivity"!=currentActivity())&&("com.tencent.weread.ReaderFragmentActivity"!=currentActivity())){
      sleep(1000)
      log("当前包名2："+currentPackage())
      log("当前活动2："+currentActivity())
    }
  }
  else if(截图应用 == "微信Eink应用"){   
    log("微信读书打开成功状态："+app.launch("com.tencent.weread.eink"))
    while("com.tencent.weread.eink"!=currentPackage()&&("com.tencent.weread.WeReadFragmentActivity"!=currentActivity())&&("com.tencent.weread.ReaderFragmentActivity"!=currentActivity())){
      sleep(1000)
      log("当前包名2："+currentPackage())
      log("当前活动2："+currentActivity())
    }
  }
  sleep(500)
  log("当前包名2："+currentPackage())
  log("当前活动2："+currentActivity())


}

EinkRead.进入书架界面 = function(截图应用){
  log("准备进入微信读书书架界面")

  while(!className("android.widget.TextView").text("书架").exists()){
      log("不在微信读书主界面")
      log("当前包名："+currentPackage())
      log("当前活动："+currentActivity())
      if("com.tencent.weread.ReaderFragmentActivity"==currentActivity()){
        log("上滑手势操作一次")
        swipe(device.width/2, device.height/2,device.width/2,device.height/10,10)
        sleep(200)
      }

      if(截图应用 == "微信应用"){
        if(className("android.widget.ImageButton").id("reader_top_backbutton").exists()){
          className("android.widget.ImageButton").id("reader_top_backbutton").findOnce().click()
          log("返回数据  微信读书")
        }
      }
      else if(截图应用 == "微信Eink应用"){
        log("将到按返回键")
        if(className("android.widget.TextView").text("返回").exists()){
          log("找到返回键")
          className("android.widget.TextView").text("返回").findOnce().parent().click()
          log("返回")
        }
      }

      sleep(200)
  }
  if(截图应用 == "微信应用"){
    className("android.widget.TextView").text("书架").depth(2).findOnce().parent().click()
    log("书架按钮点击 微信读书")
  }
  else if(截图应用 == "微信Eink应用"){
    className("android.widget.TextView").text("书架").findOnce().parent().click()
    log("书架按钮点击 微信读书Eink")
  }
  log("进入微信读书书架页面")
  sleep(500)


}

EinkRead.打开书籍 = function(choiceBookindex,截图应用){

  if(截图应用 == "微信应用"){
    var 当前书籍名 = className("android.widget.TextView").depth(6).id("book_grid_item_name").findOnce(choiceBookindex).text().replace(/\[icon\]/ig,"");
    className("android.widget.RelativeLayout").depth(5).findOnce(choiceBookindex).click()
  }
  else if(截图应用 == "微信Eink应用"){
    var tt = className("android.widget.TextView").id("book_grid_item_name").findOnce(choiceBookindex)
    var 当前书籍名 =tt.text().replace(/\[icon\]/ig,"")+"eink";
    tt.parent().click()
  }

  log("已打开书籍，当前书籍名为："+当前书籍名)
  return 当前书籍名
}

EinkRead.设置为已下载模式 = function(){
  while(!className("android.widget.TextView").text("已下载").exists()){
    log("书籍下载未完成")
    sleep(500)
  }
  log("设置为已下载模式")

}

EinkRead.显示想法设置 = function(显示想法按钮Value){

  while(!className("android.widget.TextView").depth(14).text("书友笔记").exists()){
    log("未找到书记笔记按钮")
    sleep(1000)
  }
  className("android.widget.TextView").depth(14).text("书友笔记").findOnce().parent().click()


  if(显示想法按钮Value == true){
    while(!className("android.widget.TextView").depth(14).text("隐藏想法").exists()){
      if(className("android.widget.TextView").depth(14).text("显示想法").exists()){
        className("android.view.ViewGroup").depth(13).id("reader_top_review").findOnce().click()
        sleep(2000)
      }
      sleep(500)
    }
    log("设置为显示想法")
  }else{
    while(!className("android.widget.TextView").depth(14).text("显示想法").exists()){
      if(className("android.widget.TextView").depth(14).text("隐藏想法").exists()){
        className("android.view.ViewGroup").depth(13).id("reader_top_review").findOnce().click()
        sleep(2000)
      }
      sleep(500)
    }
    log("设置为不显示想法")
  }

}


EinkRead.跳转到首页 = function(currentPage,显示想法按钮Value,截图应用){
  
  log("开始准备跳转到首页")
  if(截图应用 == "微信应用"){
    while(!className("android.widget.ImageView").id("reader_progress").desc("进度").exists()){
      log("不存在进度按钮")
        log("当前包名："+currentPackage())
        log("当前活动："+currentActivity())
        if("com.tencent.weread.ReaderFragmentActivity"==currentActivity()){
          
          gesture(10, [device.width*3/4,device.height/2],[device.width*3/4,device.height*1/4]);
          log("已触发进度按钮")
           // swipe(device.width/2, device.height/2,device.width/2,device.height*3/8,50)
            // click(device.width/2, device.height/2)
            sleep(500)
        }
    }
    // EinkRead.设置为已下载模式()
    // EinkRead.显示想法设置(显示想法按钮Value)
   
    while(!className("android.widget.ImageButton").depth(1).id("reader_previous_chapter").exists()){
       className("android.widget.ImageView").id("reader_progress").desc("进度").findOnce().click()
       sleep(200)
   }
   log("进入微信读书书本进度条页面")


   if(currentPage == 1){
     var target = className("android.widget.FrameLayout").desc("ThumbView").findOnce()
     var target2 = className("android.widget.FrameLayout").id("reader_page_rangebar").findOnce()

     swipe((target.bounds().left+target.bounds().right)/2, (target.bounds().top+target.bounds().bottom)/2, 
     target2.bounds().left, target2.bounds().top, 100)
     sleep(200)
     log("进入书籍首页")
   }

   click(device.width/2, device.height/2)

  }
  else if(截图应用 == "微信Eink应用"){
    while(!className("android.widget.TextView").text("进度").exists()){
      log("不存在进度按钮")
      log("当前包名："+currentPackage())
      log("当前活动："+currentActivity())
      if("com.tencent.weread.ReaderFragmentActivity"==currentActivity()){
        log("上滑触发进度按钮")
          //swipe(device.width*3/4,device.height/2,device.width*3/4,device.height*1/4,100)
        gesture(10, [device.width*3/4,device.height/2],[device.width*3/4,device.height*1/4]);
        sleep(500)
      }
    }
    EinkRead.设置为已下载模式()

   
   while(!className("android.widget.ImageButton").id("reader_previous_chapter").exists()){
      log("进度条不存在，点击地面显示进度条按键")
       className("android.view.ViewGroup").id("reader_progress").desc("进度").findOnce().click()
       sleep(200)
   }
   log("进入微信读书书本进度条页面")

   if(currentPage == 1){
    while(!className("android.widget.TextView").id("reader_page_info_chapter").text("扉页").exists()){
      className("android.widget.ImageButton").id("reader_previous_chapter").findOnce().click()
    }
    log("已跳转到书籍首页")

   }
   click(device.width/2, device.height/2)
  }

  sleep(200)
}

EinkRead.获取当前书籍存储路径 = function(当前书籍名,书籍目录包含日期){
  var currentDate = new Date()
  var realMonth = currentDate.getMonth()+1
  if(书籍目录包含日期 == true){
    var dirName = "/storage/emulated/0/Books/"+currentDate.getFullYear()+"-"+realMonth+"-"+currentDate.getDate()+"/"+当前书籍名+"/"  
  }
  else{
    var dirName = "/storage/emulated/0/Books/"+当前书籍名+"/"  
  }
  files.ensureDir(dirName)
  log("获取当前书籍存储路径并创建文件夹成功:"+dirName)
  return dirName
}

EinkRead.打开截图权限 = function(){
  if(!images.getScreenCaptureOptions()){
    requestScreenCapture()
    sleep(200)
    log("打开截图权限成功")
  }


}

EinkRead.保存一页图片 = function(dirName,imgType,currentPage,img,图片压缩比Value){
  if(currentPage<10){
      var page ="0000"+currentPage
  }else if(currentPage<100){
      var page ="000"+currentPage
  }else if(currentPage<1000){
      var page ="00"+currentPage
  }else if(currentPage<10000){
      var page ="0"+currentPage
  }
  var currentFilePath = dirName + page+"." + imgType
  images.save(img, currentFilePath, imgType,图片压缩比Value)
  log("正在截图中，保存页："+currentPage)
}

EinkRead.保存图片功能 = function(delayValue,currentPage,ocrcurrentPage,dirName,imgType,img,图片压缩比Value){
  press(device.width-60,device.height-60,10)
  sleep(delayValue*5)
  if(currentPage == 0){
      currentPage = ocrcurrentPage
  } 
  if(((ocrcurrentPage-currentPage)<=2) &&((ocrcurrentPage-currentPage)>=0)){
    currentPage = ocrcurrentPage
  }

  EinkRead.保存一页图片(dirName,imgType,currentPage,img,图片压缩比Value)
  currentPage++
  log("截图完后ocrcurrentPage:"+ocrcurrentPage)
  //log("截图完后ocrendPage:"+ocrendPage)

  return currentPage

}

EinkRead.截整本书 = function(tokenRes,dirName,currentPage,baiduOCR,图片压缩比Value,ocr,delayValue,截图应用){
  log("开始截整本书")
  var imgType = "jpg"
  var ocrcurrentPage = 0
  var ocrendPage = -1
  var tempPage = 0
  var lastOcrValue = null
  var lastPage = 0

//   app.startActivity({
//     packageName: "com.hzc.picker",
//     className: "com.hzc.picker.MainActivity",
//     extras:{"extra_data":dirName
//     },
//     root: true
// });

  var 连续ocr失败计数 = 0
  while(ocrcurrentPage != ocrendPage){

    //获取是否存在下方提醒浮窗
    if(截图应用 == "微信应用"){
      var target1 = className("android.widget.ImageView").depth(14).desc("文字").id("yq").exists()
      var target2 = className("android.widget.TextView").depth(12).id("text_first_line_view").exists()
    }
    else if(截图应用 == "微信Eink应用"){
      var target1 = className("android.view.ViewGroup").desc("字体").id("reader_font").exists()
      var target2 = className("android.widget.TextView").id("text_first_line_view").exists()
    }

      if(!target1){
          if(!target2){

           // if(className("android.widget.TextView").depth(16).text("全书完").exists())

              var img = captureScreen()
              sleep(20)
              var clip = images.clip(img, device.width - 300, device.height - 120, 300, 120);
              sleep(20);
              //  var currentFilePath = dirName + currentPage+"-1." + imgType
              //  images.save(clip, currentFilePath, imgType,100)
              //var result = baiduOCR.BaiDu_ocr(tokenRes, clip, false,imgType);

              var results = ocr.ocrImage(clip);
              log("results:"+results);
              log("lastOcrValue:"+lastOcrValue)
              log("currentPage:"+currentPage)

            //   var results = ocr.detect(clip.getBitmap(),0.5)
            //   console.info("过滤前结果数："+results.size())
            //   results = ocr.filterScore(results,0.5,0.5,0.5)
            //     //输出最终结果
            //     for(var i=0;i<results.size();i++){ 
            //     var re = results.get(i)
            //     log("结果:"+i+"  文字:"+re.text+"  位置:"+re.frame+"  角度类型:"+re.angleType)
            //     log("区域置信度:"+re.dbScore+"  角度置信度:"+re.angleScore+"  文字置信度:"+re.crnnScore+"\n")
            //     }
 
              clip.recycle()
              sleep(20);
      
              //第一页
              if(currentPage == 1){
                  press(device.width-60,device.height-60,10)
                  sleep(500)
                  EinkRead.保存一页图片(dirName,imgType,currentPage,img,图片压缩比Value)
                  currentPage++
              }

              //if(result.words_result_num>0)
              if(results.success == true)
              {
                  连续ocr失败计数 = 0
                  //var integralContent = result.words_result[0].words.split('/');
                  var integralContent = results.text.split('/');
                  if(integralContent.length>=2){
                      log("integralContent.length:"+integralContent.length)
                    ocrcurrentPage = parseInt(integralContent[0])
                    ocrendPage = parseInt(integralContent[1])
                    log("ocrcurrentPage:"+ocrcurrentPage)
                    log("currentPage:"+currentPage)
                    log("ocrendPage:"+ocrendPage)
                  //最后一页
                    
                    if(className("android.widget.TextView").depth(16).text("全书完").exists()){
                      ocrendPage = ocrcurrentPage
                      currentPage = ocrcurrentPage    

                      EinkRead.保存一页图片(dirName,imgType,currentPage,img,图片压缩比Value)
                      
                      log("开始获取目录-2")
                      EinkRead.获取目录(dirName,1,截图应用)
                      log("获取了全书完文字后获取目录成功")
                      log("获取目录后ocrcurrentPage:"+ocrcurrentPage)
                      log("获取目录后ocrendPage:"+ocrendPage)

                      className("android.view.ViewGroup").id("reader_bottom_back_button").depth(13).desc("返回").findOnce().click()
                      log("目录获取完成，从最后一页返回书架页面")


                      break

                    }else if(ocrcurrentPage == ocrendPage ){
                      if(currentPage == ocrcurrentPage){
                        log("开始获取目录-1")
                        EinkRead.获取目录(dirName,1,截图应用)
                        log("截图ocr匹配获取目录成功")
                      }
                    }


                    if((currentPage-ocrcurrentPage) == 1){
                        EinkRead.向前翻页()
                        currentPage = currentPage-2
                    }
                    else{
                      currentPage = EinkRead.保存图片功能(delayValue,currentPage,ocrcurrentPage,dirName,imgType,img,图片压缩比Value)
                    }
                  }
                  else{
                    if(lastOcrValue ==results.text){
                      lastOcrValue=null
                      currentPage = EinkRead.保存图片功能(delayValue,currentPage,ocrcurrentPage,dirName,imgType,img,图片压缩比Value)
                    }
                    log("currentPage2:"+currentPage)
                    
                    ocrcurrentPage = 0
                    ocrendPage = 99999
                  }
                  lastOcrValue= results.text
                  
              } 
              else{
                log("未发现ocr数据 currentPage:"+currentPage)
                log("未发现ocr数据 lastOcrValue:"+lastOcrValue)
                log("未发现ocr数据，暂停中。。。")
                连续ocr失败计数++
                if(连续ocr失败计数 >=3){
                  连续ocr失败计数 = 0
                  currentPage = EinkRead.保存图片功能(delayValue,currentPage,ocrcurrentPage,dirName,imgType,img,图片压缩比Value)
                }
                sleep(1000)            
              }     
              
          }
          else{
            log("各间断底面弹窗提醒，暂停截图中。。。")
            sleep(500)
          }
      }
      else{
          log("有下框选择按钮出现，暂停截图中。。。")
          sleep(500)
      }

      //截图过程中跳转到其他页面
      if("com.tencent.weread.ReaderFragmentActivity"!=currentActivity()){
          log("currentActivity:"+currentActivity())
          if("com.stardust.autojs.core.image.capture.ScreenCaptureRequestActivity"!=currentActivity()){           
              toastLog("截图脚本强制退出")
              exit(); // 有异常退出，结束脚本
          }
          
      }
  }

  log("完成截一本书")

}

EinkRead.获取书架列表 = function(截图应用){
    var bookinfoList = []
    var bookList = []

    if(截图应用 == "微信应用"){
      var 书架列表 = className("android.widget.RelativeLayout").depth(21).clickable().find()
    }
    else if(截图应用 == "微信Eink应用"){
      var 书架列表 = className("android.widget.RelativeLayout").depth(16).clickable().find()
    }
    
    书架列表.forEach(function(item, index){
        bookList = []
        item.children().forEach(function(item2, index2){
            if(item2.className()=="android.widget.TextView"){
              //  log(item2.text().replace(/\[icon\]/ig,""))
                bookList.push(item2.text().replace(/\[icon\]/ig,""))
                bookList.push(item2.parent().bounds())
                bookinfoList.push(bookList)
               // log("控件在屏幕上的范围:"+item2.parent().bounds())
            }
        })
    })
    log("bookinfoList:"+bookinfoList)
    log("获取书架数据成功")

    return bookinfoList
}

module.exports = EinkRead;