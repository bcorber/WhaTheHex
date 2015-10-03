(function(){
  'use strict';
  var module = angular.module('app', ['onsen']);

  module.controller('AppController', function($scope, $data) {

      
      
      
      
  });

  module.controller
  ('DetailController', function($scope, $data) 
    {
        $scope.item = $data.selectedItem;
    }
  );
    
    //Live camera view controller
    
  module.controller('LiveController', function($scope, $data) {
      
      
      
        var setCanvasFromImage = function(_data) {
        var img = new Image,
        canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        src = "data:image/jpeg;base64," + _data; // insert image url here

        img.crossOrigin = "Anonymous";

        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage( img, 0, 0 );
            localStorage.setItem( "savedImageData", canvas.toDataURL("image/jpeg") );

            img.src = src;
            // make sure the load event fires for cached images too
            if ( img.complete || img.complete === undefined ) {
                img.src = "data:image/jpeg;base64," + _data;
                img.src = src;
            }
        }
    }
        
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
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
        }
      
    });
    
    
    //App's Help page controller
    
     module.controller('HelpController', function($scope, $data) 
    {

        //where the magic happens... N/A
      
    });
    

  module.controller('MasterController', function($scope, $data) {
    $scope.items = $data.items;

    $scope.showDetail = function(index) {
      var selectedItem = $data.items[index];
      $data.selectedItem = selectedItem;
      $scope.navi.pushPage('detail.html', {title : selectedItem.title});
    };
  });

  module.factory('$data', function() {
      var data = {};

      data.items = [
          {
              title: 'Item 1 Title',
              label: '4h',
              desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          },
          {
              title: 'Another Item Title',
              label: '6h',
              desc: 'Ut enim ad minim veniam.'
          },
          {
              title: 'Yet Another Item Title',
              label: '1day ago',
              desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
          },
          {
              title: 'Yet Another Item Title',
              label: '1day ago',
              desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
          }
      ];

      return data;
  });
    
})();

