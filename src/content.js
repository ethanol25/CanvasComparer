let savedNames = [];


function addSaveNamesButton() {
    const location = document.getElementsByClassName("ic-Action-header");
    if (location) {
        const button = document.createElement("button");
        button.innerHTML = "Save Names";

        location.appendChild(button); 
    } else {
        alert("Target location for the button not found.");
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    //savenames
    if (message.action === "saveNames") {
        //scrape names from page
        const names = Array.from(document.querySelectorAll('a.roster_user_name'))
            .map(el => el.textContent.trim());
        savedNames = names;


        //save to local storage
        chrome.storage.local.set({savedNames}, () => {
            sendResponse({success: true});
        });
        //send response
        return true;
    }

    //comparenames
    if (message.action === "compareNames") {
        //scrape names from current page
        const currentNames = Array.from(document.querySelectorAll('a.roster_user_name'))
            .map(el => el.textContent.trim());

        //compare with saved names in local storage
        chrome.storage.local.get(['savedNames'], (result) => {
            const similarities = currentNames.filter(name => result.savedNames.includes(name));
            sendResponse({similarities});
        });
        return true;
    }
});

addSaveNamesButton();