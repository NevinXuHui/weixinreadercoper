var EinkRead = {};

EinkRead.向前翻页 = function() {
  gesture(10, [device.width  / 4, device.height / 2], [device.width / 2, device.height / 2]);
  sleep(500);

}

EinkRead.向后翻页 = function() {
  gesture(10, [device.width*3 / 4, device.height / 2], [device.width / 2, device.height / 2]);
  sleep(500);
}


EinkRead.获取目录 = function(dirName,flag){
  var currentDirContent = dirName + "目录";
  //创建目录文件
  files.createWithDirs(currentDirContent);
  var 目录文件 = open(currentDirContent, "w");
  //显示底下框
  while(!className("android.widget.TextView").text("目录").exists()){
      log("当前包名111："+currentPackage())
      log("当前活动1111："+currentActivity())
      if("com.tencent.weread.ReaderFragmentActivity"==currentActivity()){
          click(device.width/2, device.height/2)
          sleep(200)
      }
  }
  log("显示目录按钮")

  //显示目录页面
  while(!className("android.widget.TextView").depth(16).id("chapter_page_number").exists()){
      className("android.widget.TextView").text("目录").depth(14).findOnce().parent().click()
      log("点击目录按钮")
      sleep(200)
  }
  log("进入微信读书目录页面")
  let allDataList = [];
  let lastPageDataList = [];

  if(flag == 1){

      if(className("android.widget.TextView").text("去顶部").exists()){
          className("android.widget.TextView").text("去顶部").findOnce().parent().click()
          log("点击去顶部")
          sleep(500)
      }
      log("回到顶部")
  }
  var 到底部标志 = 0
  while(到底部标志<2){
      let pageDataList = [];
      className("androidx.recyclerview.widget.RecyclerView").depth(14).findOnce(1).children().forEach(function(child1){
          let dataList = [];
          child1.children().forEach(function(child2,index){
              dataList[index]=child2.text()
          })
          let 目录重复标志 = 0
          lastPageDataList.forEach(function(item, index){
              if(lastPageDataList[index][1] == dataList[1]){
                  目录重复标志 = 1
              }
          })
          if(目录重复标志 == 0){
              pageDataList.push(dataList)

          }
          log("dataList:")
          log(dataList)
          
      })
      lastPageDataList = pageDataList
      pageDataList.forEach(function(item) {
          目录文件.writeline(item);
      });
      className("android.view.ViewGroup").id("bottombar_next").depth(13).findOnce().click()
      sleep(100)
      if(className("android.widget.TextView").depth(15).text("去顶部").exists()){
          到底部标志++
      }
  }
  //log("pageDataList:"+pageDataList)
  
  目录文件.close();
  log("目录获取完成")
  
  click(className("android.widget.TextView").text("目录").depth(14).findOnce().bounds().left,className("android.widget.TextView").text("目录").depth(14).findOnce().bounds().top)
  click(device.width/2, device.height/2)
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
  while(!className("android.widget.TextView").text("书架").exists()){
      log("不在微信读书主界面")
      log("当前包名："+currentPackage())
      log("当前活动："+currentActivity())
      if("com.tencent.weread.ReaderFragmentActivity"==currentActivity()){
          log("device.width:"+device.width/2)
          log("device.height:"+device.height/10)
          // click(device.width/2, device.height/2)
          swipe(device.width/2, device.height/2,device.width/2,device.height/10,10)
          sleep(200)
      }

      if(截图应用 == "微信应用"){
        if(className("android.widget.ImageButton").id("a0V").exists()){
          className("android.widget.ImageButton").id("a0V").findOnce().click()
          log("返回数据  微信读书")
        }
      }
      else if(截图应用 == "微信Eink应用"){
        if(className("android.widget.TextView").text("返回").exists()){
          className("android.widget.TextView").text("返回").findOnce().parent().click()
          log("返回")
        }
      }

      sleep(200)
  }
  if(截图应用 == "微信应用"){
    className("android.widget.TextView").text("书架").depth(12).findOnce().parent().click()
    log("书架按钮点击 微信读书")
  }
  else if(截图应用 == "微信Eink应用"){
    className("android.widget.TextView").text("书架").findOnce().parent().parent().click()
    log("书架按钮点击 微信读书Eink")
  }
  log("进入微信读书书架页面")
  sleep(500)


}

EinkRead.打开书籍 = function(choiceBookindex,截图应用){

  if(截图应用 == "微信应用"){
    var 当前书籍名 = className("android.widget.TextView").depth(22).id("ho").findOnce(choiceBookindex).text().replace(/\[icon\]/ig,"");
    className("android.widget.RelativeLayout").depth(21).findOnce(choiceBookindex).click()
  }
  else if(截图应用 == "微信Eink应用"){
    var 当前书籍名 = className("android.widget.TextView").depth(15).id("book_grid_item_name").findOnce(choiceBookindex).text().replace(/\[icon\]/ig,"");
    className("android.widget.RelativeLayout").depth(14).findOnce(choiceBookindex).click()
  }

  log("当前书籍名："+当前书籍名)
  return 当前书籍名
}

EinkRead.设置为已下载模式 = function(){
  while(!className("android.widget.TextView").depth(14).text("已下载").exists()){
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
  

  if(截图应用 == "微信应用"){
    while(!className("android.widget.ImageView").id("yo").desc("进度").exists()){
      log("不存在进度按钮")
        log("当前包名："+currentPackage())
        log("当前活动："+currentActivity())
        if("com.tencent.weread.ReaderFragmentActivity"==currentActivity()){
          log("触发进度按钮")
           // swipe(device.width/2, device.height/2,device.width/2,device.height*3/8,50)
            click(device.width/2, device.height/2)
            sleep(500)
        }
    }
    // EinkRead.设置为已下载模式()
    // EinkRead.显示想法设置(显示想法按钮Value)
   
    while(!className("android.widget.ImageButton").depth(12).id("a04").exists()){
       className("android.widget.ImageView").id("yo").desc("进度").findOnce().click()
       sleep(200)
   }
   log("进入微信读书书本进度条页面")


   if(currentPage == 1){
     var target = className("android.widget.FrameLayout").depth(13).findOnce()
     var target2 = className("android.widget.FrameLayout").id("a08").depth(12).findOnce()

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
          log("触发进度按钮")
           // swipe(device.width/2, device.height/2,device.width/2,device.height*3/8,50)
            click(device.width/2, device.height/2)
            sleep(500)
        }
    }
    EinkRead.设置为已下载模式()
   // EinkRead.显示想法设置(显示想法按钮Value)
   
   while(!className("android.widget.ImageButton").depth(13).id("reader_previous_chapter").exists()){
       className("android.widget.TextView").text("进度").depth(14).findOnce().parent().click()
       sleep(200)
   }
   log("进入微信读书书本进度条页面")
   if(currentPage == 1){
     swipe((className("android.widget.FrameLayout").depth(14).findOnce().bounds().left+className("android.widget.FrameLayout").depth(14).findOnce().bounds().right)/2, (className("android.widget.FrameLayout").depth(14).findOnce().bounds().top+className("android.widget.FrameLayout").depth(14).findOnce().bounds().bottom)/2, 
     className("android.widget.FrameLayout").depth(13).id("reader_page_rangebar").findOnce().bounds().left, className("android.widget.FrameLayout").depth(13).id("reader_page_rangebar").findOnce().bounds().top, 100)
     sleep(200)
     log("进入书籍首页")
   }
   click(device.width/2, device.height/2)
  }


      sleep(200)
}

EinkRead.获取当前书籍存储路径 = function(当前书籍名){
  var currentDate = new Date()
  var realMonth = currentDate.getMonth()+1
  var dirName = "/storage/emulated/0/Books/"+currentDate.getFullYear()+"-"+realMonth+"-"+currentDate.getDate()+"/"+当前书籍名+"/"  
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
  log("开始截图")
  var imgType = "jpg"
  var ocrcurrentPage = 0
  var ocrendPage = -1
  var tempPage = 0
  var lastOcrValue = null
  var lastPage = 0

  var 连续ocr失败计数 = 0
  while(ocrcurrentPage != ocrendPage){

    if(截图应用 == "微信应用"){
      var target1 = className("android.widget.ImageView").depth(14).desc("文字").id("yq").exists()
      var target2 = className("android.widget.TextView").depth(12).id("text_first_line_view").exists()
    }
    else if(截图应用 == "微信Eink应用"){
      var target1 = className("android.view.ViewGroup").depth(13).desc("字体").id("reader_font").exists()
      var target2 = className("android.widget.TextView").depth(12).id("text_first_line_view").exists()
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
              //log("result")
              //log(result)
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
                    
                    if(className("android.widget.TextView").depth(14).text("全书完").exists()){
                      ocrendPage = ocrcurrentPage
                      currentPage = ocrcurrentPage                      
                      EinkRead.获取目录(dirName,1)
                      log("获取了全书完文字后获取目录成功")
                      log("获取目录后ocrcurrentPage:"+ocrcurrentPage)
                      log("获取目录后ocrendPage:"+ocrendPage)
                    }else if(ocrcurrentPage == ocrendPage ){
                      if(currentPage == ocrcurrentPage){
                        EinkRead.获取目录(dirName,1)
                        log("截图ocr匹配获取目录成功")
                      }
                    }


                    if((currentPage-ocrcurrentPage) == 1){
                        EinkRead.向前翻页()
                        currentPage = currentPage-2
                    }
                    else{
                      currentPage = EinkRead.保存图片功能(delayValue,currentPage,ocrcurrentPage,dirName,imgType,img,图片压缩比Value)
                      // press(device.width-60,device.height-60,10)
                      // sleep(delayValue*5)
                      // if(currentPage == 0){
                      //     currentPage = ocrcurrentPage
                      // } 
                      // if(((ocrcurrentPage-currentPage)<=2) &&((ocrcurrentPage-currentPage)>=0)){
                      //   currentPage = ocrcurrentPage
                      // }

                      // EinkRead.保存一页图片(dirName,imgType,currentPage,img,图片压缩比Value)
                      // currentPage++
                      // log("截图完后ocrcurrentPage:"+ocrcurrentPage)
                      // log("截图完后ocrendPage:"+ocrendPage)
                    }
                  }
                  else{
                    if(lastOcrValue ==results.text){
                      lastOcrValue=null
                      currentPage = EinkRead.保存图片功能(delayValue,currentPage,ocrcurrentPage,dirName,imgType,img,图片压缩比Value)
                      // press(device.width-60,device.height-60,10)
                      // sleep(1000)
                      // if(currentPage == 0){
                      //     currentPage = ocrcurrentPage
                      // }
                      // if(((ocrcurrentPage-currentPage)<=2)&&((ocrcurrentPage-currentPage)>=0)){
                      //   currentPage = ocrcurrentPage
                      // }
                      // EinkRead.保存一页图片(dirName,imgType,currentPage,img,图片压缩比Value)
                      // log("currentPage:"+currentPage)
                      // currentPage++
                    }
                    log("currentPage2:"+currentPage)
                    
                    ocrcurrentPage = 0
                    ocrendPage = 99999
                  }
                  lastOcrValue= results.text

                  // if(ocrcurrentPage==currentPage){
                  //     press(device.width-60,device.height-60,10)
                  //     sleep(100)
                  //     保存一页图片(dirName,imgType,currentPage,img)
                  //     currentPage++
                  // }
                  // else if(ocrcurrentPage>currentPage){
                      
                  //     if(currentPage == tempPage){
                  //         press(device.width-60,device.height-60,10)
                  //         sleep(100)
                  //         保存一页图片(dirName,imgType,currentPage,img)
                  //         currentPage++
                  //         tempPage = 0
                  //     }
                  //     else{
                  //         向前翻页()
                  //         log("当前页面太大")
                  //         tempPage = currentPage
                  //         currentPage--
                  //     }                       
                  // }
                  // else if(ocrcurrentPage<currentPage){
                  //     向后翻页()
                  //     log("当前页面太小")
                  //    // currentPage++
                  // }
                  
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

      if("com.tencent.weread.ReaderFragmentActivity"!=currentActivity()){
          log("currentActivity:"+currentActivity())
          if("com.stardust.autojs.core.image.capture.ScreenCaptureRequestActivity"!=currentActivity()){           
              toastLog("截图脚本强制退出")
              exit(); // 有异常退出，结束脚本
          }
          
      }
  }


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