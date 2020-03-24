# gulp-angularjs-ts-class-annotate
Gulp plugin which adds AngularJS dependency annotation for Typescript classes

## Important notes and limitations
* Only typescript classes are supported.
* Adds AngularJS $inject statement for constructors in all classes, regardless if they are registered in the AngularJS injector or not.
* Existing $inject statements are totally ignored.

## Motivation
* Do not write code which may be automatically generated
* Makes typescript files ready for uglification after compiling to js

## Usage example
```sh
npm install --save-dev gulp-angularjs-ts-class-annotate
```
[typescript@3](https://www.npmjs.com/package/typescript) is a peer dependency, make sure to install it (if not have already):
```sh
npm install --save-dev typescript@3
```

```js
const gulp = require("gulp");
const ngAnnotate = require("gulp-angularjs-ts-class-annotate");

gulp.task("annotate", function () {
	return gulp.src("./src/**/*.ts")
		.pipe(ngAnnotate())
		.pipe(gulp.dest("annotated"));
});

```
After running gulp task, original typescript file
```typescript
class Class1 {
	constructor(private $log: ng.ILogService, private $window: ng.IWindowService) {
	}
}
```
will be saved as:
```typescript
class Class1 {
static $inject = ["$log","$window"];
	constructor(private $log: ng.ILogService, private $window: ng.IWindowService) {
	}
}
```

## Building locally
```sh
npm install
npm install typescript@3 --no-save
npm run demo
```