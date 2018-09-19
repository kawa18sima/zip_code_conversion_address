window.onload = function(){
  let zipCode = document.getElementById('zip_code');
  let address = document.getElementById('address');

  zipCode.addEventListener('keyup', function(){
    if(zipCode.value.length >= 7){
      let req = new XMLHttpRequest();
      req.onreadystatechange = function(){
        if(this.status == 200){
          let res = JSON.parse(this.responseText)['items'][0]['components'];
          let addressText = '';
          for(let i=0; i<res.length ; i++){addressText += res[i];}
          address.value = addressText;
        }
      };
      req.open('GET', `http://zipcoda.net/api?zipcode=${zipCode.value}`);
      req.send();
    }
  });

  address.addEventListener('keyup', function(){
    if(address.value.length  > 3){
      let req = new XMLHttpRequest();
      req.onreadystatechange = function(){
        if(this.status == 200){
          let zipcode = JSON.parse(this.responseText)['items'][0]['zipcode'];
          zipCode.value = zipcode;
        }
      };
      req.open('GET', `http://zipcoda.net/api?address=${address.value}`);
      req.send();
    }
  });

  for(let event of [zipCode, address]){
    event.addEventListener('click', function(){
      chrome.storage.local.get(['selectText'], function(data){
        if(data.selectText !== '') event.value = data.selectText;
      });
      chrome.storage.local.set({selectText: ''}, function(){});
    });
  }
};
