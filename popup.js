let baseUrl;
let textSearch = document.querySelector("#cbSearch");
let btnSearch = document.querySelector("#js-search-button");

// Create link to settings page
chrome.management.getSelf().then( (result) => {
    document.querySelector("#js-settings-link").href = result.optionsUrl;
});

chrome.storage.local.get(["cbBaseUrl"]).then((result) => {
    var url = result.cbBaseUrl;
    if (url != "") {
        baseUrl = url;
    }
});

btnSearch.addEventListener("click", (event) => {
    event.preventDefault();
    chrome.tabs.create({ url: `${baseUrl}dosearchsite.action?cql=siteSearch+~+"${textSearch.value}"&queryString=${textSearch.value}` });
});

chrome.management.getSelf().then( result => document.querySelector(".vtag").innerHTML = "v" + result.version );