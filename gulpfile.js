var gulp = require("gulp");
var shell = require("gulp-shell");

gulp.task("build", shell.task(["tsc -p ./app", "tsc -p ./spec"]));

gulp.task("watch", function(){
	gulp.watch(["app/*.ts", "spec/*.ts"], ["build"]);
});

gulp.task("dev", ["build"], shell.task(["karma start karma.config.js"]);

gulp.task("deploy", function(){
	//TODO: impleents uglyfy js, css and html
	//TODO: apply uncss
	//TODO: apply autoprefix
});

gulp.task("default", ["dev"]);