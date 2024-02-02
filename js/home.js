/* ------------------------------------------------------------------------------------------------------------------------- */
/* |                                             第二區新聞news                                                                | */
/* ------------------------------------------------------------------------------------------------------------------------- */

const newsPics = document.querySelector(".newsPics");
// 選取 .newsPics 元素並存放在變數 newsPics 中

// const newsPicsLis = document.querySelectorAll(".newsPics ul li");

const newsPicsUl = document.querySelector(".newsPics ul");
// 選取 .newsPics ul 元素並存放在變數 newsPicsUl 中
let indexSlider = 0;
// 初始化輪播圖的索引值
let timerSlider;
// 初始化輪播圖的計時器

/*------------------------------------------------------------------*/
//                          輪播圖自動放映                           //
/*------------------------------------------------------------------*/

function StartSlider() {
  // 定義輪播圖自動放映的函數
  timerSlider = setInterval(function(){
     // 設定定時器，每秒執行以下程式碼
    if(indexSlider === 4) {
      // 如果目前的索引為4（最後一張），則重設索引為0，實現循環
      indexSlider = 0;
    }
    indexSlider++;
    // 將索引遞增，切換到下一張輪播圖
    document.querySelector(".newsPics .activeLi").classList.remove("activeLi");
     // 移除目前被標記為活動狀態（.activeLi）的輪播圖項目
    //  add(className): 新增一個類別到元素的類別列表中。
    //  remove(className): 從元素的類別列表中移除指定的類別。
    //  toggle(className): 切換指定的類別，存在則刪除，不存在則新增。
    //  contains(className): 檢查元素的類別列表是否包含指定的類別。
    document.querySelector(`.newsPics ul li:nth-child(${indexSlider})`).classList.add("activeLi");
    // 將下一張輪播圖標記為活動狀態 選中的 li 元素加上 activeLi 類別。nth-child(n)是選擇第n個元素
    //${indexSlider} 是一種在字串中嵌入變數值的方式 $是在字串中動態地插入變數的值。
    newsPics.style.backgroundImage = `url("../images/home/slider/slider${indexSlider}.jpg")`;
    // 更改輪播圖容器的背景圖片，顯示下一張輪播圖
  }, 1000);
  // 設定的定時器每1000毫秒（1秒）觸發一次
}
// 調用
StartSlider();
 

/*-------------------------------*/
// 滑鼠移動至newsPics區域時觸發事件 /
/*-------------------------------*/

newsPics.addEventListener("mouseenter", function(e) {
    // 當滑鼠進入 newsPics 元素時觸發的事件
  clearInterval(timerSlider);
  // 清除之前設定的輪播計時器，停止自動輪播
});

newsPics.addEventListener("mouseleave", function(e) {
  // 當滑鼠離開 newsPics 元素時觸發的事件
  StartSlider();
   // 觸發自動輪播的函式 StartSlider()
});

/*-----------------------------------------------------*/
/*         當ul裡面的圖為數字n時點擊後打開連結           */
/*-----------------------------------------------------*/

newsPics.addEventListener("click", function(e) {
  // 當 newsPics 元素被點擊時觸發的事件
  switch(indexSlider) {
    // 根據目前的索引值進行不同的操作
    case 1:
      window.open("https://www.youtube.com/watch?v=WaNJ20OY8Bs");
      // 在新視窗中打開指定的 YouTube 影片鏈接
      break;
    case 2:
      window.open("https://www.youtube.com/watch?v=rFJOBl0MHts");
      break;
    case 3:
      window.open("https://www.youtube.com/watch?v=znHhRYBmfck");
      break;
    case 4:
      window.open("https://www.youtube.com/watch?v=L53gb0UK3V4");
      break;
    default:
      break;
      // indexSlider 的值不是1、2、3或4，就什麼都不做。
      // 如果你確定不會出現其他情況，可以省略 default，
      // 不過有時為了程式的健壯性，你可能會選擇加上 default，以處理未知的情況。
  }
});

// 手動點擊輪播圖
// for(let index = 0; index < newsPicsLis.length; index++) {
//   newsPicsLis[index].addEventListener("click", function(e) {
//     document.querySelector(".newsPics .activeLi").classList.remove("activeLi");
//     document.querySelector(`.newsPics ul li:nth-child(${index+1})`).classList.add("activeLi");
//     newsPics.style.backgroundImage = `url("../images/slider/slider${index+1}.jpg")`;
//   });
// }


/*-----------------------------------------------*/
// 點擊輪播圖中的某個項目時，切換到相應的輪播圖。     /
/*-----------------------------------------------*/

newsPicsUl.addEventListener("click", function(e) {
  // 為 newsPicsUl 元素的點擊事件添加監聽器
  if(e.target.tagName === "LI") {
     // 如果被點擊的元素是 LI（列表項） e.target.tagName 返回的是大寫的標籤名
    //  為了確保更好的兼容性，慣例上常使用大寫字母來表示HTML標籤名
    let index = e.target.id.match(/\d+/g);
    // 從被點擊的 LI 元素的 id 中提取數字，使用正則表達式 /\d+/g
    // e.target 指的是觸發事件的元素。
    // .match() 是一個用於在字符串中搜尋指定模式的方法。
    // \d：匹配一個數字字符。  只想匹配英文字母，可以使用 [a-zA-Z] 英文字母並且是一個或多個，可以使用 /[a-zA-Z]+/g
    // +：表示匹配前面的元素一次或多次。
    // g：全局匹配模式，找到所有匹配而不是在找到第一個匹配後停止。 如果單純只有/g會沒有作用

    indexSlider = Number(index);
    // 把提取的數字轉換成數字類型，更新輪播圖的索引
    // 如果直接使用 Number()，並沒有提供要轉換的值，它會返回 0

    // 更換輪播圖
    document.querySelector(".newsPics .activeLi").classList.remove("activeLi");
    // 移除當前活動的輪播圖項目的 activeLi 類別
    // classList 中的 list 實際上指的是元素的類別（class）的集合
    e.target.classList.add("activeLi");
    // 為被點擊的 LI 元素添加 activeLi 類別，標記為當前活動的項目
    newsPics.style.backgroundImage = `url("../images/home/slider/${e.target.id}.jpg")`;
     // 根據被點擊的 LI 元素的 id 更新輪播圖的背景圖片
  }
  // 阻止傳播(冒泡)
  e.stopPropagation();
  // 阻止事件冒泡，避免同時觸發 newsPics 上的點擊事件
});

// 避免冒泡影響其他元素： 當你在某個元素上設置了點擊事件，
// 而你不希望這個點擊事件影響到該元素的父元素或其他祖先元素時，可以使用 e.stopPropagation();。
// 防止重複觸發： 如果同一元素上綁定了多個相同類型的事件監聽器，
// 且你只想執行其中一個，可以使用 e.stopPropagation(); 阻止事件冒泡，以確保只執行最內層的監聽器。


/* ------------------------------------------------------------------------------------------------------------------------- */
/* |                                             第三區 城鎮區                                                                | */
/* ------------------------------------------------------------------------------------------------------------------------- */

// 這邊是為了將點擊後跳轉到所選的城鎮區域不同 會跳轉到不同城鎮

const cityLis = document.querySelectorAll(".city ul li");
// 選擇所有擁有 ".city ul li" 選擇器的元素，存儲在 cityLis 變數
sessionStorage.setItem("cityNum", 0);
// 初始化城市編號為 0，並存儲在 sessionStorage 中的 "cityNum" 鍵下
// essionStorage 是一種瀏覽器提供的 Web 存儲機制， 同的頁面之間共享數據。
// 在這個例子中，它被用來存儲和檢索 cityNum 的值， 同的頁面或刷新後保持城市選擇的狀態。

for(let i = 0; i<cityLis.length; i ++) {
  // 迴圈：遍歷所有城市列表的 LI 元素
  cityLis[i].addEventListener("click", function() {
     // 為每個城市 LI 元素添加點擊事件監聽器
    sessionStorage.setItem("cityNum", i);
    // 當 LI 元素被點擊時，將該 LI 元素的索引 i 存儲在 sessionStorage 中的 "cityNum" 鍵下
  });
}


// const cityPs = document.querySelectorAll(".city p");

// for(let index = 0; index < cityPs.length; index++) {
//   cityPs[index].addEventListener("mouseenter", function() {
//     document.querySelector(`.city li:nth-child(${index+1}) .characterImg`).style.opacity = 1;
//     document.querySelector(`.city li:nth-child(${index+1}) .underline`).style.opacity = 1;
//     document.querySelector(`.city li:nth-child(${index+1}) .cityBg`).style.transform = "translateZ(100px)";
//     document.querySelector(`.city li:nth-child(${index+1})`).style.border = "5px solid white";
//   });
//   cityPs[index].addEventListener("mouseleave", function() {
//     document.querySelector(`.city li:nth-child(${index+1}) .characterImg`).style.opacity = 0;
//     document.querySelector(`.city li:nth-child(${index+1}) .underline`).style.opacity = 0;
//     document.querySelector(`.city li:nth-child(${index+1}) .cityBg`).style.transform = "translateZ(0)";
//     document.querySelector(`.city li:nth-child(${index+1})`).style.border = "none";
//   });
// }

/* ------------------------------------------------------------------------------------------------------------------------- */
/* |                                         側邊欄位追蹤我們事件                                                          | */
/* ------------------------------------------------------------------------------------------------------------------------- */

const contactBox = document.querySelector(".contactBox");
const contactBtn = document.querySelector(".contactBtn");
const contactBtnImg = document.querySelector(".contactBtnImg");
let turn = false;
// 創建一個變數 turn 並初始化為 false，用於追蹤聯絡框的狀態

/*-------------------------*/
// 滾動畫面到一半時側邊攔出現  /
/*-------------------------*/

document.addEventListener("scroll", function() {
  // 整個文檔（document）上添加一個滾動事件監聽器。當頁面滾動時，這個監聽器內的程式碼將被執行。
  if(document.documentElement.scrollTop >= (window.innerHeight/30)) {
    contactBox.style.opacity = "1";
    contactBox.style.visibility = "visible";
     // 檢查頁面滾動的位置。如果滾動位置超過窗口高度的一半，則將聯絡框的透明度設置為 "1"，使其可見。
  }
  else {
    // contactBox.style.visibility = "hidden";
    contactBox.style.opacity = "1";
    // 添加.visibility = "hidden";.visibility = "visible" 來避免最上面隱藏時會有點擊功能
    // 如果滾動位置未超過窗口高度的一半，則將聯絡框的透明度設置為 "0"，使其隱藏。
  }
});


contactBtn.addEventListener("click", function() {
  // 當 contactBtn 元素被點擊時，執行以下程式碼
  if(!turn) {
    // 如果 turn 的值為 false，表示目前聯絡框是收合的狀態
    turn = true;
    // 將 turn 設置為 true，表示聯絡框將要展開
    contactBtnImg.style.transform = "rotateZ(-180deg)";
    // 將 contactBtnImg 元素進行旋轉，使其箭頭指向上方 180deg 表示逆時針旋轉180度
    contactBox.style.transform = "translate(100%, -50%)";
    // 將 contactBox 元素進行水平平移，使其從畫面右側滑入 
    // translate(100%, -50%)，這部分表示對元素進行平移（移動）的變換.
    // 100% 表示在水平方向上將元素往右平移，距離為元素自身寬度的 100%。
    // -50% 表示在垂直方向上將元素往上平移，距離為元素自身高度的 50%。
  }
  else {
    // 如果 turn 的值為 true，表示目前聯絡框是展開的狀態
    turn = false;
     // 將 turn 設置為 false，表示聯絡框將要收合
    contactBtnImg.style.transform = "rotateZ(0deg)";
    // 將 contactBtnImg 元素進行旋轉，使其箭頭指向下方
    contactBox.style.transform = "translate(0%, -50%)";
    // 將 contactBox 元素進行水平平移，使其回到原來的位置
  }
});