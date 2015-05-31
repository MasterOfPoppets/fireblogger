var gulp = require('gulp'),
	combiner = require('stream-combiner2'),
	less = require('gulp-less'),
	minifyCss = require('gulp-minify-css'),
	bower = require('bower'),
	Test = require('./test')

gulp.task('process-less', function () {
	var myTest = new Test()

	var streams = combiner.obj([
		gulp.src('src/javascripts/*.less'),
		less(),
		minifyCss(),
		myTest,
		gulp.dest('public/stylesheets')
	])

	streams.on('error', console.error.bind(console))

	return streams
})

gulp.task('default', function () {
	gulp.watch('src/**/*.less', ['process-less'])
})

gulp.task('deploy', function () {
	return bower
		.commands
		.install()
		.on('end', function (installed) {
			console.log(installed)
		})
})