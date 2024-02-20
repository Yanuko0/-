/* ------------------------------------------------------------------------------------------------------------------------- */
/* |                                                    角色初始化針對主頁點擊城鎮跳轉後的城鎮頁面                                                           | */
/* ------------------------------------------------------------------------------------------------------------------------- */

const cityNum = parseInt(sessionStorage.getItem("cityNum"));

(function charInit(num) {
  document.querySelector(".cityActive").classList.remove("cityActive");
     // 移除之前被激活的城市
  document.querySelector(`.cities li:nth-child(${num+1})`).classList.add("cityActive");
   // 为新的城市添加激活状态
  document.querySelector(".cityBgActive").classList.remove("cityBgActive");
   // 移除之前被激活的城市背景
  document.querySelector(`.city${num+1}`).classList.add("cityBgActive");
   // 为新的城市背景添加激活状态
})(cityNum);

/* ------------------------------------------------------------------------------------------------------------------------- */
/* |                               左側城鎮的選擇會跳到對應的城鎮                                                           | */
/* ------------------------------------------------------------------------------------------------------------------------- */

// 監聽城市列表（`.cities`）的點擊事件

const citiesUl = document.querySelector(".cities");

citiesUl.addEventListener("click", function (e) {
  if (e.target.tagName === "LI" && e.target !== citiesUl.children[5]) {
    // 確保點擊的目標元素是列表項目（LI），並且不是城市列表的最後一個項目
    document.querySelector(".cityActive").classList.remove("cityActive");
    // 移除之前被激活的城市
    e.target.classList.add("cityActive");
    // 為點擊的城市列表項目添加 `.cityActive` 類，標記為被激活的城市

     // 移除之前被激活的城市背景

    document.querySelector(".cityBgActive").classList.remove("cityBgActive");
     // 根據點擊的城市列表項目，選擇對應的城市背景元素並為其添加 `.cityBgActive` 類，標記為被激活的城市背景
    switch (e.target) {
      case citiesUl.children[0]:
        document.querySelector(".city1").classList.add("cityBgActive");
        break;
      case citiesUl.children[1]:
        document.querySelector(".city2").classList.add("cityBgActive");
        break;
      case citiesUl.children[2]:
        document.querySelector(".city3").classList.add("cityBgActive");
        break;
      case citiesUl.children[3]:
        document.querySelector(".city4").classList.add("cityBgActive");
        break;
      case citiesUl.children[4]:
        document.querySelector(".city5").classList.add("cityBgActive");
        break;
      default:
        break;
    }
  }
});

/* ------------------------------------------------------------------------------------------------------------------------- */
/* |                                                     city1                                                             | */
/* ------------------------------------------------------------------------------------------------------------------------- */

const leftBtn1 = document.querySelector(".city1 .charLeftBtn");
// 找到城市1的左箭頭按鈕元素
const RightBtn1 = document.querySelector(".city1 .charRightBtn");
// 找到城市1的右箭頭按鈕元素
const chars1 = document.querySelectorAll(".city1 .charList li")
// 找到城市1的所有角色列表項目元素
const charSelectList1 = document.querySelector(".city1 .charSelectList");
// 找到城市1的角色選擇框元素
const charSelects1 = document.querySelectorAll(".city1 .charSelectList li");
// 找到城市1的所有角色選擇框列表項目元素

let charIndex1 = 0;
// 設置角色索引初始值

leftBtn1.addEventListener("click", function () {
  // 監聽城市1的左箭頭按鈕點擊事件
  charIndex1--;
   // 減少角色索引
  if (charIndex1 < 0) {
    // 如果索引小於0，則將索引設置為列表項目長度減1，並計算位移距離以顯示最後5個角色
    charIndex1 = charSelects1.length - 1;
    // 將角色索引設置為城市1角色選擇框列表的最後一個項目的索引
    let dis = charSelects1[charIndex1 - 5].offsetLeft - charSelects1[0].offsetLeft
    // 計算位移距離，將最後一個可見的角色選擇框與第一個角色選擇框之間的水平偏移量
    charSelectList1.style.transform = `translateX(-${dis}px)`;
    // 將角色選擇框列表的 transform 屬性設置為 translateX(-${dis}px)，以左滾動 dis 像素的距離
  }
  else if (charIndex1 === 0) {
     // 如果索引為0，則將位移距離設置為0
    charSelectList1.style.transform = `translateX(0px)`;
  }
  else {
     // 否則計算位移距離以顯示下一個角色
    let dis = charSelects1[charIndex1 + 1].offsetLeft - charSelects1[charIndex1].offsetLeft
    charSelectList1.style.transform = `translateX(-${dis}px)`;
  }

  document.querySelector(".CardActive").classList.remove("CardActive");
  // 移除先前被激活的角色選擇框
  charSelects1[charIndex1].classList.add("CardActive");
   // 標記當前角色選擇框為激活狀態
  document.querySelector(".charActive").classList.remove("charActive");
  // 移除先前被激活的角色
  chars1[charIndex1].classList.add("charActive");
    // 標記當前角色為激活狀態
});

RightBtn1.addEventListener("click", function () {
  // 監聽城市1的右箭頭按鈕點擊事件
  charIndex1++;
  // 增加角色索引
  if (charIndex1 === charSelects1.length) {
     // 如果索引等於列表項目長度，則將索引設置為0，並計算位移距離以顯示第一個角色
    charIndex1 = 0;
    let dis = charSelects1[0].offsetLeft
    charSelectList1.style.transform = `translateX(-${dis}px)`;
  }
  else if (charIndex1 + 5 <= charSelects1.length) {
     // 如果索引加上5小於等於列表項目長度，則計算位移距離以顯示下一個角色
    let dis = charSelects1[charIndex1].offsetLeft - charSelects1[charIndex1 - 1].offsetLeft;
    charSelectList1.style.transform = `translateX(-${dis}px)`;
  }

  document.querySelector(".CardActive").classList.remove("CardActive");
    // 移除先前被激活的角色選擇框
  charSelects1[charIndex1].classList.add("CardActive");
  // 標記當前角色選擇框為激活狀態
  document.querySelector(".charActive").classList.remove("charActive");
  // 移除先前被激活的角色
  chars1[charIndex1].classList.add("charActive");
   // 標記當前角色為激活狀態
});

for (let i = 0; i < charSelects1.length; i++) {
  // 遍歷城市1的所有角色選擇框列表項目，並為每個項目添加點擊事件監聽器
  charSelects1[i].addEventListener("click", function () {
    charIndex1 = i;
     // 設置角色索引為被點擊的列表項目的索引
    document.querySelector(".CardActive").classList.remove("CardActive");
       // 移除先前被激活的角色選擇框
    charSelects1[charIndex1].classList.add("CardActive");
    // 標記當前角色選擇框為激活狀態
    document.querySelector(".charActive").classList.remove("charActive");
    // 移除先前被激活的角色
    chars1[charIndex1].classList.add("charActive");
       // 標記當前角色為激活狀態

    if (charIndex1 > 2) {
          // 如果角色索引大於2，則計算位移距離以顯示點擊的角色
      let dis = charSelects1[charIndex1].offsetLeft - charSelects1[charIndex1 - 1].offsetLeft;
         // 計算位移距離，以顯示點擊的角色
      charSelectList1.style.transform = `translateX(-${dis}px)`;
      // 將角色選擇框列表的 transform 屬性設置為 translateX(-${dis}px)，實現向左滾動效果
      console.log(charIndex1);
    }
    else {
        // 否則將位移距離設置為0
      charSelectList1.style.transform = `translateX(0px)`;
    }
  });
}

/* ------------------------------------------------------------------------------------------------------------------------- */
/* |                                                     city2                                                             | */
/* ------------------------------------------------------------------------------------------------------------------------- */

const leftBtn2 = document.querySelector(".city2 .charLeftBtn");
const RightBtn2 = document.querySelector(".city2 .charRightBtn");
const chars2 = document.querySelectorAll(".city2 .charList li")
const charSelectList2 = document.querySelector(".city2 .charSelectList");
const charSelects2 = document.querySelectorAll(".city2 .charSelectList li");

let charIndex2 = 0;

leftBtn2.addEventListener("click", function () {
  charIndex2--;
  if (charIndex2 < 0) {
    charIndex2 = charSelects2.length - 1;
    let dis = charSelects2[charIndex2 - 5].offsetLeft - charSelects2[0].offsetLeft
    charSelectList2.style.transform = `translateX(-${dis}px)`;
  }
  else if (charIndex2 === 0) {
    charSelectList2.style.transform = `translateX(0px)`;
  }
  else {
    let dis = charSelects2[charIndex2 + 1].offsetLeft - charSelects2[charIndex2].offsetLeft
    charSelectList2.style.transform = `translateX(-${dis}px)`;
  }

  document.querySelectorAll(".CardActive")[1].classList.remove("CardActive");
  charSelects2[charIndex2].classList.add("CardActive");
  document.querySelectorAll(".charActive")[1].classList.remove("charActive");
  chars2[charIndex2].classList.add("charActive");
});

RightBtn2.addEventListener("click", function () {
  charIndex2++;
  if (charIndex2 === charSelects2.length) {
    charIndex2 = 0;
    let dis = charSelects2[0].offsetLeft
    charSelectList2.style.transform = `translateX(-${dis}px)`;
  }
  else if (charIndex2 + 5 <= charSelects2.length) {
    let dis = charSelects2[charIndex2].offsetLeft - charSelects2[charIndex2 - 1].offsetLeft;
    charSelectList2.style.transform = `translateX(-${dis}px)`;
  }

  document.querySelectorAll(".CardActive")[1].classList.remove("CardActive");
  charSelects2[charIndex2].classList.add("CardActive");
  document.querySelectorAll(".charActive")[1].classList.remove("charActive");
  chars2[charIndex2].classList.add("charActive");
});

for (let i = 0; i < charSelects2.length; i++) {
  charSelects2[i].addEventListener("click", function () {
    charIndex2 = i;
    document.querySelectorAll(".CardActive")[1].classList.remove("CardActive");
    charSelects2[charIndex2].classList.add("CardActive");
    document.querySelectorAll(".charActive")[1].classList.remove("charActive");
    chars2[charIndex2].classList.add("charActive");

    if (charIndex2 > 2) {
      let dis = charSelects2[charIndex2].offsetLeft - charSelects2[charIndex2 - 1].offsetLeft;
      charSelectList2.style.transform = `translateX(-${dis}px)`;
      console.log(charIndex2);
    }
    else {
      charSelectList2.style.transform = `translateX(0px)`;
    }
  });
}

/* ------------------------------------------------------------------------------------------------------------------------- */
/* |                                                     city3                                                             | */
/* ------------------------------------------------------------------------------------------------------------------------- */

const leftBtn3 = document.querySelector(".city3 .charLeftBtn");
const RightBtn3 = document.querySelector(".city3 .charRightBtn");
const chars3 = document.querySelectorAll(".city3 .charList li")
const charSelectList3 = document.querySelector(".city3 .charSelectList");
const charSelects3 = document.querySelectorAll(".city3 .charSelectList li");

let charIndex3 = 0;

leftBtn3.addEventListener("click", function () {
  charIndex3--;
  if (charIndex3 < 0) {
    charIndex3 = charSelects3.length - 1;
    let dis = charSelects3[charIndex3 - 5].offsetLeft - charSelects3[0].offsetLeft
    charSelectList3.style.transform = `translateX(-${dis}px)`;
  }
  else if (charIndex3 === 0) {
    charSelectList3.style.transform = `translateX(0px)`;
  }
  else {
    let dis = charSelects3[charIndex3 + 1].offsetLeft - charSelects3[charIndex3].offsetLeft
    charSelectList3.style.transform = `translateX(-${dis}px)`;
  }

  document.querySelectorAll(".CardActive")[2].classList.remove("CardActive");
  charSelects3[charIndex3].classList.add("CardActive");
  document.querySelectorAll(".charActive")[2].classList.remove("charActive");
  chars3[charIndex3].classList.add("charActive");
});

RightBtn3.addEventListener("click", function () {
  charIndex3++;
  if (charIndex3 === charSelects3.length) {
    charIndex3 = 0;
    let dis = charSelects3[0].offsetLeft
    charSelectList3.style.transform = `translateX(-${dis}px)`;
  }
  else if (charIndex3 + 5 <= charSelects3.length) {
    let dis = charSelects3[charIndex3].offsetLeft - charSelects3[charIndex3 - 1].offsetLeft;
    charSelectList3.style.transform = `translateX(-${dis}px)`;
  }

  document.querySelectorAll(".CardActive")[2].classList.remove("CardActive");
  charSelects3[charIndex3].classList.add("CardActive");
  document.querySelectorAll(".charActive")[2].classList.remove("charActive");
  chars3[charIndex3].classList.add("charActive");
});

for (let i = 0; i < charSelects3.length; i++) {
  charSelects3[i].addEventListener("click", function () {
    charIndex3 = i;
    document.querySelectorAll(".CardActive")[2].classList.remove("CardActive");
    charSelects3[charIndex3].classList.add("CardActive");
    document.querySelectorAll(".charActive")[2].classList.remove("charActive");
    chars3[charIndex3].classList.add("charActive");

    if (charIndex3 > 2) {
      let dis = charSelects3[charIndex3].offsetLeft - charSelects3[charIndex3 - 1].offsetLeft;
      charSelectList3.style.transform = `translateX(-${dis}px)`;
    }
    else {
      charSelectList3.style.transform = `translateX(0px)`;
    }
  });
}

/* ------------------------------------------------------------------------------------------------------------------------- */
/* |                                                     city4                                                             | */
/* ------------------------------------------------------------------------------------------------------------------------- */

const leftBtn4 = document.querySelector(".city4 .charLeftBtn");
const RightBtn4 = document.querySelector(".city4 .charRightBtn");
const chars4 = document.querySelectorAll(".city4 .charList li")
const charSelectList4 = document.querySelector(".city4 .charSelectList");
const charSelects4 = document.querySelectorAll(".city4 .charSelectList li");

let charIndex4 = 0;

leftBtn4.addEventListener("click", function () {
  charIndex4--;
  if (charIndex4 < 0) {
    charIndex4 = charSelects4.length - 1;
    let dis = charSelects4[charIndex4 - 5].offsetLeft - charSelects4[0].offsetLeft
    charSelectList4.style.transform = `translateX(-${dis}px)`;
  }
  else if (charIndex4 === 0) {
    charSelectList4.style.transform = `translateX(0px)`;
  }
  else {
    let dis = charSelects4[charIndex4 + 1].offsetLeft - charSelects4[charIndex4].offsetLeft
    charSelectList4.style.transform = `translateX(-${dis}px)`;
  }

  document.querySelectorAll(".CardActive")[3].classList.remove("CardActive");
  charSelects4[charIndex4].classList.add("CardActive");
  document.querySelectorAll(".charActive")[3].classList.remove("charActive");
  chars4[charIndex4].classList.add("charActive");
});

RightBtn4.addEventListener("click", function () {
  charIndex4++;
  if (charIndex4 === charSelects4.length) {
    charIndex4 = 0;
    let dis = charSelects4[0].offsetLeft
    charSelectList4.style.transform = `translateX(-${dis}px)`;
  }
  else if (charIndex4 + 5 <= charSelects4.length) {
    let dis = charSelects4[charIndex4].offsetLeft - charSelects4[charIndex4 - 1].offsetLeft;
    charSelectList4.style.transform = `translateX(-${dis}px)`;
  }

  document.querySelectorAll(".CardActive")[3].classList.remove("CardActive");
  charSelects4[charIndex4].classList.add("CardActive");
  document.querySelectorAll(".charActive")[3].classList.remove("charActive");
  chars4[charIndex4].classList.add("charActive");
});

for (let i = 0; i < charSelects4.length; i++) {
  charSelects4[i].addEventListener("click", function () {
    charIndex4 = i;
    document.querySelectorAll(".CardActive")[3].classList.remove("CardActive");
    charSelects4[charIndex4].classList.add("CardActive");
    document.querySelectorAll(".charActive")[3].classList.remove("charActive");
    chars4[charIndex4].classList.add("charActive");

    if (charIndex4 > 2) {
      let dis = charSelects4[charIndex4].offsetLeft - charSelects4[charIndex4 - 1].offsetLeft;
      charSelectList4.style.transform = `translateX(-${dis}px)`;
    }
    else {
      charSelectList4.style.transform = `translateX(0px)`;
    }
  });
}

/* ------------------------------------------------------------------------------------------------------------------------- */
/* |                                                     city5                                                             | */
/* ------------------------------------------------------------------------------------------------------------------------- */

const chars5 = document.querySelectorAll(".city5 .charList li")
// 找到城市5的所有角色列表項目元素
const charSelectList5 = document.querySelector(".city5 .charSelectList");
// 找到城市5的角色選擇框元素
const charSelects5 = document.querySelectorAll(".city5 .charSelectList li");
// 找到城市5的所有角色選擇框列表項目元素

let charIndex5 = 0;
// 設置角色索引初始值

for (let i = 0; i < charSelects5.length; i++) {
  // 遍歷城市5的所有角色選擇框列表項目，並為每個項目添加點擊事件監聽器
  charSelects5[i].addEventListener("click", function () {
    charIndex5 = i;
       // 設置角色索引為被點擊的列表項目的索引
    document.querySelectorAll(".CardActive")[4].classList.remove("CardActive");
     // 移除先前被激活的角色選擇框
    charSelects5[charIndex5].classList.add("CardActive");
       // 標記當前角色選擇框為激活狀態
    document.querySelectorAll(".charActive")[4].classList.remove("charActive");
     // 移除先前被激活的角色
    chars5[charIndex5].classList.add("charActive");
      // 標記當前角色為激活狀態
  });
}