let current_search_engine = '';
const search_engines = {
    google: 'https://www.google.com/search?q=',
    startpage: 'https://www.startpage.com/do/dsearch?query=',
    duckduckgo: 'https://www.duckduckgo.com/?q=',
    ecoasia: 'https://www.ecoasia.org/search?q=',
    bing: 'https://www.bing.com/search?q='
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=>{
    if(/^http/.test(tab.url) && changeInfo.status === 'complete'){
chrome.tabs.executeScript(tabId, {file: './scripts/foreground.js'}, ()=>{
    console.log("the foreground script has been injected.");
})
    }
})


chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
    if(request.message === 'save_search_engine'){
        current_search_engine =  request.payload;
        // console.log(search_engines[current_search_engine]);
        sendResponse({message: 'success'});
    }else if(request.message === 'get_current_search_engine'){
        sendResponse({payload: current_search_engine});
    } else if(request.message === 'search'){
        chrome.tabs.create({
            active: true,
            url: `${search_engines[current_search_engine]}${request.payload}`
        })
    }
})