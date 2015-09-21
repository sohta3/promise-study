///<reference path='./app.ts' />
var promiseStudy;
(function (promiseStudy) {
    "use strict";
    angular.module("promiseStudy", []).controller('PromiseStudyController', ['$scope', promiseStudy.PromiseStudyController]);
})(promiseStudy || (promiseStudy = {}));
