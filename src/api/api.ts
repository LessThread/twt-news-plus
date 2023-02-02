const root = 'http://8.130.96.252/';
const PinnedNew = 'art/select/summary/top/';

// async function getPinnedNew(){
//     const url = root + PinnedNew;
//     const ret = new Promise(function (resolve, reject) {
//         const arr = fetch(url)
//             .then(res=>res.json())
//             .then(res => {return res})
//         console.log(arr);
//         return arr
//     });

//     return ret;
    

    
// }

// async function getPinnedNew(){
//     const url = root + PinnedNew;
//     return await fetch(url)
//         .then(res=>res.json())
//         .then(res => {return res})
// }

async function getPinnedNew(){
    const url = root + PinnedNew;
    const t = await fetch(url)
        .then(res=>res.json())
        .then(res => {return res})
    return t;
}


export{
    getPinnedNew
}