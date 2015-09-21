///<reference path='./app.ts' />
var promiseStudy;
(function (promiseStudy) {
    "use strict";
    var PromiseStudyController = (function () {
        function PromiseStudyController($scope) {
            this.$scope = $scope;
        }
        return PromiseStudyController;
    })();
    promiseStudy.PromiseStudyController = PromiseStudyController;
    angular.module("promiseStudy").controller("PromiseStudyController", PromiseStudyController);
})(promiseStudy || (promiseStudy = {}));
