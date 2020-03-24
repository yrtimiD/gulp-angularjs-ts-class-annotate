const path = require("path");
const gulp = require("gulp");
const ngAnnotate = require("../");

gulp.task("default", function () {
	return gulp.src(path.join(__dirname, "./src/*.ts"))
		.pipe(ngAnnotate())
		.pipe(gulp.dest("annotated"));
});
