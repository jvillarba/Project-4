(function(){
  angular.module('marvelApp')
    .controller('ShowController', ShowController)

  ShowController.$inject = ['comicService', '$stateParams']

  function ShowController(comicService, $stateParams) {
    var vm = this

    vm.title = "The Comic Page Detail Controller"

    comicService.show($stateParams.id).success(function(results) {
        console.log(results.data.results)
        vm.allComics = results.data.results
    })
    
    console.log("Comic Page Detail Controller is being used")
  }
})()
