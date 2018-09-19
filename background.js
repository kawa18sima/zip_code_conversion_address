window.onload = function(){
  window.addEventListener('click', function(){
    let selection = window.getSelection().toString();
    chrome.storage.local.set({selectText: selection}, function(){});
  });
}
