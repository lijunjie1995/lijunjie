const gulp=require('gulp');
const html=require('gulp-minify-html');
const css=require('gulp-minify-css');
const uglifyjs = require('gulp-uglify');
const babel = require('gulp-babel'); //es6转es5主要模块
const bablecore = require('babel-core'); //es6转es5主要模块
const es2015 = require('babel-preset-es2015'); //es6转es5主要模块



gulp.task('uglifyhtml',function(){
    return gulp.src('src/*.html').pipe(html()).pipe(gulp.dest('dist/'));
});
gulp.task('uglifycss',function(){
    return gulp.src('src/css/*.css').pipe(css()).pipe(gulp.dest('dist/css/'));
})
gulp.task('babel', function () {
    return gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglifyjs())
        .pipe(gulp.dest('dist/js/'));
});