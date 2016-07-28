// -------------------------------------------------------------------------
// VARIABLES
// -------------------------------------------------------------------------


var gulp                    = require('gulp');
var jade                    = require('gulp-jade');
var sass                    = require('gulp-sass');
var sourcemaps              = require('gulp-sourcemaps');
var autoprefixer            = require('gulp-autoprefixer');
var cssmin                  = require('gulp-cssmin');
var bourbon                 = require('node-bourbon').includePaths;
var neat                    = require('bourbon-neat').includePaths;
var concat                  = require('gulp-concat');
var uglify                  = require('gulp-uglify');
var del                     = require('del');
var browserSync             = require('browser-sync');
var reload                  = browserSync.reload;



// -------------------------------------------------------------------------
// TASKS
// -------------------------------------------------------------------------


// Jade tasks
gulp.task('jade', function() {
  return gulp.src('*.jade')
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest(''))
});


// CSS tasks
gulp.task('css', function() {
  return gulp.src('scss/*.scss')
    // .pipe(sourcemaps.init())
    .pipe(sass({  style: 'compressed', 
                  noCache: true, 
                  includePaths:
                    [ 'scss/_partials/', 
                      'scss/_vendor/', 
                      bourbon, 
                      neat ] }))
    // .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('css'))
});

// JS tasks
gulp.task('cleanJs', function() {
  del(['js/scripts.min.js']);
});

gulp.task('js', function() {
    return gulp.src('js/scripts.js')
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('js/'))
});

// Watch files for changes
gulp.task('watch', ['browser-sync'], function() {
  gulp.watch('*.html', reload);
  gulp.watch('scss/**/*', ['css', reload]);
  gulp.watch('*.jade', ['jade']);
  gulp.watch('scripts.js', ['cleanJs', 'js']);
});

gulp.task('browser-sync', function() {
  browserSync.init(['css/*', 'js/*'], {
    server: {
      baseDir: ""
    }
  });
});

// Default task
gulp.task('default', ['css', 'jade', 'cleanJs', 'js', 'watch', 'browser-sync']);
