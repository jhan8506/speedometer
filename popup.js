const button = document.querySelector("#checkPage");

button.addEventListener("click", function () {
  const baseUrl =
    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=";
  const trailing =
    "&category=performance&strategy=desktop&key=AIzaSyCdfh_iNI7-5BIZWQaxYg6quVvZoL05nek";

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let fieldUrl = tabs[0].url;
    $.getJSON(baseUrl + fieldUrl + trailing, function (data) {
      console.log(data);
      //console.log(data.lighthouseResult.audits)
      // ["speed-index"].displayValue);
      // const speed = document.createElement("p");
      const websiteTested = document.querySelector("#websiteTested");
      const speed = document.querySelector("#speed");
      const domSize = document.querySelector("#domSize");
      const category = document.querySelector("#category");
      const bootupTime = document.querySelector('#bootupTime');
      const score = document.querySelector('#score');
      

      testedSpeed = data.lighthouseResult.audits["speed-index"].displayValue;
      websiteTested.innerText += " " + fieldUrl;
      speed.innerText += " " + testedSpeed;
      domSize.innerText +=
        " " + data.lighthouseResult.audits["dom-size"].displayValue;
      // category.innerText += data.loadingExperience.metrics['overall_category'].displayValue;
      score.innerText += ' ' + data.lighthouseResult.audits["speed-index"].score;
      bootupTime.innerHTML += ' ' + data.lighthouseResult.audits["bootup-time"].displayValue;

      const scoreColor = data.lighthouseResult.audits["speed-index"].score;
      
      
    });
  });
});
