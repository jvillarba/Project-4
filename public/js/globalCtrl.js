(function(){
    angular.module('marvelApp')
        .config(function($httpProvider){
            $httpProvider.interceptors.push('authInterceptor');
        })
        .controller('GlobalController', GlobalController)
        .factory('authInterceptor', authInterceptor)
        .service('user', userService)
        .service('auth', authService)
        .constant('API', '/api')

    GlobalController.$inject = ['auth', 'user', '$rootScope', '$state']

    function GlobalController(auth, user, $rootScope, $state){
        var vm = this
        vm.title = "This Is The Global Controller!"

        vm.loginUser = {}

        $rootScope.$on('$stateChangeStart', function(event, toState){
            console.log(toState)
            if(toState.name == "users" && !vm.isAuthed()){
                event.preventDefault()
                $state.go('login')
            }
        })

        function handleRequest(res) {
            var token = res.data ? res.data.token : null;
            if(token) {
                console.log('JWT:', token);
                $state.go('comics')
                }
            vm.message = res.data.message;
        }

        vm.login = function() {
            user.login(vm.loginUser.email, vm.loginUser.password)
                .then(handleRequest, handleRequest)
        }
        vm.register = function() {
            user.register(vm.username, vm.password)
                .then(handleRequest, handleRequest)
        }
        vm.getQuote = function() {
            user.getQuote()
                .then(handleRequest, handleRequest)
        }
        vm.logout = function() {
            auth.logout && auth.logout()
        }
        vm.isAuthed = function() {
            return auth.isAuthed ? auth.isAuthed() : false
        }
    }

    function authInterceptor(API, auth) {
        return {
            // automatically attach Authorization header
            request: function(config) {
                // only put access token header to our API
                if(config.url.startsWith('/api/')) {
                    var token = auth.getToken();
                    console.log(config.url.indexOf(API))
                    if(token) {
                        config.headers['x-access-token'] = token;
                    }
                }   
                // console.log(config)
                return config;
            },

            // If a token was sent back, save it
            response: function(res) {
                if(res.data.token) {
                    auth.saveToken(res.data.token);
                }

                return res;
            },
        }
    }

    function authService($window) {
        var self = this;

        // Add JWT methods here
        self.parseJwt = function(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        }

        self.saveToken = function(token) {
            $window.localStorage['jwtToken'] = token;
        }

        self.getToken = function() {
            return $window.localStorage['jwtToken'];
        }

        self.isAuthed = function() {
            var token = self.getToken();
            if(token) {
                var params = self.parseJwt(token);
                return Math.round(new Date().getTime() / 1000) <= params.exp;
            } else {
                return false;
            }
        }

        self.logout = function() {
            $window.localStorage.removeItem('jwtToken');
        }


    }

    function userService($http, API, auth) {
        var self = this;
        self.getQuote = function() {
            return $http.get(API + '/api/auth/quote')
        }

        // add authentication methods here

        self.login = function(email, password) {
            console.log("Trying to login")
            return $http.post('/api/authenticate', {
                email: email,
                password: password
            })
        };

    }
})()