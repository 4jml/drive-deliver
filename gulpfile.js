var gulp = require('gulp'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	plumber = require('gulp-plumber'),
	less = require('gulp-less');

/**
 * Assets
 */

gulp.task('assets-css', function() {
	return gulp.src('app/main.less')
		.pipe(plumber())
		.pipe(less().on('error', function(e) { console.log(e); }))
		.pipe(rename('main.css'))
		.pipe(gulp.dest('dist'));
});

gulp.task('assets-js', function() {
	return gulp.src('app/**/*.js')
		.pipe(concat('app.js'))
		.pipe(gulp.dest('dist'));
});


gulp.task('assets', ['assets-css', 'assets-js']);

/**
 * Misc
 */

gulp.task('default', ['assets']);

gulp.task('watch', function() {
	var watcher = gulp.watch(['app/**/*'], ['default']);

	watcher.on('change', function(event) {
		console.log('File '+ event.path +' was '+ event.type +', running tasks...');
	});
});