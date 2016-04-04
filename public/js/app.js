(function(){
  angular.module('marvelApp',['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', mainRouter])

  function mainRouter($stateProvider, $urlRouterProvider){

    // default route to prevent 404 errors
    $urlRouterProvider.otherwise('/')

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/home.html',
        controller: 'MainController as main'
      })
      .state('comics', {
        url: '/comics',
        templateUrl: 'partials/series.html',
        controller: 'ComicsController as comics'
      })
      // .state('detail', {
      //   url: '/comics/:id',
      //   templateUrl: 'partials/detail.html',
      //   controller: 'ComicDetailController as detail'
      // })
  }
})()
