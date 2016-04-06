(function(){
  angular.module('marvelApp')
    .controller('ShowController', ShowController)

  ShowController.$inject = ['comicService', '$stateParams']

  function ShowController(comicService, $stateParams) {
    var vm = this

    vm.title = "The Show Detail Controller"

    comicService.show($stateParams.id).success(function(results) {
      console.log(results)
      vm.comic = results
    })

    console.log("Show Detail Controller is being used")
  }
})()
