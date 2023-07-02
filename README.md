# Twitter Tweet Counter

This is a Chrome extension that counts the number of tweets on the Twitter page. It uses MutationObserver to observe changes in the DOM and count the tweets. It also has a popup to reset the count and adjust the target count, and a graph to show the count over time.

## Installation

1. Clone this repository
2. Open Chrome and go to `chrome://extensions`
3. Enable Developer mode by ticking the checkbox in the upper-right corner
4. Click on the "Load unpacked extension..." button
5. Select the directory containing your unpacked extension

## Usage

1. Visit [Twitter](https://twitter.com/)
2. The extension will automatically start counting the tweets
3. Click on the extension icon to see the current count and adjust the target count
4. Click on the "View Daily Usage Graph" link to see the count over time

## Files

- `content.js`: Observes changes in the DOM and counts the tweets
- `graph.html`: Displays the graph of the count over time
- `graph.js`: Generates the graph using Chart.js
- `manifest.json`: Defines the extension's settings and permissions
- `popup.html`: The HTML for the popup
- `popup.js`: Handles the popup's interactions
- `background.js`: Maintains the count and handles messages from the content script and the popup

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


created by [AIRobin](https://AIRobin.net/)
twitter: [AIRobin_net](hhttps://twitter.com/AIRobin_net)