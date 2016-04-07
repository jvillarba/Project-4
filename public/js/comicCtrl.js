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