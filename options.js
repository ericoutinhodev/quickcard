const saveButton = document.querySelector("#js-save-button");
const cancelButton = document.querySelector("#js-cancel-button");
const formOptions = document.querySelector("#js-options-form");
const backdrop = document.querySelector(".cb-backdrop");
let baseUrl;

// Rescue stored value
chrome.storage.local.get(["cbBaseUrl"]).then((result) => {
    if (result.cbBaseUrl != "") {
        formOptions.cbUrlBase.value = result.cbBaseUrl;
    }
});

saveButton.addEventListener("click", (event) => {
    event.preventDefault();

    document.querySelectorAll(".error").forEach( (element) => {
        element.classList.remove("error");
    })

    var urlBase = formOptions.cbUrlBase.value;

    if (isUrl(urlBase)) {
        chrome.storage.local.set({ "cbBaseUrl": urlBase });
        backdrop.classList.add("js-show");
    }
    else {
        formOptions.cbUrlBase.parentElement.classList.add("error");
    }
});

cancelButton.addEventListener("click", async (event) => {
    event.preventDefault();
    let [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    chrome.tabs.remove(tab.id);
})

const isUrl = (url) => {
    return url.match(/^(https?:\/\/)(www\.)?([\.\da-z]+\.[a-z\.]{2,6}|[\d\.]+)([\/:?&#]{1}[\da-z\.]+)*[\/\?]?$/gi);
}

const closeToast = document.querySelectorAll(".close-toast");
closeToast.forEach((element, index) => {
    element.addEventListener("click", (event) => {
        backdrop.classList.remove("js-show");
    });
});

chrome.management.getSelf()
    .then( (result) => {
        document.querySelector(".vtag").innerHTML = "v" + result.version
    });