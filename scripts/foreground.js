document.addEventListener("copy", ()=>{
    navigator.clipboard.readText()
    .then(res=>{
        // alert(res);
        chrome.runtime.sendMessage({
            message: 'search',
            payload: `"${res}"`

        })
    })
    .catch(err=> console.log(err));
})