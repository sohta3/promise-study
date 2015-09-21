///<reference path='./app.ts' />
var promiseStudy;
(function (promiseStudy) {
    "use strict";
    var PromiseStudyController = (function () {
        function PromiseStudyController($scope, $timeout, $q) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.$q = $q;
        }
        PromiseStudyController.prototype.greetA = function () {
            this.doSomethingSuccess().then(function (result) {
                console.info('success!!!');
            }, function (result) {
                console.error('failure!!!');
            }, function (notify) {
                console.log(notify);
            });
        };
        PromiseStudyController.prototype.greetB = function () {
            this.doSomethingFailure().then(function (result) {
                console.info('success!!!');
            }, function (result) {
                console.error('failure!!!');
            }, function (notify) {
                console.log(notify);
            });
        };
        PromiseStudyController.prototype.greetC = function () {
            this.doSomethingSuccess().then(function (result) {
                console.info('success!!!');
            }).catch(function (result) {
                console.error('failure!!!');
            }).finally(function () {
                console.log('finally!!!');
            });
        };
        PromiseStudyController.prototype.greetD = function () {
            this.doSomethingFailure().then(function (result) {
                console.info('success!!!');
            }).catch(function (result) {
                console.error('failure!!!');
            }).finally(function () {
                console.log('finally!!!');
            });
        };
        PromiseStudyController.prototype.greetE = function () {
            var _this = this;
            this.asyncCountUp(0).then(function (n) {
                console.log('chain!!!');
                return _this.asyncCountUp(n);
            }).then(function (n) {
                console.log('chain!!!');
                return _this.asyncCountUp(n);
            }).then(function (n) {
                console.log('chain!!!');
                return _this.asyncCountUp(n);
            }).then(function (n) {
                console.log('chain!!!');
                return _this.asyncCountUp(n);
            }).then(function (n) {
                console.log(n); // 5
            }).finally(function () {
                console.log('finally!!!');
            });
        };
        PromiseStudyController.prototype.greetF = function () {
            var _this = this;
            this.asyncCountUp(0).then(function (n) {
                console.log('chain!!!');
                return _this.asyncCountUp(n);
            }).then(function (n) {
                console.log('chain!!!');
                return _this.asyncCountUp(n);
            }).then(function (n) {
                console.log('chain!!!');
                return n + 1;
            }).then(function (n) {
                console.log('chain!!!');
                return n + 1;
            }).then(function (n) {
                console.log(n); // 5
            }).finally(function () {
                console.log('finally!!!');
            });
        };
        PromiseStudyController.prototype.greetG = function () {
            this.asyncCountUp(0).then(function (n) {
                n + 1;
            }).then(function (n) {
                console.log('chain!!!');
                // do nothing
            }).then(function (n) {
                console.log('chain!!!');
                // do nothing
            }).then(function (n) {
                console.log(n); // undefined
            }).finally(function () {
                console.log('finally!!!');
            });
        };
        PromiseStudyController.prototype.greetH = function () {
            var _this = this;
            this.asyncCountUp(0).then(function (n) {
                console.log('chain!!!');
                return _this.asyncCountUp(n);
            }).then(function (n) {
                console.log('chain!!!');
                return n + 1;
            }).then(function (n) {
                console.log('chain!!!');
                return _this.$q.reject(n);
            }).then(function (n) {
                console.log('chain!!!');
                return _this.asyncCountUp(n); // skip
            }).then(function (n) {
                console.log('chain!!!');
                return _this.asyncCountUp(n); // skip
            }).then(function (n) {
                console.log(n);
            }).catch(function (n) {
                console.error(n); // 3
            }).finally(function () {
                console.log('finally!!!');
            });
        };
        PromiseStudyController.prototype.greetI = function () {
            var _this = this;
            this.asyncCountUp(0).then(function (n) {
                return _this.asyncCountUp(n);
            }).then(function (n) {
                return n + 1;
            }).then(function (n) {
                return _this.$q.reject(n);
            }).then(function (n) {
                return _this.asyncCountUp(n); // skip
            }).then(function (n) {
                return _this.asyncCountUp(n); // skip
            }).then(function (n) {
                console.log(n);
            }).catch(function (n) {
                console.error(n);
                return _this.asyncCountUp(n); // 再開
            }).then(function (n) {
                return _this.asyncCountUp(n);
            }).then(function (n) {
                console.log(n); // 5
            }).finally(function () {
                console.log('finally!!!');
            });
        };
        PromiseStudyController.prototype.greetJ = function () {
            var _this = this;
            this.asyncCountUp(0).then(function (n) {
                return _this.asyncCountUp(n);
            }).then(function (n) {
                return n + 1;
            }).finally(function () {
                console.log('finally!!!');
            }).then(function (n) {
                return n + 1;
            }).then(function (n) {
                return n + 1;
            }).then(function (n) {
                console.log(n); // 5
            });
        };
        PromiseStudyController.prototype.greetK = function () {
            var _this = this;
            this.$q.when(this.syncCountUp(0)).then(function (n) {
                return _this.asyncCountUp(n);
            }).then(function (n) {
                return n + 1;
            }).then(function (n) {
                return n + 1;
            }).then(function (n) {
                return n + 1;
            }).then(function (n) {
                console.log(n); // 5
            });
        };
        PromiseStudyController.prototype.greetL = function () {
            this.$q.all([this.asyncCountUp(0), this.asyncCountUp(1), this.asyncCountUp(2)]).then(function (result) {
                console.log(result); // [1, 2, 3]
            });
        };
        PromiseStudyController.prototype.greetM = function () {
            this.$q.all([this.asyncCountUp(0), this.doSomethingFailure(), this.asyncCountUp(2)]).then(function (result) {
                console.log(result);
            }).catch(function (result) {
                console.log(result);
            });
        };
        PromiseStudyController.prototype.greetN = function () {
            var _this = this;
            this.doSomethingSuccess().then(function (result) {
                return _this.doSomethingFailure();
            }, function (result) {
                console.log('rejected!!!'); // never called
            });
        };
        PromiseStudyController.prototype.greetO = function () {
            var _this = this;
            this.doSomethingSuccess().then(function (result) {
                return _this.doSomethingFailure();
            }).catch(function (result) {
                console.log('rejected!!!');
            });
        };
        PromiseStudyController.prototype.greetP = function () {
            this.doSomethingSuccess().then(function (result) {
                throw new Error('error!!!');
            }).catch(function (result) {
                console.log(result);
                console.log('rejected!!!');
                return true;
            }).then(function () {
                console.log('recovery!!!');
            });
        };
        PromiseStudyController.prototype.doSomethingSuccess = function () {
            var d = this.$q.defer();
            this.$timeout(function () {
                // 遅延させないとnotifyとどかない（notifyはnextTickで発行される）
                d.notify('this is notify');
                d.resolve('JoJo');
            }, 100);
            return d.promise;
        };
        PromiseStudyController.prototype.doSomethingFailure = function () {
            var d = this.$q.defer();
            this.$timeout(function () {
                // 遅延させないとnotifyとどかない（notifyはnextTickで発行される）
                d.notify('this is notify');
                d.reject('DIO');
            }, 100);
            return d.promise;
        };
        PromiseStudyController.prototype.asyncCountUp = function (n) {
            var d = this.$q.defer();
            this.$timeout(function () {
                d.resolve(n + 1);
            }, 100);
            return d.promise;
        };
        PromiseStudyController.prototype.syncCountUp = function (n) {
            return n + 1;
        };
        PromiseStudyController.$inject = [
            '$scope',
            '$timeout',
            '$q'
        ];
        return PromiseStudyController;
    })();
    promiseStudy.PromiseStudyController = PromiseStudyController;
})(promiseStudy || (promiseStudy = {}));
///<reference path='./app.ts' />
var promiseStudy;
(function (promiseStudy) {
    "use strict";
    angular.module("promiseStudy", []).controller('PromiseStudyController', promiseStudy.PromiseStudyController);
})(promiseStudy || (promiseStudy = {}));
///<reference path='../typings/angular/angular.d.ts' />
///<reference path='./promiseStudyCtrl.ts' />
///<reference path='./module.ts' />
