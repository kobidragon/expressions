// Controllers
siteApp.controller('mainController', ['$scope', '$log', '$location', function($scope, $log, $location) {



}]);

siteApp.controller('blogController', ['$scope', '$log','$routeParams', function($scope, $log, $routeParams) {
    $scope.blogid = $routeParams.blogid || "welcome";
    $log.info("blogid is " + $scope.blogid);
        $log.info("routeParams is " + $routeParams.blogid);

    if ($scope.blogid == ":welcome") {
        $scope.blogurl = "/pages/blog_welcome.html",
        $log.info("blog url is " + $scope.blogurl);

    } else if ($scope.blogid == ":future") {
        $scope.blogurl = "/pages/blog_future.html",
        $log.info("blog url is " + $scope.blogurl);

    } else if ($scope.blogid == ":about") {
        $scope.blogurl = "/pages/blog_about.html",
        $log.info("blog url is " + $scope.blogurl);


    } else if ($scope.blogid == ":101") {
        $scope.blogurl = "/pages/blog_101.html",
        $log.info("blog url is " + $scope.blogurl);    
    
    } else if ($scope.blogid == ":101a") {
        $scope.blogurl = "/pages/blog_101a.html",
        $log.info("blog url is " + $scope.blogurl);

    } else if ($scope.blogid == ":101b") {
        $scope.blogurl = "/pages/blog_101b.html",
        $log.info("blog url is " + $scope.blogurl);
    
    } else if ($scope.blogid == ":102") {
        $scope.blogurl = "/pages/blog_102.html",
        $log.info("blog url is " + $scope.blogurl);    
    
    } else {
        $scope.blogurl = "/pages/blog_blank.html"
        $scope.locationerror = '<h3>undefined location ' + $scope.blogid + '</h3>';
    }





}]);

siteApp.controller('3dController', ['$scope', '$log', '$window', function($scope, $log, $window) {

}]);

// in footer.html
siteApp.controller('TopPageController', ['$scope', '$anchorScroll', function($scope, $anchorScroll) {

    $scope.topPage = function(){
        $anchorScroll();
    };

}]);

siteApp.controller('mneumonicController', ['$scope', '$log', '$window', 'mneumonicFactory', function($scope, $log, $window, mneumonicFactory) {

    $scope.phrase = "";
    $scope.genpassword = "";
    $scope.if4 = true;
    $scope.if3 = true;
    $scope.if2 = true;
    $scope.if1 = true;
    $scope.if0 = true;
    $scope.invalidalert = true;

    $scope.submitButton = function() {
        $log.info('Button clicked')
        $scope.if4 = true;
        $scope.if3 = true;
        $scope.if2 = true;
        $scope.if1 = true;
        $scope.if0 = true;
        $scope.invalidalert = true;

        var returnedObj = mneumonicFactory.genpass($scope.phrase);
        if (returnedObj.pass == 'InvalidEntryNumberOfWords') {
            $scope.genpassword = "";
            $scope.invalidalert = false;
        } else {
            $scope.genpassword = returnedObj.pass;
            $scope.zxcvbncrack = "Time to crack is " + returnedObj.crack;
            if (returnedObj.score == 4) {
                $scope.if4 = false;
            } else if (returnedObj.score == 3){
                $scope.if3 = false;
            } else if (returnedObj.score == 2) {
                $scope.if2 = false;
            } else if (returnedObj.score == 1) {
                $scope.if1 = false;
            } else if (returnedObj.score == 0) {
                $scope.if0 = false;
            }
        }

    } 


}]);  // end of mneumonicController



