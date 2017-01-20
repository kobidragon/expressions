
siteApp.directive("threeTest", function() {
    return {
        template : "<h1>Made by a directive!</h1>"
    };
});


siteApp.directive("littleforestfooter", function($document) {
    return {
        templateUrl : "/pages/footer.html"
    }
});


