const root = 'http://localhost:2048/'
//const root = 'http://8.130.96.252/';
//const root = 'https://news.twt.edu.cn/'; 
const imgBed = 'imgbed/download/'
const PinnedNew = 'art/select/summary/top/';
const NonTopNews = 'art/select/summary/nor/';
const News = 'art/select/'  ;
const Img = 'imgbed/download/';
const AllNews = 'art/select/summary/'

async function getPinnedNew(){
    const url = root + PinnedNew;
    const t = await fetch(url)
        .then(res=>res.json())
        .then(res => {return res.result})
    //console.log(t)
    return t;
}

async function getNonTopNews(){
    const url = root + NonTopNews;
    const t = await fetch(url)
        .then(res=>res.json())
            .then(res => {return res.result})
        //console.log(t)
        return t;
}

async function getNews(id:string){
    const url = root + News + id;
    const t = await fetch(url)
        .then(res=>res.json())
            .then(res => {return res.result})
        //console.log(t)
        return t;
}

async function getImg($id:string|number){
    const id = Number($id);
    const url = root + Img + id;
    const t = await fetch(url)
    return t;
}

function displayImg($id:string|number){
    const id = Number($id);
    const url = root + Img + id;
    return url;
}

async function getAllNews() {
    const url = root + AllNews;
    const t = await fetch(url)
        .then(res=>res.json())
            .then(res => {return res.result})
        return t;
}

//根据 categoryId 返回对应的项目名称（预留的接口）
function getCategoryNameById(id:number):string{
    const NameList = ['竞赛','社团公告','通知','活动','新闻']
    if (id === 0){return "未分类"}
    console.log(NameList)
    switch(id){
        case 1:return NameList[id-1];
        case 2:return NameList[id-1];
        case 3:return NameList[id-1];
        case 4:return NameList[id-1];
    }
    return "UnKnow"
}

export{
    getPinnedNew,
    getNonTopNews,
    root,
    imgBed,
    getNews,
    getImg,
    displayImg,
    getAllNews,
    getCategoryNameById,
}