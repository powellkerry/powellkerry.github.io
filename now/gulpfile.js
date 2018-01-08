'use strict';

var runSequence = require('run-sequence'),
	gulp = require('gulp'),
	webserver = require('gulp-webserver');

gulp.task('default', function(cb){
	runSequence(['webserver'], cb);
});

gulp.task('webserver', function() {
  	gulp.src('../now')
    	.pipe(webserver({
      		livereload: true,
      		directoryListing: false,
      		open: true
    	}));
});
