//const root = 'http://8.130.96.252/';
const root = 'https://news.twt.edu.cn/'; 
const imgBed = 'imgbed/download/'
const PinnedNew = 'art/select/summary/top/';
const NonTopNews = 'art/select/summary/nor/';
const News = 'art/select/'  ;
const Img = 'imgbed/download/';

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

export{
    getPinnedNew,
    getNonTopNews,
    root,
    imgBed,
    getNews,
    getImg,
    displayImg,
}