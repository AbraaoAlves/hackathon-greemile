var gulp = require('gulp');
var shell = require('shelljs');

gulp.task('e2e', function (cb) {
	shell.exec("http-server ./app/ -i", {silent:true, async:true});
	shell.exec("webdriver-manager start", {silent:true,async:true});
	
	shell.exec("protractor protractor.config.js", function(code, output){
		shell.exit(0);	
	});
});