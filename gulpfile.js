var gulp = require('gulp');
var shell = require('gulp-shell');
var sequence = require('run-sequence');
var exit = require('gulp-exit');

gulp.task('webdriver-start', shell.task('webdriver-manager start'));
gulp.task('e2e',shell.task('protractor protractor.config.js'));

//incomplete
//gulp.task('e2e', function(cb){
//	//TODO: check if webdriver is runnig 
//	sequence(
//		['webdriver-start', 'protractor-start'],
//		function() {
//	      gulp.src("").pipe(exit());
//	      cb();
//		}
//	);
//});

gulp.task('watch-e2e', function(){
	gulp.watch(['specs/*spec.js', 'app/assets/js/*.js'], ['e2e']);
});