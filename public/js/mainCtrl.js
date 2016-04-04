(function(){
  angular.module('marvelApp')
    .controller('MainController', MainController)

  function MainController(){
    var vm = this

    vm.title = "The Main Controller"

    vm.currentUser = {name: "Joe"}

    console.log("Main Controller is being used")
  }
})()
