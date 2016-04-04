(function(){
    angular.module('marvelApp')
        .controller('DetailController', DetailController)
        
    DetailController.$inject = ['userService', '$stateParams']
    
    function DetailController(userService, $stateParams){
        var vm = this
        vm.title = "this is the DETAIL controller"
        
        userService.show($stateParams.id).success(function(results){
            vm.user = results
            console.log(vm.user)
        })
        
        vm.edit = function(){
            vm.editing = true
            vm.editingUser = {
                name: vm.user.name,
                email: vm.user.email
            }
        }
        
        vm.update = function(){
            // patch request will go here
            userService.update($stateParams.id, vm.editingUser).success(function(response){
                vm.editing = false
                vm.user = response.user
            })
        }
    }
})()