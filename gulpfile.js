var gulp = require('gulp');
var task = require('gulp-shell').task;
var sh = require('shelljs');
var browserSync = require('browser-sync').create();

var bsOptions = {
 	ui: {
	    port: 3001,
	    weinre: {
	        port: 8081
	    }
	},
	port:8080,
    server: './app'
};

gulp.task('build', task('tsc --project ./app/sources/'));
gulp.task('webdriver', task('webdriver-manager start'));
gulp.task('e2e', ['build'], task('protractor protractor.config.js'));

gulp.task('serve', function(){
	browserSync.init(bsOptions);
	
	watchSourceFiles();
});

gulp.task('serve:e2e',function(){
	browserSync.init(bsOptions);
	sh.exec('gulp webdriver', {silent:true, async:true});	
	
	watchSourceFiles();
	gulp.watch(['specs/*spec.js'], ['e2e']);
});

function watchSourceFiles(){
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/assets/css/*.css', browserSync.reload);
	gulp.watch(['app/sources/ts/*.ts'], ['e2e'], browserSync.reload);
}

if(!sh.which('protractor')){
	sh.echo('Gulp tasks require: `npm install -g protractor`'); sh.exit(1);
}
if(!sh.which('tsc')){
	sh.echo('Gulp tasks require: `npm install -g typescript`'); sh.exit(1);
}