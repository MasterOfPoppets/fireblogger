var gulp = require('gulp'),
	combiner = require('stream-combiner2'),
	less = require('gulp-less'),
	minifyCss = require('gulp-minify-css'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	uglify = require('gulp-uglify')

gulp.task('process-less', function () {
	var streams = combiner.obj([
		gulp.src('src/javascripts/*.less'),
		less(),
		minifyCss(),
		gulp.dest('public/stylesheets')
	])

	streams.on('error', console.error.bind(console))

	return streams
})

gulp.task('reactive', function () {
	browserify({ entries: 'src/test/reactive.js' })
		.bundle()
		.pipe(source('reactive.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest('public/javascripts/'))
})

gulp.task('default', function () {
	gulp.watch('src/**/*.less', ['process-less'])
})

gulp.task('deploy', ['process-less', 'reactive'])