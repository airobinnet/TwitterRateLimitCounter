console.log("Tweet Counter: Started"); // Start of the program

// Define a function to handle mutations
const onMutation = (mutations) => {
  // Loop over each mutation
  for (const { addedNodes } of mutations) {
    // Loop over each added node in the mutation
    for (const node of addedNodes) {
      // Check if the node has a dataset and if it's testid is 'cellInnerDiv'
      if (node && node.dataset && node.dataset.testid === 'cellInnerDiv') {
        // Get all the tweets within the node
        const tweets = node.querySelectorAll("[data-testid='tweet']");
        // If there are tweets, send a message to increment the counter
        if(tweets.length > 0) {
          chrome.runtime.sendMessage({increment: "yes"});
        }
      }
    }
  }
}

// Define a function to start observing mutations
const observe = () => {
  // Start observing the document for changes in the subtree and child nodes
  mo.observe(document, {
    subtree: true,
    childList: true,
  });
}

// Create a new MutationObserver with the defined function
const mo = new MutationObserver(onMutation);

// Start observing
observe();
