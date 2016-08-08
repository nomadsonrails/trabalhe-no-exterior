var gulp = require('gulp');
var compass = require('gulp-compass');
var connect = require('gulp-connect');
var ghpages = require('gulp-gh-pages');
var soynode = require('gulp-soynode');
var livereload = require('gulp-livereload');

gulp.task('connect', function() {
	connect.server({
		root: 'dist/public'
	});
});

gulp.task('cname', function() {
	return gulp.src('src/public/CNAME')
		.pipe(gulp.dest('dist/public'));
});

gulp.task('deploy', ['cname', 'build'], function() {
	return gulp.src('dist/public/**/*')
		.pipe(ghpages());
});

gulp.task('downloads', function() {
	return gulp.src('src/public/downloads/**')
		.pipe(gulp.dest('dist/public/downloads'));
});

gulp.task('images', function() {
	return gulp.src('src/public/images/**')
		.pipe(gulp.dest('dist/public/images'));
});

gulp.task('scripts', function() {
	return gulp.src('src/public/scripts/**')
		.pipe(gulp.dest('dist/public/scripts'));
});

gulp.task('styles', function() {
	return gulp.src('src/public/styles/*.scss')
		.pipe(compass({
			css: 'dist/public/styles',
			sass: 'src/public/styles',
			image: 'dist/public/images'
		}))
		.pipe(gulp.dest('dist/public/styles'))
		.pipe(livereload());
});

gulp.task('soy', function() {
	return gulp.src('src/**/*.soy')
		.pipe(soynode({
			renderSoyWeb: true
		}))
		.pipe(gulp.dest('dist'))
		.pipe(livereload());
});

gulp.task('vendor', function() {
	return gulp.src('src/public/vendor/**')
		.pipe(gulp.dest('dist/public/vendor'));
});

gulp.task('watch', function () {
	livereload.listen();
	gulp.watch('src/public/downloads/**', ['downloads']);
	gulp.watch('src/public/images/**', ['images']);
	gulp.watch('src/public/scripts/**', ['scripts']);
	gulp.watch('src/public/vendor/**', ['vendor']);
	gulp.watch('src/public/styles/*.scss', ['styles']);
	gulp.watch('src/**/*.soy', ['soy']);
});

gulp.task('build', ['images', 'downloads', 'scripts', 'vendor', 'soy', 'styles']);
gulp.task('default', ['build', 'connect', 'watch']);
