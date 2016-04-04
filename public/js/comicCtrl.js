(function(){
  angular.module('marvelApp')
    .controller('ComicController', ComicController)

  ComicController.$inject = ['comicService']

  function ComicController(comicService){
    var vm = this

    vm.copyright = "Data provided by Marvel. © 2016 MARVEL"

    comicService.index().success(function(results) {
      vm.allComics = results.data.results
      console.log(results.data.results)
    })

    console.log("Comic Controller is being used")
  }
})()



// (function(){
//   angular.module('marvelApp')
//     .controller('ComicController', ComicController)
//
//   ComicController.$inject = ['comicService']
//
//   function ComicController(comicService){
//     var vm = this
//
//     vm.title = "The Comics Controller"
//
//     comicService.index().success(function(results) {
//       vm.allComics = results
//       console.log(vm.allComics)
//     })
//     console.log("Comics Controller is being used")
//   }
// })()
