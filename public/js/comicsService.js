(function(){
  angular.module('marvelApp')
    .factory('comicsService', comicsService)

  comicsService.$inject = ['$http']

  function comicsService($http) {
    var service = {
      index: index,
      show: show
    }
    return service

    function index(){
      // API url here
      // http://gateway.marvel.com/v1/public/series?contains=comic&orderBy=title&titleStartsWith=e&limit=100&apikey=5e45799598348828dc44c8d57a384063&ts=6000000&hash=3ee98aaa969afe79643eb22a155ec6ef
      return $http.get('http://gateway.marvel.com/v1/public/series?contains=comic&orderBy=title&titleStartsWith=e&limit=100&apikey=5e45799598348828dc44c8d57a384063&ts=6000000&hash=3ee98aaa969afe79643eb22a155ec6ef')
    }

    function show(id){
      return $http.get('' + id)
    }
  }
})()
