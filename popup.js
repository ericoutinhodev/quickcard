let baseUrl;
let textSearch = document.querySelector("#cbSearch");
let btnSearch = document.querySelector("#js-search-button");

// Create link to settings page
document.querySelector("#js-settings-link").href = chrome.runtime.getURL("options.html");

chrome.storage.local.get(["cbBaseUrl"]).then((result) => {
    var url = result.cbBaseUrl;
    if (url != "" && url != null) {
        baseUrl = url;
    }
});

btnSearch.addEventListener("click", (event) => {
    event.preventDefault();
    if (textSearch.value != null && textSearch.value != "") {
        chrome.tabs.create({ url: `${baseUrl}/${textSearch.value}` });
    } else {
        document.querySelector(".cb-form").classList.add("error");        
    }
});

document.querySelector(".vtag").innerHTML = "v" + chrome.runtime.getManifest().version;