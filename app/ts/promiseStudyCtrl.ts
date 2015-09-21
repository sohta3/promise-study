///<reference path='./app.ts' />

module promiseStudy {

	"use strict";


	export class PromiseStudyController {

		public static $inject = [
			'$scope',
			'$timeout',
			'$q'
		];

		constructor(private $scope:ng.IScope,
					private $timeout:ng.ITimeoutService,
					private $q:ng.IQService) {
		}

		greetA():void {
			this.doSomethingSuccess().then((result) => {
				console.info('success!!!');
			}, (result) => {
				console.error('failure!!!');
			}, (notify) => {
				console.log(notify);
			});
		}

		greetB():void {
			this.doSomethingFailure().then((result) => {
				console.info('success!!!');
			}, (result) => {
				console.error('failure!!!');
			}, (notify) => {
				console.log(notify);
			});
		}

		greetC():void {
			this.doSomethingSuccess().then((result) => {
				console.info('success!!!');
			}).catch((result) => {
				console.error('failure!!!');
			}).finally(() => {
				console.log('finally!!!');
			});
		}

		greetD():void {
			this.doSomethingFailure().then((result) => {
				console.info('success!!!');
			}).catch((result) => {
				console.error('failure!!!');
			}).finally(() => {
				console.log('finally!!!');
			});
		}

		greetE():void {
			this.asyncCountUp(0).then((n) => {
				console.log('chain!!!');
				return this.asyncCountUp(n);
			}).then((n) => {
				console.log('chain!!!');
				return this.asyncCountUp(n);
			}).then((n) => {
				console.log('chain!!!');
				return this.asyncCountUp(n);
			}).then((n) => {
				console.log('chain!!!');
				return this.asyncCountUp(n);
			}).then((n) => {
				console.log(n);	// 5
			}).finally(() => {
				console.log('finally!!!');
			});
		}

		greetF():void {
			this.asyncCountUp(0).then((n) => {
				console.log('chain!!!');
				return this.asyncCountUp(n);
			}).then((n) => {
				console.log('chain!!!');
				return this.asyncCountUp(n);
			}).then((n) => {
				console.log('chain!!!');
				return n + 1;
			}).then((n) => {
				console.log('chain!!!');
				return n + 1;
			}).then((n) => {
				console.log(n);	// 5
			}).finally(() => {
				console.log('finally!!!');
			});
		}

		greetG():void {
			this.asyncCountUp(0).then((n) => {
				n + 1;
			}).then((n) => {
				console.log('chain!!!');
				// do nothing
			}).then((n) => {
				console.log('chain!!!');
				// do nothing
			}).then((n) => {
				console.log(n); // undefined
			}).finally(() => {
				console.log('finally!!!');
			});
		}

		greetH():void {
			this.asyncCountUp(0).then((n) => {
				console.log('chain!!!');
				return this.asyncCountUp(n);
			}).then((n) => {
				console.log('chain!!!');
				return n + 1;
			}).then((n) => {
				console.log('chain!!!');
				return this.$q.reject(n);
			}).then((n) => {
				console.log('chain!!!');
				return this.asyncCountUp(n);	// skip
			}).then((n) => {
				console.log('chain!!!');
				return this.asyncCountUp(n);	// skip
			}).then((n) => {
				console.log(n);
			}).catch((n) => {
				console.error(n); 	// 3
			}).finally(() => {
				console.log('finally!!!');
			});
		}

		greetI():void {
			this.asyncCountUp(0).then((n) => {
				return this.asyncCountUp(n);
			}).then((n) => {
				return n + 1;
			}).then((n) => {
				return this.$q.reject(n);
			}).then((n) => {
				return this.asyncCountUp(n);	// skip
			}).then((n) => {
				return this.asyncCountUp(n);	// skip
			}).then((n) => {
				console.log(n);
			}).catch((n) => {
				console.error(n);
				return this.asyncCountUp(n);	// 再開
			}).then((n) => {
				return this.asyncCountUp(n);
			}).then((n) => {
				console.log(n);	// 5
			}).finally(() => {
				console.log('finally!!!');
			});
		}

		greetJ():void {
			this.asyncCountUp(0).then((n) => {
				return this.asyncCountUp(n);
			}).then((n) => {
				return n + 1;
			}).finally(() => {
				console.log('finally!!!');
			}).then((n) => {
				return n + 1;
			}).then((n) => {
				return n + 1;
			}).then((n) => {
				console.log(n);	// 5
			});
		}

		greetK():void {
			this.$q.when(this.syncCountUp(0)).then((n) => {
				return this.asyncCountUp(n);
			}).then((n) => {
				return n + 1;
			}).then((n) => {
				return n + 1;
			}).then((n) => {
				return n + 1;
			}).then((n) => {
				console.log(n);	// 5
			});
		}

		greetL():void {
			this.$q.all([this.asyncCountUp(0), this.asyncCountUp(1), this.asyncCountUp(2)]).then((result) => {
				console.log(result);	// [1, 2, 3]
			});
		}

		greetM():void {
			this.$q.all([this.asyncCountUp(0), this.doSomethingFailure(), this.asyncCountUp(2)]).then((result) => {
				console.log(result);
			}).catch((result) => {
				console.log(result);
			});
		}

		greetN():void {
			this.doSomethingSuccess().then((result) => {
				return this.doSomethingFailure();
			}, (result) => {
				console.log('rejected!!!');	// never called
			})
		}

		greetO():void {
			this.doSomethingSuccess().then((result) => {
				return this.doSomethingFailure();
			}).catch((result) => {
				console.log('rejected!!!');
			})
		}

		greetP():void {
			this.doSomethingSuccess().then((result) => {
				throw new Error('error!!!');
			}).catch((result) => {
				console.log(result);
				console.log('rejected!!!');
				return true;
			}).then(() => {
				console.log('recovery!!!');
			});
		}

		doSomethingSuccess():ng.IPromise<any> {
			var d = this.$q.defer();

			this.$timeout(() => {
				// 遅延させないとnotifyとどかない（notifyはnextTickで発行される）
				d.notify('this is notify');
				d.resolve('JoJo');
			}, 100);

			return d.promise;
		}

		doSomethingFailure():ng.IPromise<any> {
			var d = this.$q.defer();

			this.$timeout(() => {
				// 遅延させないとnotifyとどかない（notifyはnextTickで発行される）
				d.notify('this is notify');
				d.reject('DIO');
			}, 100);

			return d.promise;
		}

		asyncCountUp(n:number):ng.IPromise<any> {
			var d = this.$q.defer();

			this.$timeout(() => {
				d.resolve(n + 1);
			}, 100);

			return d.promise;
		}

		syncCountUp(n:number):number {
			return n + 1;
		}
	}
}