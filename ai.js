const DAIRYVERSE_AI_BACKEND =
  "https://script.google.com/macros/s/AKfycbyn2rqqcVBIH4xPUCljPU-dMlEpQ5xk1fqRa7ScSKqQNVc7L5n_wrDNgXocbvngu-hO/exec";


function askDairyVerse(question) {

  return new Promise(function(resolve, reject) {

    const callbackName =
      "dairyVerseAI_" + Date.now();

    window[callbackName] = function(data) {

      if (data && data.success) {
        resolve(data.answer);
      } else {
        reject(
          new Error(
            data && data.error
              ? data.error
              : "The AI could not answer."
          )
        );
      }

      delete window[callbackName];

      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };


    const script =
      document.createElement("script");


    const url =
      DAIRYVERSE_AI_BACKEND +
      "?q=" +
      encodeURIComponent(question) +
      "&callback=" +
      encodeURIComponent(callbackName);


    script.src = url;


    script.onerror = function() {

      delete window[callbackName];

      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }

      reject(
        new Error(
          "Unable to connect to DairyVerse AI."
        )
      );
    };


    document.body.appendChild(script);

  });
}
