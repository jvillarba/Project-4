(function(){
  angular.module('marvelApp')
    .controller('MainController', MainController)

  MainController.$inject = ['userService', '$state']

  function MainController(userService, $state){
    var vm = this
    vm.title = "The Main Controller"
    vm.newUser = {}

    // vm.currentUser = {name: "Joe"}
    console.log("Main Controller is being used")

    userService.index().success(function(results){
        vm.users = results
    })

    vm.create = function(){
        // run userService create method
        userService.create(vm.newUser).success(function(response){
            $state.go('detail', {id: response.user._id})
        })
    }
    
    vm.destroy = function(id, index){
        userService.destroy(id).success(function(response){
            console.log(response)
            vm.users.splice(index, 1)
        })
    }
  }
})()
