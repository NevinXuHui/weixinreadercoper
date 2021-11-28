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
  var currentDirContent = dirName + "目录.txt";
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
  //显示目录页面
  while(!className("androidx.recyclerview.widget.RecyclerView").depth(17).exists()){
      className("android.widget.TextView").text("目录").depth(16).findOnce().parent().click()
      sleep(200)
  }
  log("进入微信读书目录页面")
  let allDataList = [];
  let lastPageDataList = [];

  if(flag == 1){
      if(className("android.widget.TextView").depth(17).text("去顶部").exists()){
          className("android.widget.TextView").depth(17).text("去顶部").findOnce().parent().click()
          sleep(500)
      }
      log("回到顶部")
  }
  var 到底部标志 = 0
  while(到底部标志<2){
      let pageDataList = [];
      className("androidx.recyclerview.widget.RecyclerView").findOnce().children().forEach(function(child1){
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
      className("android.view.ViewGroup").id("fm").depth(15).findOnce().click()
      sleep(100)
      if(className("android.widget.TextView").depth(17).text("去顶部").exists()){
          到底部标志++
      }
  }
  //log("pageDataList:"+pageDataList)
  
  目录文件.close();
  log("目录获取完成")
  
  click(className("android.widget.TextView").text("目录").depth(16).findOnce().bounds().left,className("android.widget.TextView").text("目录").depth(16).findOnce().bounds().top)
  click(device.width/2, device.height/2)
  sleep(200)

}

EinkRead.删除全部其他脚本 = function(){
  var 所有脚本=engines.all()
  var 当前脚本 = engines.myEngine();
  for(let i = 0;i<所有脚本.length;i++){
      var 删除脚本=所有脚本.pop()
      log("删除脚本:"+删除脚本)
      if (删除脚本 != 当前脚本){
          删除脚本.forceStop()
      }
      
  }
}


EinkRead.打开微信读书 = function(){
  log("微信读书打开成功状态："+app.launch("com.tencent.weread.eink"))
  while("com.tencent.weread.eink"!=currentPackage()){
      sleep(200)
  }
  log("当前包名："+currentPackage())
  log("当前活动："+currentActivity())
}

EinkRead.进入书架界面 = function(){
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
      if(className("android.widget.TextView").text("返回").exists()){
          className("android.widget.TextView").text("返回").findOnce().parent().click()
          log("返回")
      }
      sleep(200)
  }
  className("android.widget.TextView").text("书架").findOnce().parent().parent().click()
  log("进入微信读书书架页面")
  sleep(500)
}

EinkRead.打开书籍 = function(){
  var 当前书籍名 = className("android.widget.TextView").depth(17).id("d8").findOnce().text().replace(/\[icon\]/ig,"");
  className("android.widget.RelativeLayout").depth(17).findOnce().parent().click()
  
  log("当前书籍名："+当前书籍名)
  return 当前书籍名
}

EinkRead.跳转到首页 = function(currentPage){
  if(currentPage == 1){
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
      log("进入书籍首页")

  }

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

EinkRead.截整本书 = function(tokenRes,dirName,currentPage,baiduOCR,图片压缩比Value){
  log("开始截图")
  var imgType = "jpg"
  var ocrcurrentPage = 0
  var ocrendPage = -1
  var tempPage = 0
  while(ocrcurrentPage != ocrendPage){
      if(!className("android.view.ViewGroup").depth(15).desc("字体").id("uz").exists()){
          if(!className("android.widget.TextView").depth(14).text("前路虽长，尤可期许").exists()){

              var img = captureScreen()
              sleep(20)
              var clip = images.clip(img, device.width - 300, device.height - 120, 300, 120);
              sleep(20);
              //  var currentFilePath = dirName + currentPage+"-1." + imgType
              //  images.save(clip, currentFilePath, imgType,100)
              var result = baiduOCR.BaiDu_ocr(tokenRes, clip, false,imgType);
              clip.recycle()
              log("result")
              log(result)
              sleep(20);
      
              //第一页
              if(currentPage == 1){
                  press(device.width-60,device.height-60,10)
                  sleep(500)
                  EinkRead.保存一页图片(dirName,imgType,currentPage,img,图片压缩比Value)
                  currentPage++
              }
              if(result.words_result_num>0)
              {
                  var integralContent = result.words_result[0].words.split('/');
                  ocrcurrentPage = integralContent[0];
                  ocrendPage = integralContent[1]
                  log("ocrcurrentPage:"+ocrcurrentPage)
                  log("currentPage:"+currentPage)
                  //最后一页
                  if(integralContent[0] == integralContent[1] ){
                      if(currentPage == integralContent[0]){
                          获取目录(dirName,1)
                      }
                  }

                  
                  if(currentPage-ocrcurrentPage == 1){
                      向前翻页()
                      currentPage--
                  }
                  else{
                      press(device.width-60,device.height-60,10)
                      sleep(100)
                      if(currentPage == 0){
                          currentPage = ocrcurrentPage
                      }
                      EinkRead.保存一页图片(dirName,imgType,currentPage,img)
                      currentPage++
                  }

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
              
          }
      }
      else{
          log("暂停截图中。。。")
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

module.exports = EinkRead;