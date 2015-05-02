var gulp = require('gulp');
var shell = require('gulp-shell');
var sequence = require('run-sequence');
var exit = require('gulp-exit');

gulp.task('webdriver-start', shell.task('webdriver-manager start'));
gulp.task('protractor-start', shell.task('protractor protractor.config.js'));

gulp.task('e2e', function(cb){
	sequence(
		'webdriver-start',
		'protractor-start',
		function() {
	      gulp.src("").pipe(exit());
	      cb();
		}
	);
});

gulp.task('watch-e2e', function(){
	gulp.watch(['specs/*spec.js', 'app/assets/js/*.js'], ['e2e']);
});