(function(){
  angular.module('marvelApp', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', mainRouter])

    function mainRouter($stateProvider, $urlRouterProvider){

        // default route to prevent 404 errors
        $urlRouterProvider.otherwise('/')

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'partials/home.html'
                // controller: 'MainController as main'
            })
            .state('users', {
                url: '/users',
                templateUrl: 'partials/users.html',
                controller: 'MainController as main'
            })
            .state('newUser', {
                url: '/users/new',
                templateUrl: 'partials/new.html',
                controller: 'MainController as main'
            })
            .state('detail', {
                url: '/users/:id',
                templateUrl: 'partials/detail.html',
                controller: 'DetailController as detail'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'partials/login.html'
            })
            .state('comics', {
                url: '/comics',
                templateUrl: 'partials/series.html',
                controller: 'ComicController as comics'
            })
            .state('comicpage', {
              url: '/comics/:id',
              templateUrl: 'partials/issue.html',
              controller: 'IssueController as issues'
            })
    }
})()
