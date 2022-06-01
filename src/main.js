const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hasMap = xObject || [
    { logo: 'G', url: 'https://github.com'},
    { logo: 'J', url: 'https://juejin.cn'},
    { logo: 'F', url: 'https://www.figma.com'},
    { logo: 'M', url:'https://developer.mozilla.org'},
    { logo: 'X', url:'https://xiedaimala.com'},
];
const simplifyUrl = (url) =>{ 
    return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '') //删除/开头的内容
}

const render = ()=>{
    $siteList.find('li:not(.last)').remove()
    hasMap.forEach((node, index) => {
        const $li = $(`<li>
          <div class="site">
            <div class="logo">${node.logo}
            </div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
             <svg class="icon">
              <use xlink:href="#icon-close"></use>
             </svg>
            </div>
          </div>
      </li>`).insertBefore($lastLi)
      $li.on('click', () =>{
          window.open(node.url)
      })
      $li.on('click', '.close', (e) =>{
          e.stopPropagation //阻止冒泡
          hasMap.splice(index, 1)
          render()
      })
    });
}
render()
$('.addButton').on('click', ()=>{
      let url = window.prompt('请输入你要添加的网址。')
      if(url.indexOf('http')!==0){
         url = 'https://' + url
      }
      console.log(url)
      hasMap.push({
          logo: simplifyUrl(url)[0].toUpperCase(),
          url: url
      });
      render()
});

window.onbeforeunload = ()=>{
   const string = JSON.stringify(hasMap)
   localStorage.setItem('x', string)
}
$(document).on('keyprass', (e) =>{
    const {key} = e
    for(let i = 0; i<hasMap.length; i++) {
        if(hasMap[i].logo.toLowerCase() === key){
            window.open(hasMap[i].url)
        }
    }
})
  