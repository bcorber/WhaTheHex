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
    
  module.controller('LiveController', function($scope, $data) 
    {

        //where the magic happens... on device ready GetCamera
        var mousePos = getMousePos(canvas, evt);
        var color = undefined;
      
      if(mouseDown && mousePos !== null && mousePos.x > padding && mousePos.x < padding + imageObj.width && mousePos.y > padding && mousePos.y < padding + imageObj.height) {

            // color picker image is 256x256 and is offset by 10px
            // from top and bottom
            var imageData = context.getImageData(padding, padding, imageObj.width, imageObj.width);
            var data = imageData.data;
            var x = mousePos.x - padding;
            var y = mousePos.y - padding;
            var red = data[((imageObj.width * y) + x) * 4];
            var green = data[((imageObj.width * y) + x) * 4 + 1];
            var blue = data[((imageObj.width * y) + x) * 4 + 2];
//            var color = 'rgb(' + red + ',' + green + ',' + blue + ')';
//            drawColorSquare(canvas, color, imageObj);
          }
//        }, false

      
    });
    
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
            $scope.hex = '';
         
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

