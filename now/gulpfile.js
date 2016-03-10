'use strict';

var browserSync = require('browser-sync'),
	nodemon = require('gulp-nodemon'),
	runSequence = require('run-sequence'),
	gulp = require('gulp'),
	webserver = require('gulp-webserver'),
    util = require('gulp-util'),
	plumber = require('gulp-plumber'),
	filter = require('gulp-filter'),
	rename = require('gulp-rename'),
	sourcemaps = require('gulp-sourcemaps'),
	sass = require('gulp-sass'),
	cmq = require('gulp-combine-media-queries'),
	autoprefixer = require('gulp-autoprefixer'),
	browserify = require('browserify'),
	babelify = require('babelify'),
	buffer = require('vinyl-buffer'),
	source = require('vinyl-source-stream'),
	minifyCSS = require('gulp-minify-css');

var onError = function(err) {
	var errorMessage = '';
	util.beep();
	errorMessage += util.colors.red('\n-----------------------------------');
	errorMessage += util.colors.red('\n' + err.message);
	errorMessage += util.colors.red('\n-----------------------------------');
	console.log(errorMessage);
	this.emit('end');
};

var customSassError = function(err) {
	var errorMessage = '';
	util.beep();
	errorMessage += util.colors.red('\n-----------------------------------');
	errorMessage += util.colors.red('\n' + err.file);
	errorMessage += util.colors.red('\n' + err.message);
	errorMessage += util.colors.red('\nline: ' + err.line + ' col: ' + err.column);
	errorMessage += util.colors.red('\n-----------------------------------');
	errorMessage += '\n';
	console.log(errorMessage);
};

gulp.task('default', function(cb){
	runSequence(['styles', 'scripts'], ['watch', 'webserver'], cb);
});

gulp.task('styles', function() {
	var cssFilter = filter(['**/*.css']);
	return gulp.src('main.scss')
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		.pipe(sass({
			onError: customSassError
		}))
		.pipe(rename(function(path) {
			path.basename = path.basename.replace('main', 'all');
			path.extname = '.min.css';
		}))
		.pipe(cmq())
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(minifyCSS())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist'))
		.pipe(cssFilter)
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('scripts', function() {
	return browserify('main.js', {debug: true}).transform(babelify, {presets: ['es2015', 'react']}).bundle()
			.pipe(source('app.js'))
			.pipe(buffer())
			.pipe(rename('app.min.js'))
			.pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
	gulp.watch('**/*.scss', ['styles'] );
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
