
(function () {

    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('SwitchCurrent').addEventListener('click', function (e) {//If user wants to switch current tab
            chrome.tabs.query({active: true,lastFocusedWindow: true}, function(tabs) {

                var browser = document.getElementsByName('browser');
                var browser_value;
                for(var i = 0; i < browser.length; i++){
                    if(browser[i].checked){
                        browser_value = browser[i].value;
                    }
                }
                var tab = tabs[0];
                chrome.runtime.sendNativeMessage('switch',{text: String(tab.url) + "/*/*/" + String(browser_value)});
                var close = document.getElementsByName('close');
                var close_value;
                for(var i = 0; i < close.length; i++){
                    if(close[i].checked){
                        close_value = close[i].value;
                    }
                }
                if(String(close_value) == "yes"){//if they want to close current after switch
                  window.setTimeout(partB,3000);
                  function partB() {
                    chrome.tabs.remove(tab.id, function() { });
                  }
                }

            });
        });

        document.getElementById('SwitchAll').addEventListener('click', function (e) {//If user wants to switch all tabs
          var link = "";
            chrome.windows.getAll({populate:true},function(windows){
              windows.forEach(function(window){
                window.tabs.forEach(function(tab){
                  link+= String(tab.url) + " ";
                });
              });
              var browser = document.getElementsByName('browser');
              var browser_value;
              for(var i = 0; i < browser.length; i++){
                  if(browser[i].checked){
                      browser_value = browser[i].value;
                  }
              }
              chrome.runtime.sendNativeMessage('switch',{text: String(link) + "/*/*/" + String(browser_value) });
              var close = document.getElementsByName('close');
              var close_value;
              for(var i = 0; i < close.length; i++){
                  if(close[i].checked){
                      close_value = close[i].value;
                  }
              }
              if(String(close_value) == "yes"){//if they want to close all after switch
                var delay=1000; //1 second
                setTimeout(function() {  
                  chrome.tabs.query({}, function (tabs) {
                    for (var i = 0; i < tabs.length; i++) {
                        chrome.tabs.remove(tabs[i].id);
                    }
                  });
                }, 5000);
                
              }
            });
        });




    });


}());