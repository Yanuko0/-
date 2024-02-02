const audio = document.querySelector("audio");
// 獲取頁面上的 <audio> 元素
const musicBtn = document.querySelector(".musicButton");
const container = document.querySelector(".container");
const mask = document.querySelector(".mask");
const downloadBtn = document.querySelector(".downloadButton");
const download = document.querySelector(".download");
const cancleBtn = document.querySelector(".cancle");
const loginBtn = document.querySelector(".loginButton");
const login = document.querySelector(".login");
const loginCancleBtn = document.querySelector(".login .loginCancle");
const itemBox = document.querySelector(".itemBox");
const navMark = document.querySelector(".navMark");
const items = document.querySelectorAll(".items a");
const dataList = document.querySelectorAll(".dataList ul li");

// 兩個相似的 URL 或文件路徑是為了提供冗餘或備用選擇。這樣的做法可能是為了
// 應對不同情況下的文件路徑變化，以確保在某些情況下依然可以正確引用到相應的資源。
let playMusicURL = "../images/nav/playMusic.png";
let playMusicURL2 = "../../images/nav/playMusic.png";
// 即為 let playMusicURL = true; let playMusicURL2 = false 因為後面路徑不存在
let pauseMusicURL = "../images/nav/paused.png";
let pauseMusicURL2 = "../../images/nav/paused.png";
let audioURL1 = "../audios/bgm.mp3";
let audioURL2 = "../../audios/bgm.mp3";
let audioURL3 = "../audios/video-play.mp3";

let documentHeight = document.documentElement.scrollHeight;
// scrollHeight只讀屬性 代表只能讀取不能更改    這邊是獲取了整個文檔的高度。
// document.documentElement 表示文檔的根元素，即 <html> 元素。
let play = false;
// 初始值false關閉

function preventMouseWheelScroll(event) {
  event.preventDefault();
}
// 阻止鼠標滾輪事件的默認行為
// 定義了一個名為 preventMouseWheelScroll 的函數，這個函數接受一個參數 event
// 代表一個事件對象。函數內部的 event.preventDefault() 是用來阻止該事件的默認行為。

function checkFileExists(path) {
  // path 就是你要檢查的文件的位置信息是否存在。
  let xhr = new XMLHttpRequest();
  // 創建一個 XMLHttpRequest 對象，它可以用來發送 HTTP 請求。
  // XMLHttpRequest 提供了在前端和伺服器進行數據交換的基本能力，
  // 而在這個例子中，它被用來檢查文件是否存在
  xhr.open("HEAD", path, false);
  // 設置請求的方法為 "HEAD"，這表示僅獲取文件的頭部信息而不是整個文件 頭部指標題
  // 第三個參數是用來指定請求是同步還是非同步，這裡使用的是 false，表示同步
  xhr.send();
  // 發送同步請求，等待伺服器回應
  return xhr.status !== 404;
  // 如果伺服器回應的狀態碼不是 404，代表文件存在，返回 true；否則返回 false
}



// 檢查音樂檔案存在性：

if (checkFileExists(audioURL1)) {
  audio.src = audioURL1;
  // 將音樂播放器 (audio 元素) 的 src 屬性設置為 audioURL1
}else {
  audio.src = audioURL2;
}

audio.volume = 0.8;
audio.pause();
// 設定音樂的初始音量為 0.3，並將音樂暫停。

/*--------------------------------------------------------------------*/
//  左上角原神左邊的播放按鈕  實現音樂的播放和暫停，同時更新播放按鈕的圖片
/*--------------------------------------------------------------------*/
musicBtn.addEventListener("click", function () {
  // 當下載按鈕被點擊時執行的函數
  play = !play;
    // 切換 play 變量的值，每次點擊都切換播放狀態
  if (play) {
    // 如果目前處於播放狀態
    audio.play();
       // 播放音樂
    if (checkFileExists(playMusicURL)) {
      // 檢查播放音樂的圖片是否存在
      musicBtn.src = playMusicURL;
      // 如果存在，設定播放按鈕的圖片為 playMusicURL
    }
    else {
      musicBtn.src = playMusicURL2;
    }
  }
  else {
    audio.pause();
     // 如果目前處於暫停狀態
    if (checkFileExists(pauseMusicURL)) {
       // 檢查暫停音樂的圖片是否存在
      musicBtn.src = pauseMusicURL;
       // 如果存在，設定播放按鈕的圖片為 pauseMusicURL
    }
    else {
      musicBtn.src = pauseMusicURL2;
    }
  }
});

audio.addEventListener("ended", function() {
  this.currentTime = 0; // 重設播放時間到開始，實現循環播放
  
  // 切換到下一首歌曲
  if (checkFileExists(audioURL3)) {
    audio.src = audioURL3;
  } else if (checkFileExists(audioURL1)) {
    audio.src = audioURL1;
  } else {
    // 如果都不存在，使用預設的音樂檔案，這裡使用 audioURL2
    audio.src = audioURL2;
  }
  audio.play();
});



/*-------------------------------------------*/
//------- 點擊下載遊戲按鈕後彈出的窗口-------------//
/*-------------------------------------------*/
downloadBtn.addEventListener("click", function (e) {
  // 當下載按鈕被點擊時執行的函數  // 這裡的 e 就是事件對象，你可以使用它來獲取事件相關的資訊

  //設置一個整頁面的遮罩
  mask.style.height = `${documentHeight}px`;
    // 設置一個遮罩層的高度，通常是整個頁面的高度
  mask.style.visibility = "visible";
    // 使遮罩層可見
    
  window.addEventListener("mousewheel", preventMouseWheelScroll, { passive: false });
  window.addEventListener("DOMMouseScroll", preventMouseWheelScroll, { passive: false });
  // mousewheel 是用於處理滑鼠滾輪事件的事件型別
  // DOMMouseScroll 是用於處理在舊版 Firefox 瀏覽器中的滑鼠滾輪事件的事件型別
  // 監聽滾動事件，防止滾動滑輪滾動，即禁止頁面滾動 打開下載視窗時讓畫面不會因滑鼠滾輪滾動
  download.style.visibility = "visible";
  // 顯示下載相關的元素，可能是下載窗口或 UI
});

/*----------------------------------------------*/
/*----------------登入按鈕-----------------------*/
/*----------------------------------------------*/
loginBtn.addEventListener("click", function () {
   // 當登入按鈕被點擊時執行以下程式碼
  mask.style.height = `${documentHeight}px`;
  // 設定遮罩層的高度為整個文件的高度
  mask.style.visibility = "visible";
  // 設定遮罩層可見
  window.addEventListener("mousewheel", preventMouseWheelScroll, { passive: false });
   // 在視窗上添加對滑鼠滾輪事件的監聽，防止滾動網頁
  window.addEventListener("DOMMouseScroll", preventMouseWheelScroll, { passive: false });
    // 在視窗上添加對Firefox滑鼠滾輪事件的監聽，防止滾動網頁
  login.style.visibility = "visible";
    // 設定登入視窗可見
});

/*------------------------------------------------------------*/
/*------------------當點擊遮罩時  隱藏下載跟登入區塊------------*/
/*------------------------------------------------------------*/
mask.addEventListener("click", function (e) {
   // 當遮罩層被點擊時執行以下程式碼
  mask.style.height = `0px`;
  // 設定遮罩層的高度為0，隱藏遮罩層
  mask.style.visibility = "hidden";
   // 隱藏遮罩層
  window.removeEventListener("mousewheel", preventMouseWheelScroll, { passive: false });
  // 移除對滑鼠滾輪事件的監聽，允許滾動網頁
  window.removeEventListener("DOMMouseScroll", preventMouseWheelScroll, { passive: false });
  // 移除對Firefox滑鼠滾輪事件的監聽，允許滾動網頁
  download.style.visibility = "hidden";
    // 隱藏下載區塊
  login.style.visibility = "hidden";
  // 隱藏登入區塊
});

/*-------------------------------------------------------------*/
/*--------------------下載遊戲的X圖案---------------------------*/
/*-------------------------------------------------------------*/
cancleBtn.addEventListener("click", function (e) {
  // 當取消按鈕被點擊時執行以下程式碼
  mask.style.height = `0px`;
   // 設定遮罩層的高度為0，隱藏遮罩層
  mask.style.visibility = "hidden";
    // 隱藏遮罩層
  window.removeEventListener("mousewheel", preventMouseWheelScroll, { passive: false });
    // 移除對滑鼠滾輪事件的監聽，允許滾動網頁
  window.removeEventListener("DOMMouseScroll", preventMouseWheelScroll, { passive: false });
  // 移除對Firefox滑鼠滾輪事件的監聽，允許滾動網頁
  download.style.visibility = "hidden";
  // 隱藏下載區塊
});

/*-----------------------------------------------------------------*/
/*-----------------------登入頁面裡面的X圖案-------------------------*/
/*-----------------------------------------------------------------*/
loginCancleBtn.addEventListener("click", function (e) {
  // 當登入取消按鈕被點擊時執行以下程式碼
  mask.style.height = `0px`;
  // 設定遮罩層的高度為0，隱藏遮罩層
  mask.style.visibility = "hidden";
  // 隱藏遮罩層
  window.removeEventListener("mousewheel", preventMouseWheelScroll, { passive: false });
    // 移除對滑鼠滾輪事件的監聽，允許滾動網頁
  window.removeEventListener("DOMMouseScroll", preventMouseWheelScroll, { passive: false });
  // 移除對Firefox滑鼠滾輪事件的監聽，允許滾動網頁
  login.style.visibility = "hidden";
  // 隱藏登入區塊
  // console.log(123);
});


/*----------------------------------------------------*/
//           首頁上方的DIV用來做的藍色線特效
/*----------------------------------------------------*/

// navMark首頁上面藍藍的DIV 當成特效
for (let i = 0; i < items.length; i++) {
   // 這是一個迴圈，從i=0開始，當i小於items.length時，執行下面的程式碼，i遞增
  items[i].addEventListener("mouseenter", function() {
    // 為每個items[i]（a元素）添加滑鼠進入事件的監聽器，當滑鼠進入時執行以下程式碼
    // mouseenter 是一種滑鼠事件，當滑鼠指針進入元素時觸發
    let distance = items[i].offsetLeft - navMark.offsetLeft;
    // 計算items[i]的左側位置與navMark的左側位置之間的距離
    // offsetParent 元素的左側距離（即水平偏移量）navMark.offsetLeft;為0因為是第一項 省略結果會一樣   
    navMark.style.transform = `translateX(${distance}px)`;
    // 將navMark的transform屬性設定為translateX(${distance}px)，實現水平位移效果
    // transform 是一個 CSS 屬性，用於對元素進行變換（轉換）。它可以應用於元素的平移、旋轉、縮放和傾斜等操作，
  });
}

//讓navMark首頁上面藍藍的DIV特效 新增一個效果 當滑鼠離開時會移動到第一項
itemBox.addEventListener("mouseleave", function() {
  // 當滑鼠離開 .itemBox 元素時觸發
  navMark.style.transform = `translateX(0px)`;
  // 重設 navMark 元素的水平位置（translateX）為 0，回到原始位置（左側邊緣）
});


// 暫時取消不用的功能

// dataList[0].addEventListener("click", function() {
//   // 當 dataList 中的第一個元素被點擊時執行以下程式碼
//   location.href= "./intro.html";
//   // 將網頁的位置設置為 "./intro.html"，即導向到 intro.html 頁面
// });

// dataList[1].addEventListener("click", function() {
//   location.href= "./world.html";
// });

// dataList[2].addEventListener("click", function() {
//   location.href= "./note.html";
// });

// dataList[3].addEventListener("click", function() {
//   location.href= "./comic.html";
// });