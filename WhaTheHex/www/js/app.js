(function() {
  'use strict';
  var module = angular.module('app', ['onsen']);


  //Live camera view controller
  module.controller('LiveController', function($scope) {

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
          destinationType: destinationType.DATA_URL,
          targetWidth: (window.innerWidth  * 0.8),
          targetHeight: (window.innerHeight  * 0.8)
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
        context.canvas.width  = (window.innerWidth * 0.8) - padding;
        context.canvas.height = (window.innerHeight * 0.8) - padding;

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

        context.drawImage(imageObj, padding, padding, imageObj.width, imageObj.height);
      }

      function updateColor(R, G, B) {
        $scope.hex = rgbToHex(R, G, B);
        //console.log($scope.hex);
        $scope.$apply();

        var element = document.getElementById("lbl");
        element.style.color = "rgb(" + R + "," + G + "," + B + ")";

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
          sourceType: source,
          targetWidth: window.innerWidth - 10,
          targetHeight: ((window.innerWidth /4) *3) -10
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
