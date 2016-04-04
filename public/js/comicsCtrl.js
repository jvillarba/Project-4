(function(){
  angular.module('marvelApp')
    .controller('ComicsController', ComicsController)

  ComicsController.$inject = ['comicsService']

  function ComicsController(comicsService){
    var vm = this

    vm.copyright = "Data provided by Marvel. © 2016 MARVEL"

    comicsService.index().success(function(results) {
      vm.allComics = results.data.results
      console.log(results.data.results)
    })

    console.log("Comics Controller is being used")
  }
})()



// (function(){
//   angular.module('marvelApp')
//     .controller('ComicsController', ComicsController)
//
//   ComicsController.$inject = ['comicsService']
//
//   function ComicsController(comicsService){
//     var vm = this
//
//     vm.title = "The Comics Controller"
//
//     comicsService.index().success(function(results) {
//       vm.allComics = results
//       console.log(vm.allComics)
//     })
//     console.log("Comics Controller is being used")
//   }
// })()
