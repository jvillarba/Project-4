(function(){
  angular.module('marvelApp')
    .factory('comicService', comicService)

  comicService.$inject = ['$http']



  function comicService($http) {
    var service = {
      index: index,
      show: show
    }
    return service

    function index(){
      // API url here
      // 'http://gateway.marvel.com/v1/public/series?contains=comic&orderBy=title&limit=100&apikey='+process.env.MARVEL_PUBLICKEY+'&ts=6000000&hash='+process.env.MARVEL_HASH
      // 'http://gateway.marvel.com/v1/public/series?contains=comic&orderBy=title&limit=100&apikey=5e45799598348828dc44c8d57a384063&ts=6000000&hash=3ee98aaa969afe79643eb22a155ec6ef'
      return $http.get('//gateway.marvel.com/v1/public/series?contains=comic&orderBy=title&limit=100&apikey=5e45799598348828dc44c8d57a384063&ts=6000000&hash=3ee98aaa969afe79643eb22a155ec6ef')
    }

    function show(id){
      console.log(id)
      // 'http://gateway.marvel.com:80/v1/public/series/'+id+'/comics?formatType=comic&noVariants=false&hasDigitalIssue=true&orderBy=title&apikey=5e45799598348828dc44c8d57a384063&ts=6000000&hash=3ee98aaa969afe79643eb22a155ec6ef'
      // http://gateway.marvel.com/v1/public/series/' + id + '/comics?apikey=5e45799598348828dc44c8d57a384063&ts=6000000&hash=3ee98aaa969afe79643eb22a155ec6ef
      return $http.get('//gateway.marvel.com/v1/public/series/' + id + '/comics?apikey=5e45799598348828dc44c8d57a384063&ts=6000000&hash=3ee98aaa969afe79643eb22a155ec6ef')
    }
  }
})()
