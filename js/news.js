/* ------------------------------------------------------------------------------------------------------------------------- */
/* |                                                   newsBox                                                             | */
/* ------------------------------------------------------------------------------------------------------------------------- */

// elements
const newsBoxBtns = document.querySelectorAll(".newsBox ul li button");
const articleList = document.querySelector(".newsBox .articleList");
const loadBtn = document.querySelector(".load");
const topBtn = document.querySelector(".topBtn");

// index
const type = ["最新", "資訊", "公告", "活動"];
let indexArticle = 0;
let typeBtn = 0;

// json data
let data = "";
try {
  let request = new XMLHttpRequest();
  request.open("GET", "../data/news.json", false);
  request.send(null);

  data = JSON.parse(request.responseText);
}
catch (e) {
  console.error("讀取JSON文件出錯: " + e.message);
}

const loadArticle = function(type = "最新") {
  // 判斷剩餘文章數量
  if(indexArticle >= data.contents.length) {
    alert("沒有更多內容了");
  }

  // 初始化當次加載文章數量
  let numArticle = 0;

  // 判斷加載類型
  if(type === "最新") {
    // 加載5篇文章
    while(numArticle < 5) {
      loadLi(indexArticle);
      numArticle++;
      indexArticle++;
    }
  }
  else {
    while(numArticle < 5) {
      // 進行種類判斷, 決定是否加載
      if(data.contents[indexArticle].type === type) {
        loadLi(indexArticle);
        numArticle++;
      }
      indexArticle++;
    }
  }
}

const loadLi = function(index = 0) {
  articleList.insertAdjacentHTML("beforeend",
    `<li class="article">
        <a href= ${data.contents[index].url}>
          <img src= ${data.contents[index].pic} alt="pic" class="articleImg">
          <div class="articleText">
            <span class="articleTitle">${data.contents[index].title}</span>
            <span class="articleAbstract">${data.contents[index].abstract}</span>
            <div class="articleMeta">
              <span class="articleDate">${data.contents[index].date}</span>
              <span class="article${data.contents[index].class}">${data.contents[index].type}</span>
            </div>
          </div>
        </a>
    </li>`
  );
}
loadArticle("最新");

// 綁定事件
for (let i = 0; i < newsBoxBtns.length; i++) {
  newsBoxBtns[i].addEventListener("click", function () {
    // 如果先add再remove會出錯，因為selector會選擇符合條件中遇到的第一個元素，所以前面的會一直被remove掉
    document.querySelector(".activeBtn").classList.remove("activeBtn");
    newsBoxBtns[i].classList.add("activeBtn");

    // 每次切換種類先歸零index, 清空ul裡面的元素
    indexArticle = 0;
    articleList.innerHTML = "";

    // 載入清單
    loadArticle(type[i]);

    // 更新當前種類
    typeBtn = i;
  });
}

loadBtn.addEventListener("click", function() {
  // 根據種類進行加載
  loadArticle(type[typeBtn]);
});

topBtn.addEventListener("click", function() {
  document.documentElement.scrollTop = 0;
});

document.addEventListener("scroll", function() {
  if(document.documentElement.scrollTop >= 500) {
    topBtn.style.opacity = "1";
  }
  else {
    topBtn.style.opacity = "0";
  }
});