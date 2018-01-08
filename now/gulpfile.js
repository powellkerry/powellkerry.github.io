'use strict';

var runSequence = require('run-sequence'),
	gulp = require('gulp'),
	webserver = require('gulp-webserver'),
    util = require('gulp-util'),
	rename = require('gulp-rename'),
	browserify = require('browserify'),
	babelify = require('babelify'),
	buffer = require('vinyl-buffer'),
	source = require('vinyl-source-stream');

var onError = function(err) {
	var errorMessage = '';
	util.beep();
	errorMessage += util.colors.red('\n-----------------------------------');
	errorMessage += util.colors.red('\n' + err.message);
	errorMessage += util.colors.red('\n-----------------------------------');
	console.log(errorMessage);
	this.emit('end');
};

gulp.task('default', function(cb){
	runSequence(['scripts'], ['watch', 'webserver'], cb);
});

gulp.task('scripts', function() {
	return browserify('main.js', {debug: true}).transform(babelify, {presets: ['es2017']}).bundle()
			.pipe(source('app.js'))
			.pipe(buffer())
			.pipe(rename('app.min.js'))
			.pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
	gulp.watch(['main.js','components/**/*.js'], ['scripts'] );
});

gulp.task('webserver', function() {
  	gulp.src('../now')
    	.pipe(webserver({
      		livereload: true,
      		directoryListing: false,
      		open: true
    	}));
});
