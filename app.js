
// Modules
var siteApp = angular.module('siteApp', ['ngRoute','ngResource', 'ngSanitize']);


siteApp.run(function($rootScope, $route, $location){
   //Bind the `$locationChangeSuccess` event on the rootScope, so that we dont need to 
   //bind in induvidual controllers.

   $rootScope.previousLocation = '/'

   $rootScope.$on('$locationChangeSuccess', function() {
        $rootScope.actualLocation = $location.path();
        console.log('location changed - actual location  ' + $rootScope.actualLocation);
        console.log('location changed - previous location  ' + $rootScope.previousLocation);


        //if leaving /3d location  - leave for future reference   

        if($rootScope.previousLocation === '/3d') {

        }

        $rootScope.previousLocation = $rootScope.actualLocation;

    });        


});