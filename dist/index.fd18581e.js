const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
    {
        logo: "A",
        url: "https://www.acfun.cn"
    },
    {
        logo: "B",
        url: "https://www.bilibili.com"
    }, 
];
const simplifyUrl = (url)=>{
    return url.replace("https://", "").replace("http://", "").replace("www.", "").replace(/\/.*/, ""); //删除/开头的内容
};
const render = ()=>{
    $siteList.find("li:not(.last)").remove();
    hashMap.forEach((node, index)=>{
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo[0]}</div>
                  <div class="link">${simplifyUrl(node.url)}</div>
                     <div class="close" style="cursor:hand">×</div>
             </div>
          </li>`).insertBefore($lastLi);
        $li.on("click", ()=>{
            window.open(node.url);
        });
        $li.on("click", ".close", (e)=>{
            e.stopPropagation(); //阻止冒泡
            hashMap.splice(index, 1);
            render();
        });
    });
};
render();
$(".addButton").on("click", ()=>{
    let url = window.prompt("\u8BF7\u95EE\u4F60\u8981\u6DFB\u52A0\u7684\u7F51\u5740\u662F\uFF1F");
    if (url.indexOf("http") != 0) url = "https://" + url;
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url
    });
    render();
});
window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap);
    localStorage.setItem("x", string);
};
$(document).on("keypress", (e)=>{
    const { key  } = e;
    for(let i = 0; i < hashMap.length; i++)if (hashMap[i].logo.toLowerCase() === key) window.open(hashMap[i].url);
});

//# sourceMappingURL=index.fd18581e.js.map
