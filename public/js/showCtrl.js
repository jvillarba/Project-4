// (function(){
//   angular.module('marvelApp')
//     .controller('ShowController', ShowController)
//
//   ShowController.$inject = ['comicsService', '$stateParams']
//
//   function ShowController(comicsService, $stateParams) {
//     var vm = this
//
//     vm.title = "The Show Detail Controller"
//
//     comicsService.show($stateParams.id).success(function(results) {
//       console.log(results)
//       vm.comic = results
//     })
//
//     console.log("Show Detail Controller is being used")
//   }
// })()
