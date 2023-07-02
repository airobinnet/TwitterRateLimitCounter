var ctx = document.getElementById("myChart").getContext("2d");

chrome.storage.local.get(null, function(items) {
  var labels = [];
  var data = [];

  for (var key in items) {
    if (key !== 'lastReset' && key !== 'target') {
      var date = new Date(key);
      if (isNaN(date.getTime())) {
        labels.push("Current Count");
        data.push(items[key]);
      } else {
        labels.push(key);
        data.push(items[key]);
      }
    }
  }

  var myNewChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Number of Tweets Read',
        data: data,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    },
    options: {
      responsive: false,
    },
  });
});
