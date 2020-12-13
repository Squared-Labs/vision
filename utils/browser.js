/*
 * Filename: browser.js
 * Author: SaturdayNightDead (BeanedTaco)
 * Created: 21 February 2020
 * Description: This is the backend of the Browser UI.
 * Originally from hokein/electron-sample-apps/webview/browser
*/

const visionApi = window.api
let startingAddress = "https://web.tabliss.io/";
let webAddress = startingAddress
window.onresize = doLayout;
var isLoading = false;

console.log("Hey there! If you want to open up DevTools, run devTools().")

function closeApp() {

    visionApi.ipc.handoff("close", "visionIntegratedStamp")
}

function devTools() {
  document.getElementsByTagName("webview")[0].openDevTools();
}

onload = async function() {
  var webview = document.querySelector('webview');
  webview.setAttribute("src", startingAddress)
  doLayout();
  document.querySelector('#back').onclick = function() {
    visionApi.webFunctions.back();
  };

  document.querySelector('#forward').onclick = function() {
    visionApi.webFunctions.forward();
  };

  document.querySelector('#home').onclick = function() {
    navigateTo(startingAddress);
  };

  document.querySelector('#reload').onclick = function() {
    navigateTo(webview.getURL());
  };
  document.querySelector('#reload').addEventListener(
    'webkitAnimationIteration',
    function() {
      if (!isLoading) {
        document.body.classList.remove('loading');
      }
    });
    
  document.querySelector('#location-form').onsubmit = function(e) {
    e.preventDefault();
    navigateTo(document.querySelector('#location').value);
  };

  webview.addEventListener('close', handleExit);
  webview.addEventListener('did-start-loading', handleLoadStart);
  webview.addEventListener('did-stop-loading', handleLoadStop);
  webview.addEventListener('did-fail-load', handleLoadAbort);
  webview.addEventListener('did-get-redirect-request', handleLoadRedirect);
  webview.addEventListener('did-finish-load', handleLoadCommit);

  visionApi.information.getMetadata().then(md => {
    document.getElementById("title").innerHTML = `<a class="breadcrumb id="title">Vision Browser v${md.version.main}</a>`
    if (md.flags.branch == "testing") {
      document.getElementById("title").innerHTML = `<a class="breadcrumb id="title">Vision Browser v${md.version.main} (b${md.build})|| Beta Ring, use with caution</a>`
    } if (md.flags.branch == "v2") {
      document.getElementById("title").innerHTML = `<a class="breadcrumb id="title">Vision Browser v${md.version.main} (Build ${md.build}) || VERSION 2 BUILD, USE WITH EXTREME CAUTION</a>`
    }
  });
};

function navigateTo(url) {
    resetExitedState();
    let visionProtocol = url.slice(0, url.length).toLowerCase();
    let https = url.slice(0, 8).toLowerCase();
    let http = url.slice(0, 7).toLowerCase();


    if (https === 'https://') {
        document.querySelector('webview').src = url;
    } else if (http === 'http://') {
        document.querySelector('webview').src = url;
    } else if (visionProtocol === 'vision:about') {
        visionProtocolHandoff(url)
    } else if (visionProtocol === 'vision:panic') {
        visionProtocolHandoff(url)
    } else {
        document.querySelector('webview').src = 'http://google.com/search?q=' + url;
    }
  }

function visionProtocolHandoff(url) {
    let entry = url.slice(0, url.length).toLowerCase();
    if (entry === 'vision:about') {
        visionApi.ipc.handoff("about", "visionStamp")
    } if (entry === 'vision:panic') {
        visionApi.webFunctions.panic()
    }
}
 // document.querySelector('webview').src = url;
//}


function doLayout() {
  var webview = document.querySelector('webview');
  var controls = document.querySelector('#controls');
  var controlsHeight = controls.offsetHeight;
  var windowWidth = document.documentElement.clientWidth;
  var windowHeight = document.documentElement.clientHeight;
  var webviewWidth = windowWidth;
  var webviewHeight = windowHeight - controlsHeight;

  webview.style.width = webviewWidth + 'px';
  webview.style.height = webviewHeight + 'px';

  var sadWebview = document.querySelector('#sad-webview');
  sadWebview.style.width = webviewWidth + 'px';
  sadWebview.style.height = webviewHeight * 2/3 + 'px';
  sadWebview.style.paddingTop = webviewHeight/3 + 'px';
}

function handleExit(event) {
  console.log(event.type);
  document.body.classList.add('exited');
  if (event.type == 'abnormal') {
    document.body.classList.add('crashed');
  } else if (event.type == 'killed') {
    document.body.classList.add('killed');
  }
}

function resetExitedState() {
  document.body.classList.remove('exited');
  document.body.classList.remove('crashed');
  document.body.classList.remove('killed');
}

function handleFindUpdate(event) {
  var findResults = document.querySelector('#find-results');
  if (event.searchText == "") {
    findResults.innerText = "";
  } else {
    findResults.innerText =
        event.activeMatchOrdinal + " of " + event.numberOfMatches;
  }

  // Ensure that the find box does not obscure the active match.
  if (event.finalUpdate && !event.canceled) {
    var findBox = document.querySelector('#find-box');
    findBox.style.left = "";
    findBox.style.opacity = "";
    var findBoxRect = findBox.getBoundingClientRect();
    if (findBoxObscuresActiveMatch(findBoxRect, event.selectionRect)) {
      // Move the find box out of the way if there is room on the screen, or
      // make it semi-transparent otherwise.
      var potentialLeft = event.selectionRect.left - findBoxRect.width - 10;
      if (potentialLeft >= 5) {
        findBox.style.left = potentialLeft + "px";
      } else {
        findBox.style.opacity = "0.5";
      }
    }
  }
}

function findBoxObscuresActiveMatch(findBoxRect, matchRect) {
  return findBoxRect.left < matchRect.left + matchRect.width &&
      findBoxRect.right > matchRect.left &&
      findBoxRect.top < matchRect.top + matchRect.height &&
      findBoxRect.bottom > matchRect.top;
}

function handleKeyDown(event) {
  if (event.ctrlKey) {
    switch (event.keyCode) {
      // Ctrl+F.
      case 70:
        event.preventDefault();
        openFindBox();
        break;

      // Ctrl++.
      case 107:
      case 187:
        event.preventDefault();
        increaseZoom();
        break;

      // Ctrl+-.
      case 109:
      case 189:
        event.preventDefault();
        decreaseZoom();
    }
  }
}

function handleLoadCommit() {
  resetExitedState();
  var webview = document.querySelector('webview');
  document.querySelector('#location').value = webview.getURL();
  document.querySelector('#back').disabled = !webview.canGoBack();
  document.querySelector('#forward').disabled = !webview.canGoForward();
  closeBoxes();
}

function handleLoadStart(event) {
  document.body.classList.add('loading');
  isLoading = true;

  resetExitedState();
  if (!event.isTopLevel) {
    return;
  }

  document.querySelector('#location').value = event.url;
}

function handleLoadStop(event) {
  // We don't remove the loading class immediately, instead we let the animation
  // finish, so that the spinner doesn't jerkily reset back to the 0 position.
  isLoading = false;
}

function handleLoadAbort(event) {
  document.querySelector('webview').executeJavaScript("window.close()")
  document.getElementById("err").innerText = "The webpage failed to load. Loading can fail for many reasons, but one common reason is that you typed the URL wrong. If you're sure that the URL is correct, then chances are that the page that you requested isn't working."
}

function handleLoadRedirect(event) {
  resetExitedState();
  document.querySelector('#location').value = event.newUrl;
}

function getNextPresetZoom(zoomFactor) {
  var preset = [0.25, 0.33, 0.5, 0.67, 0.75, 0.9, 1, 1.1, 1.25, 1.5, 1.75, 2,
                2.5, 3, 4, 5];
  var low = 0;
  var high = preset.length - 1;
  var mid;
  while (high - low > 1) {
    mid = Math.floor((high + low)/2);
    if (preset[mid] < zoomFactor) {
      low = mid;
    } else if (preset[mid] > zoomFactor) {
      high = mid;
    } else {
      return {low: preset[mid - 1], high: preset[mid + 1]};
    }
  }
  return {low: preset[low], high: preset[high]};
}

function increaseZoom() {
  var webview = document.querySelector('webview');
  webview.getZoom(function(zoomFactor) {
    var nextHigherZoom = getNextPresetZoom(zoomFactor).high;
    webview.setZoom(nextHigherZoom);
    document.forms['zoom-form']['zoom-text'].value = nextHigherZoom.toString();
  });
}

function decreaseZoom() {
  var webview = document.querySelector('webview');
  webview.getZoom(function(zoomFactor) {
    var nextLowerZoom = getNextPresetZoom(zoomFactor).low;
    webview.setZoom(nextLowerZoom);
    document.forms['zoom-form']['zoom-text'].value = nextLowerZoom.toString();
  });
}

function openZoomBox() {
  document.querySelector('webview').getZoom(function(zoomFactor) {
    var zoomText = document.forms['zoom-form']['zoom-text'];
    zoomText.value = Number(zoomFactor.toFixed(6)).toString();
    document.querySelector('#zoom-box').style.display = '-webkit-flex';
    zoomText.select();
  });
}

function closeZoomBox() {
  document.querySelector('#zoom-box').style.display = 'none';
}

function openFindBox() {
  document.querySelector('#find-box').style.display = 'block';
  document.forms['find-form']['find-text'].select();
}

function closeFindBox() {
  var findBox = document.querySelector('#find-box');
  findBox.style.display = 'none';
  findBox.style.left = "";
  findBox.style.opacity = "";
  document.querySelector('#find-results').innerText= "";
}

function closeBoxes() {
  closeZoomBox();
  closeFindBox();
}

document.addEventListener('keydown',function(e){

  //CTRL + SHIFT + something
  if(e.ctrlKey && e.shiftKey){
    switch(e.code){

      case 'KeyI':
        document.getElementsByTagName("webview")[0].openDevTools();
        break;
    }
  }

});