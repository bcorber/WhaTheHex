(function() {
  'use strict';
  var module = angular.module('app', ['onsen']);


  //Live camera view controller
  module.controller('LiveController', function($scope) {

<<<<<<< HEAD
  module.controller
  ('DetailController', function($scope, $data) 
    {
        $scope.item = $data.selectedItem;
    }
  );
    
    //Live camera view controller
    
  module.controller('LiveController', function($scope, $data) {
      
      
      
//        var setCanvasFromImage = function(_data) {
//        var img = new Image,
//        canvas = document.createElement("canvas"),
//        ctx = canvas.getContext("2d"),
//        src = "data:image/jpeg;base64," + _data; // insert image url here
//
//        img.crossOrigin = "Anonymous";
//
//        img.onload = function() {
//            canvas.width = img.width;
//            canvas.height = img.height;
//            ctx.drawImage( img, 0, 0 );
//            localStorage.setItem( "savedImageData", canvas.toDataURL("image/jpeg") );
//
//            img.src = src;
//            // make sure the load event fires for cached images too
//            if ( img.complete || img.complete === undefined ) {
//                img.src = "data:image/jpeg;base64," + _data;
//                img.src = src;
//            }
//        }
//    }
//        
//        var canvas = document.getElementById('canvas');
//        var context = canvas.getContext('2d');
//        canvas.width = window.innerWidth;
//        canvas.height = window.innerHeight;
    });
      
//    var canvas = document.getElementById('canvas_picker').getContext('2d');
//
//    // create an image object and get it’s source
//    var img = new Image();
//    img.src = "data:image/jpeg;base64," + _data;
//
//    // copy the image to the canvas
//    $(img).load(function(){
//      canvas.drawImage(img,0,0);
//    });
//          
//      
//
//	// http://www.javascripter.net/faq/rgbtohex.htm
//	function rgbToHex(R,G,B) {return toHex(R)+toHex(G)+toHex(B)}
//	function toHex(n) {
//	  n = parseInt(n,10);
//	  if (isNaN(n)) return "00";
//	  n = Math.max(0,Math.min(n,255));
//	  return "0123456789ABCDEF".charAt((n-n%16)/16)  + "0123456789ABCDEF".charAt(n%16);
//	}
//	$('#canvas_picker').click(function(event){
//	  // getting user coordinates
//	  var x = event.pageX - this.offsetLeft;
//	  var y = event.pageY - this.offsetTop;
//	  // getting image data and RGB values
//	  var img_data = canvas.getImageData(x, y, 1, 1).data;
//	  var R = img_data[0];
//	  var G = img_data[1];
//	  var B = img_data[2];  var rgb = R + ',' + G + ',' + B;
//	  // convert RGB to HEX
//	  var hex = rgbToHex(R,G,B);
//	  // making the color the value of the input
//	  $('#rgb input').val(rgb);
//	  $('#hex input').val('#' + hex);
//	});
 
    
    
    //Device's photo gallery controller
    
     module.controller('GalleryController', function($scope, $data) 
    {

        //where the magic happens... on page load get phote
      
    });
    
    // App's saved colour pallete controller
    
     module.controller('PalletteController', function($scope, $data) 
    {

        //data pushed
      
    });
    
    //App's RGB slider controller
    
     module.controller('RgbController', function($scope, $data) 
    {

         
            $scope.red = 0;
            $scope.green = 255;
            $scope.blue = 255;
            $scope.hex = '00FFFF';
         
        $scope.updateColor = function (){
           var element = document.getElementById("color");  
           element.style.background = getColor();
        }
         
        function getColor(){   
            $scope.hex = rgbToHex($scope.red, $scope.green, $scope.blue);
            return "rgb(" +  $scope.red + ","   +  $scope.green + "," +  $scope.blue + ")";   
        }
                                    
        function rgbToHex(R,G,B) {
            return toHex(R)+toHex(G)+toHex(B)
        }
         
        function toHex(n) {
            n = parseInt(n,10);
            if (isNaN(n)) {
                return "00";
            }
            n = Math.max(0,Math.min(n,255));
            return "0123456789ABCDEF".charAt((n-n%16)/16)
              + "0123456789ABCDEF".charAt(n%16);
=======
      $scope.hex = '00FFFF';
      var pictureSource;
      var destinationType;

      document.addEventListener("deviceready", onDeviceReady, true);

      function onDeviceReady() {
        console.log('onDeviceReady');
        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;
        capturePhoto();
      }

      function capturePhoto() {
        console.log('capturePhoto');
        navigator.camera.getPicture(onSuccess, onFail, {
          quality: 50,
          destinationType: destinationType.DATA_URL
        });
      }

      function onSuccess(imageData) {
        console.log('onSuccess');
        setupImage(imageData);
      }

      function onFail(message) {
        console.log('Failed because: ' + message);
      }

      function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }

      function init(imageObj) {
        console.log('init');

        var padding = 10;
        var mouseDown = false;

        var canvas = document.getElementById('live-canvas');
        var context = canvas.getContext('2d');
        context.strokeStyle = '#444';
        context.lineWidth = 2;
        context.canvas.width  = window.innerWidth - padding;
        context.canvas.height = window.innerWidth - padding;

        canvas.addEventListener('mousedown', function() {
          mouseDown = true;
        }, false);

        canvas.addEventListener('mouseup', function(event) {
          console.log('mouseup');

          //mouseDown = false;
          var mousePos = getMousePos(canvas, event);
          var color = undefined;
          if (mouseDown && mousePos !== null && mousePos.x > padding && mousePos.x < padding + imageObj.width && mousePos.y > padding && mousePos.y < padding + imageObj.height) {
            var imageData = context.getImageData(padding, padding, imageObj.width, imageObj.width);
            var data = imageData.data;
            var x = mousePos.x - padding;
            var y = mousePos.y - padding;
            var red = data[((imageObj.width * y) + x) * 4];
            var green = data[((imageObj.width * y) + x) * 4 + 1];
            var blue = data[((imageObj.width * y) + x) * 4 + 2];
            //var color = 'rgb(' + red + ',' + green + ',' + blue + ')';
            //console.log('picked color is ' + color);
            updateColor(red, green, blue);
          }

        }, false);

        context.drawImage(imageObj, padding, padding);
      }

      function updateColor(R, G, B) {
        $scope.hex = rgbToHex(R, G, B);
        //console.log($scope.hex);
        $scope.$apply();
      }

      function rgbToHex(R, G, B) {
        return toHex(R) + toHex(G) + toHex(B)
      }

      function toHex(n) {
        n = parseInt(n, 10);
        if (isNaN(n)) {
          return "00";
>>>>>>> origin/master
        }
        n = Math.max(0, Math.min(n, 255));
        return "0123456789ABCDEF".charAt((n - n % 16) / 16) + "0123456789ABCDEF".charAt(n % 16);
      }

      function setupImage(_data) {
        console.log('setupImage');

        var imageObj = new Image();
        imageObj.onload = function() {
          init(this);
        };
        imageObj.src = "data:image/jpeg;base64," + _data;
      }

  });


  //Device's photo gallery controller
  module.controller('GalleryController', function($scope) {

      var pictureSource;
      var destinationType;

      document.addEventListener("deviceready", onDeviceReady, true);

      function onDeviceReady() {
        console.log('onDeviceReady');
        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;
        getPhoto(pictureSource.PHOTOLIBRARY);
      }

      function onSuccess(imageURI) {
        console.log('onSuccess');
        setupImage(imageURI);
      }

      function getPhoto(source) {
        console.log('getPhoto');
        navigator.camera.getPicture(onSuccess, onFail, {
          quality: 50,
          destinationType: destinationType.FILE_URI,
          sourceType: source
        });
      }

      function onFail(message) {
        alert('Failed because: ' + message);
      }

      function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }

      function init(imageObj) {
        console.log('init');

        var padding = 10;
        var mouseDown = false;

        var canvas = document.getElementById('gallery-canvas');
        var context = canvas.getContext('2d');
        context.strokeStyle = '#444';
        context.lineWidth = 2;
        context.canvas.width  = window.innerWidth - padding;
        context.canvas.height = window.innerWidth - padding;

        canvas.addEventListener('mousedown', function() {
          mouseDown = true;
        }, false);

        canvas.addEventListener('mouseup', function(event) {
          console.log('mouseup');

          //mouseDown = false;
          var mousePos = getMousePos(canvas, event);
          var color = undefined;
          if (mouseDown && mousePos !== null && mousePos.x > padding && mousePos.x < padding + imageObj.width && mousePos.y > padding && mousePos.y < padding + imageObj.height) {
            var imageData = context.getImageData(padding, padding, imageObj.width, imageObj.width);
            var data = imageData.data;
            var x = mousePos.x - padding;
            var y = mousePos.y - padding;
            var red = data[((imageObj.width * y) + x) * 4];
            var green = data[((imageObj.width * y) + x) * 4 + 1];
            var blue = data[((imageObj.width * y) + x) * 4 + 2];
            var color = 'rgb(' + red + ',' + green + ',' + blue + ')';
            console.log('picked color is ' + color);
            updateColor(red, green, blue);
          }

        }, false);

        context.drawImage(imageObj, padding, padding);
      }

      function updateColor(R, G, B) {
        $scope.hex = rgbToHex(R, G, B);
        console.log($scope.hex);
        $scope.$apply();
      }

      function rgbToHex(R, G, B) {
        return toHex(R) + toHex(G) + toHex(B)
      }

      function toHex(n) {
        n = parseInt(n, 10);
        if (isNaN(n)) {
          return "00";
        }
        n = Math.max(0, Math.min(n, 255));
        return "0123456789ABCDEF".charAt((n - n % 16) / 16) + "0123456789ABCDEF".charAt(n % 16);
      }

      function setupImage(_data) {
        console.log('setupImage');

        var imageObj = new Image();
        imageObj.onload = function() {
          init(this);
        };
        imageObj.src = _data;
      }


  });


  // App's saved colour pallete controller
  module.controller('PalletteController', function($scope) {
    //data pushed
  });


  //App's RGB slider controller
  module.controller('RgbController', function($scope) {

    $scope.red = 0;
    $scope.green = 255;
    $scope.blue = 255;
    $scope.hex = '00FFFF';

    $scope.updateColor = function() {
      var element = document.getElementById("color");
      element.style.background = getColor();
    }

    function getColor() {
      $scope.hex = rgbToHex($scope.red, $scope.green, $scope.blue);
      return "rgb(" + $scope.red + "," + $scope.green + "," + $scope.blue + ")";
    }

    function rgbToHex(R, G, B) {
      return toHex(R) + toHex(G) + toHex(B)
    }

    function toHex(n) {
      n = parseInt(n, 10);
      if (isNaN(n)) {
        return "00";
      }
      n = Math.max(0, Math.min(n, 255));
      return "0123456789ABCDEF".charAt((n - n % 16) / 16) + "0123456789ABCDEF".charAt(n % 16);
    }

  });


  //App's Help page controller
  module.controller('HelpController', function($scope) {
    //where the magic happens... N/A
  });


})();
