var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

function style(){
    return gulp.src('index.scss')
           .pipe(sass())
           .pipe(rename('app.css'))
           .pipe(gulp.dest('public'))
    }

exports.style = style;