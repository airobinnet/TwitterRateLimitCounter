// Add an event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
  updateUI();

  // Add an event listener to the element with the id 'reset' for when it is clicked
  document.getElementById('reset').addEventListener('click', function() {
    // Send a message to the chrome runtime to reset the count
    chrome.runtime.sendMessage({reset: "yes"});
    updateUI();
  });

  // Add an event listener to the save changes button
  document.getElementById('saveChanges').addEventListener('click', function() {
    var target = document.getElementById('targetSelect').value;
    chrome.storage.local.set({ target: target }, function() {
      // Close the modal
      $('#settingsModal').modal('hide');
  
      // Update the UI elements
      updateUI();
    });
  });
  
  document.getElementById('cogwheel').addEventListener('click', function() {
    // show the settings modal
    document.getElementById('settingsModal').style.display = "block";
  });

  // Add an event listener to the close button
  document.getElementById('close').addEventListener('click', function() {
    // hide the settings modal
    document.getElementById('settingsModal').style.display = "none";
  });

});

// Add a listener for messages from the chrome runtime
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // If the request is to increment the count
  if (request.increment == "yes") {
    updateUI();
  }
});


function updateUI() {
  chrome.storage.local.get(['count', 'target'], function(data) {
    var count = data.count || 0;
    var target = data.target || 10000;

    var progressBar = document.getElementById('progressBar').firstElementChild;
    var countDiv = document.getElementById('count').firstElementChild;
    progressBar.style.width = (count / target) * 100 + "%";
    countDiv.innerText = "Tweets left: " + (target-count) + "/" + target;
  });
}
