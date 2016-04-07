(function(){
  angular.module('marvelApp')
    .controller('IssueController', IssueController)

  IssueController.$inject = ['comicService', '$stateParams']

  function IssueController(comicService, $stateParams) {
    var vm = this

    vm.title = "The Comic Page Detail Controller"

    comicService.show($stateParams.id).success(function(results) {
        console.log(results.data.results)
        vm.oneComic = results.data.results
    })

    console.log("Comic Page Detail Controller is being used")
  }
})()
