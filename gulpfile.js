const gulp = require('gulp');
const del = require('del');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const cssMinify = require('gulp-minify-css');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const runSequence = require('run-sequence');


let dist = './dist',
    src = './src',
    html_dist = dist + '/*.html',
    css_dist = dist + '/css/*.css',
    js_dist = dist + '/js/*.js',
    img_dist = dist + '/img/*.{jpg,png,gif,ico}',

    html_src = src,
    css_src = src + '/css',
    js_src = src + '/js',
    img_src = src + '/css/img';



gulp.task('clean', function(){
    del(src);
})

gulp.task('default', ()=>{
    runSequence('clean',['html','css','js'])
})

gulp.task('html', function(){
    gulp.src(html_dist)
    .pipe(gulp.dest(html_src))
});

gulp.task('css', function(){
    gulp.src(css_dist)
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],      // 浏览器版本
        cascade:true,                       // 美化属性，默认true
        add: true,                           // 是否添加前缀，默认true
        remove: true,                        // 删除过时前缀，默认true
        flexbox: true                       // 为flexbox属性添加前缀，默认true
    }))
    .pipe(concat('index.css'))
    //.pipe(cssMinify())
    .pipe(gulp.dest(css_src))
})

gulp.task('js', function(){
    gulp.src(js_dist)
    .pipe(gulp.dest(js_src))
});
