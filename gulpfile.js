var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'expanded'
};

// gulp.task('test', function(){
// 	console.log('testing 1 2 3')	
// });

gulp.task('sass', function(){
	return gulp.src('scss/styles.scss')
	.pipe(sourcemaps.init())
	.pipe(sass(sassOptions).on('error', sass.logError))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('app/css'))	
	.pipe(browserSync.stream())
});

gulp.task('serve', ['sass'], function(){

	browserSync.init({
		server: './app'
	})



	gulp.watch('scss/**/*.scss', ['sass'])
	gulp.watch('app/**/*.html').on('change', browserSync.reload);
});