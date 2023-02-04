const root = 'http://8.130.96.252/';
const imgBed = 'imgbed/download/'
const PinnedNew = 'art/select/summary/top/';
const NonTopNews = 'art/select/summary/nor/'

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



export{
    getPinnedNew,
    getNonTopNews,
    root,
    imgBed
}