// VARIABLES

var gulp                    = require('gulp');
var jade                    = require('gulp-jade');
var sass                    = require('gulp-sass');
var sourcemaps              = require('gulp-sourcemaps');
var autoprefixer            = require('gulp-autoprefixer');
var cssmin                  = require('gulp-cssmin');
// var neat                    = require('node-neat').includePaths;
var concat                  = require('gulp-concat');
var uglify                  = require('gulp-uglify');
var rename					        = require('gulp-rename');
var babel                   = require('gulp-babel');
var browserSync             = require('browser-sync');
var reload                  = browserSync.reload;


// TASKS

// Jade task
gulp.task('jade', function() {
	return gulp.src('src/jade/**/*.jade')
	.pipe(jade({ pretty: true }))
	.pipe(gulp.dest('dist/'))
});


// CSS task
gulp.task('scss', function() {
	return gulp.src(['src/scss/**/*.scss', '!src/scss/_/**/*.scss'])
	.pipe(sass({ style: 'compressed', 
		noCache: true}))
	.pipe(autoprefixer())
	.pipe(cssmin())
	.pipe(rename({
        suffix: '.min'
    }))
	.pipe(gulp.dest('dist/css'))
});

// JS task
gulp.task('js', function() {
	return gulp.src('src/js/**/*.js')
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(uglify())
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest('dist/js/'))
});

// Watch files for changes
gulp.task('watch', ['browser-sync'], function() {
	gulp.watch('dist/**/*.html', reload);
	gulp.watch('src/scss/**/*.scss', ['scss', reload]);
	gulp.watch('src/jade/**/*.jade', ['jade']);
	gulp.watch('src/js/**/*.js', ['js']);
});

// Spin up development server
gulp.task('browser-sync', function() {
	browserSync.init(['dist/css/**/*.css', 'dist/js/**/*.js'], {
		server: {
			baseDir: "dist/"
		}
	});
});

// Default task
gulp.task('default', ['scss', 'jade', 'js', 'watch', 'browser-sync']);
