
(function () {

    'use strict';

    document.addEventListener('DOMContentLoaded', function () {

        document.getElementById('SwitchCurrent').addEventListener('click', function (e) {
            chrome.tabs.query({active: true,lastFocusedWindow: true}, function(tabs) {
                var tab = tabs[0];
                chrome.runtime.sendNativeMessage('switch',{text: String(tab.url)});
            });
        });

        document.getElementById('SwitchAll').addEventListener('click', function (e) {
          var link = "";
            chrome.windows.getAll({populate:true},function(windows){
              windows.forEach(function(window){
                window.tabs.forEach(function(tab){
                  link+= String(tab.url) + " ";
                });
              });
              chrome.runtime.sendNativeMessage('switch',{text: String(link)});
            });
        });




    });


}());