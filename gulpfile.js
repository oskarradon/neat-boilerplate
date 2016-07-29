// -------------------------------------------------------------------------
// VARIABLES
// -------------------------------------------------------------------------


var gulp                    = require('gulp');
var jade                    = require('gulp-jade');
var sass                    = require('gulp-sass');
var sourcemaps              = require('gulp-sourcemaps');
var autoprefixer            = require('gulp-autoprefixer');
var cssmin                  = require('gulp-cssmin');
var neat                    = require('node-neat').includePaths;
var concat                  = require('gulp-concat');
var uglify                  = require('gulp-uglify');
// var del                     = require('del');
var rename					= require('gulp-rename');
var browserSync             = require('browser-sync');
var reload                  = browserSync.reload;



// -------------------------------------------------------------------------
// TASKS
// -------------------------------------------------------------------------


// Jade tasks
gulp.task('jade', function() {
	return gulp.src('src/jade/**/*.jade')
	.pipe(jade({ pretty: true }))
	.pipe(gulp.dest('dist/'))
});


// CSS tasks
gulp.task('css', function() {
	return gulp.src('src/scss/**/*.scss')
	// .pipe(sourcemaps.init())
	.pipe(sass({ style: 'compressed', 
		noCache: true,
		includePaths: neat }))
	// .pipe(sourcemaps.write())
	.pipe(autoprefixer())
	.pipe(cssmin())
	.pipe(rename({
        suffix: '.min'
    }))
	.pipe(gulp.dest('dist/css'))
});

// JS tasks
// gulp.task('cleanJs', function() {
// 	del(['dist/js/scripts.min.js']);
// });

gulp.task('js', function() {
	return gulp.src('src/js/**/*.js')
	.pipe(uglify())
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest('dist/js/'))
});

// Watch files for changes
gulp.task('watch', ['browser-sync'], function() {
	gulp.watch('*.html', reload);
	gulp.watch('*.scss', ['css', reload]);
	gulp.watch('*.jade', ['jade']);
	gulp.watch('*.js', ['js']);
});

gulp.task('browser-sync', function() {
	browserSync.init(['src/css/*', 'src/js/*'], {
		server: {
			baseDir: "dist/"
		}
	});
});

// Default task
gulp.task('default', ['css', 'jade', 'js', 'watch', 'browser-sync']);
