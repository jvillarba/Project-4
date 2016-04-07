(function(){
  angular.module('marvelApp')
    .controller('IssueController', IssueController)

  IssueController.$inject = ['comicService','$stateParams']

  function IssueController(comicService, $stateParams) {
    var vm = this

    vm.title = "The Comic Page Issue Controller"

    comicService.show($stateParams.id).success(function(results) {
        console.log(results.data.results)
        vm.oneComic = results.data.results
    })

    console.log("comic page issue controller is being used")
  }
})()
