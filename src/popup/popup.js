document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('saveNames');
    const compareButton = document.getElementById('compareNames');

    saveButton.addEventListener('click', function() {

        // current active tab
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

            // call content.js
            chrome.tabs.sendMessage(tabs[0].id, {action: "saveNames"}, function(response) {
                if (response && response.success) {
                    alert('Names saved successfully!');
                } else {
                    alert('Error (Make sure you are on the Canvas Students page)');
                }
            });
        });
    });


    
    compareButton.addEventListener('click', function() {

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

            chrome.tabs.sendMessage(tabs[0].id, {action: "compareNames"}, function(response) {
                if (response && response.similarities) {
                    alert('Matching names found: ' + response.similarities.join(', '));
                } else {
                    alert('No matching found or error.');
                }
            });
        });
    });
});