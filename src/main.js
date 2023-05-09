const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
//读取当前网站下的x，如果x能成功的变成一个对象，那就把这个对象放在hashMap里；如果不能，我就把它初始化成有两项的数组
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "B", url: "https://m.bilibili.com" },
  { logo: "C", url: "https://codepen.io" },
  { logo: "I", url: "https://www.iconfont.cn" },
  { logo: "J", url: "https://juejin.cn" },
  { logo: "T", url: "https://cloud.tencent.com/" },
];
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //删除 /
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  //找到除了 .last 的 li ，并删除，也就是删掉之前本有的那些li，接着forEach遍历hashMap重新添加旧的li和新的li
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div >
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                <svg class="icon">
                <use xlink:href="#icon-close"></use>
               </svg>
                </div>
            </div >
        </li > `).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); //阻止冒泡
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是啥？");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url,
  });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};

// 用户体验不好，搜索时候会打开网站
// $(document).on('keypress', (e) => {
//     const { key } = e
//     console.log()
//     for (let i = 0; i < hashMap.length; i++) {
//         // if (hashMap[i].logo.toLowerCase() === key) {
//         //     window.open(hashMap[i].url)
//         // }
//     }
// })
