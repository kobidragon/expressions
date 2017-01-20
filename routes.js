// Routes
siteApp.config(function ($routeProvider) {

    $routeProvider

    .when('/', {
        templateUrl: 'pages/main.html',
        controller: 'mainController'
    })

    .when('/blog', {
        templateUrl: 'pages/blog.html',
        controller: 'blogController'
    })

    .when('/blog/:blogid', {
        templateUrl: 'pages/blog.html',
        controller: 'blogController'
    })

    .when('/3d', {
        templateUrl: 'pages/3d.html',
        controller: '3dController'
    })

    .when('/mneumonic', {
    templateUrl: 'pages/mneumonic.html',
    controller: 'mneumonicController'
    })


});