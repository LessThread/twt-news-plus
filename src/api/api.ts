const root = 'http://8.130.96.252/';
const PinnedNew = 'art/select/summary/top/';

function getPinnedNew(){
    console.log('debug')
    const url = root + PinnedNew;
    fetch(url)
        .then(res=>res.json())
        .then(res => {console.log(res)})
}

export{
    getPinnedNew
}