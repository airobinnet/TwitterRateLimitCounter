let count = 0;
let target = 10000;

// listen for messages from popup.js
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // if the message is a request for the count, send the count back
  if (msg.request == "count") {
    sendResponse({ count: count });
  // if the message is a request to reset the count, reset the count
  } else if (msg.reset == "yes") {
    count = 0;
    target = 10000;
    // save the count and target to local storage
    chrome.storage.local.set({ count: count, target: target });
    // set the badge text to the count
    chrome.action.setBadgeText({text: String(count)});
  // if the message is a request to increment the count, increment the count
  } else if (msg.increment == "yes") {
    count++;
    // save the count to local storage
    chrome.storage.local.set({ count: count });
    // set the badge text to the count
    chrome.action.setBadgeText({text: String(count)});
    // send the count back
    sendResponse({ count: count });
  }
});

// get the count from local storage
chrome.storage.local.get(['count', 'target'], (data) => {
  if (data.count) {
    // set the count to the count from local storage
    count = data.count;
    chrome.action.setBadgeText({text: String(count)});
  }
  if (data.target) {
    // set the target to the target from local storage
    target = data.target;
  }
});

// reset the count every 24 hours
chrome.alarms.create('resetCount', { periodInMinutes: 24 * 60 });
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'resetCount') {
    const today = getToday();
    // save the count to local storage with today's date as the key
    chrome.storage.local.set({ [today]: count });
    // set the count to 0
    count = 0;
    target = 10000;
    // save the count to local storage
    chrome.storage.local.set({ count: count, target: target });
    chrome.action.setBadgeText({text: String(count)});
  }
});

// get today's date in YYYY-MM-DD format
function getToday() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  return yyyy + '-' + mm + '-' + dd;
}
