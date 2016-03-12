app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
    /*.state('abstract', {
      templateUrl: 'pages/abstract.html',
      abstract: true
    })*/
    .state('/', {
      url: '/',
      templateUrl: 'pages/home.html',
      controller: 'HomeController',
      controllerAs: 'home'
      //parent: 'abstract'
    })
    .state('login', {
      url:'/login',
      templateUrl: 'pages/login.html',
      controller: 'HomeController',
      controllerAs: 'login'
    })
    .state('notification', {
      url:'/notification',
      templateUrl: 'pages/notifications.html',
      controller: 'NotificationController',
      controllerAs: 'home'
    })
});
