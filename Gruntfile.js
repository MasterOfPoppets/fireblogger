module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		bower_concat: {
			all: {
				dest: 'public/javascripts/_bower.js',
				cssDest: 'public/stylesheets/_bower.css',
				mainFiles: {
					'angular': 'angular.js'
				},
				exclude: [
					'angular-mocks',
					'angular',
					'highland'
				]
			}
		},
		less: {
			development: {
				files: {
					"public/stylesheets/fireblogger.css": "app.less"
				}
			}
		},
		uglify: {
			options: {
				mangle: false
			},
			my_target: {
				files: {
					'public/javascripts/fireblogger.min.js': [
						'src/javascripts/**/*.module.js',
						'src/javascripts/**/*.js',
						'!src/javascripts/**/*.spec.js'
					]
				}
			}
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-bower-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
};