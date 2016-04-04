(function(){
    angular.module('app',[])
        .factory('authInterceptor', authInterceptor)
        .service('user', userService)
        .service('auth', authService)
        .config(function($httpProvider){
        $httpProvider.interceptors.push('authInterceptor')  
        })
        .controller('Main', MainCtrl)

    function MainCtrl(user, auth){
        var self = this
        
        function handleRequest(res){
            var token = res.data ? res.data.token : null;
            if (token){
                console.log('JWT:', token)
                // auth.saveToken(token)
            }
            self.message = res.data.message
        }
        self.login = function(){
            user.login(self.name, self.email, self.password)
                .then(handleRequest, handleRequest)
        }
    }

    function userService($http){
        var self = this
        
        self.login = function(name, email, password){
            return $http.post('api/authenticate', {
                name: name,
                email: email,
                password: password
            })
        }
    }

    function authService($window){
        var self = this
        
        self.saveToken = function(token){
            $window.localStorage['jwtToken'] = token
        }
    }

    function authInterceptor(auth){
        return {
            response: function(res){
                if(res.data.token){auth.saveToken(res.data.token)}
                return res
            }
        }
    }
})()