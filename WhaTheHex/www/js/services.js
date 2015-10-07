'use strict';

/* Services */

angular.module('service', [])


  /* DATA */

.factory('$data', function() {
  var data = {};
  return data;
})

/* PARSE FACTORY */
.factory('ParseService', function() {

    // Initialize Parse API
    Parse.initialize("j8jX9OOPtomsIsFwP1cWZPbUNgHMkRBLv7TCB5Td", "06S4CrrepaHbY9YTsd2ffq3bJLvjgD5Aa5HIVyUw");

    // Cache Current User
    var loggedInUser;

    // Define Parse Models
    var Palette = Parse.Object.extend("Palette");

    var ParseService = {
      name: "Parse",

      /* USERS */

      // Login a user
      login : function login(username, password, callback) {
    	  Parse.User.logIn(username, password, {
    	    success: function(user) {
            loggedInUser = user;
    	      callback(user);
    	    },
    	    error: function(user, error) {
    	      alert("Error: " + error.message);
    	    }
        });
      },

      // Register a user
      signUp : function signUp(username, password, email, callback) {
      	Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
            success: function(user) {
                user.set("email", email);
                loggedInUser = user;
                callback(user);
            },
            error: function(user, error) {
              alert("Error: " + error.message);
            }
        });
      },

      // Get current logged in user
      getUser : function getUser() {
        // if(loggedInUser) {
        //   return loggedInUser;
        // }
        return Parse.User.current();
      },

      // Logout current user
      logout : function logout(callback) {
        Parse.User.logOut();
      },


      /* QUERIES */

      // Get All Colours
      getPalettes : function getPalettes(callback) {
        var query = new Parse.Query(Palette);
        query.find({
          success : function(results) {
            callback(results);
          },
          error : function(error) {
            alert("Error" + error.message);
          }
        });
      },

      // Create A New Node
      addPalette : function addPalette(_hex, callback) {

        if(_hex == null) {
            alert('please fill in all fields');
            return;
        }
        console.log('HEX: ' + _hex);


        var params = {
          hex:_hex
        };

        var object = new Palette();
        object.save(params, {
          success: function(object) {
            callback();
          },
          error: function(error) {
            alert("Error: " + error.message);
          }
        });
      },

    };

    // The factory function returns ParseService, which is injected into controllers.
    return ParseService;
})

/* PHONEGAP FACTORIES */

.factory('phonegapReady', function() {
    return function (fn) {
        var queue = [];
        var impl = function () {
        queue.push(Array.prototype.slice.call(arguments));
    };

    document.addEventListener('deviceready', function () {
        queue.forEach(function (args) {
            fn.apply(this, args);
        });
        impl = fn;
    }, false);

    return function () {
        return impl.apply(this, arguments);
        };
    };
})
.factory('geolocation', function ($rootScope, phonegapReady) {
  return {
    getCurrentPosition: function (onSuccess, onError, options) {
        navigator.geolocation.getCurrentPosition(function () {
               var that = this,
               args = arguments;

               if (onSuccess) {
                   $rootScope.$apply(function () {
                        onSuccess.apply(that, args);
                   });
                   }
               }, function () {
                    var that = this,
                    args = arguments;

                   if (onError) {
                        $rootScope.$apply(function () {
                            onError.apply(that, args);
                        });
                   }
               },
            options);
        }
    };
});



;
