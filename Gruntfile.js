module.exports = function(grunt) {

	grunt.initConfig({

		// Load package into variable
		pkg: grunt.file.readJSON('package.json'),

		// Building the templates and merging in json
		assemble: {
			// options for all tasks
			options: {
				flatten: true,
				assets: 'assets',
				partials: ['templates/partials/*.hbs', 'templates/layouts/*.hbs'],
				data: ['models/*.json']
			},

			// Build all pages into html
			all: {
				files: [
					{src: 'templates/pages/*.hbs', dest: 'dist', expand: true, flatten: true}
				]
			}
		},

		// Watch files an recomplile as needed
		watch: {
			all: {
				files: [
					'templates/*/*.hbs',
					'templates/*/*/*.hbs', 
					'assets/less/*.less',
					'assets/less/*/*.less',
					'assets/js/*.js',
					'assets/js/plugins/*.js',
					'models/*.json'
				],
				tasks: [
					'assemble:all',
					'less',
					'copy:main'
				],
				options: {
					livereload: true,
				}
			}
		},

		// Run a server on localhost:port to serve static pages and include livereload.js file
		connect: {
			server: {
				options: {
					port: 9001,
					base: 'dist',
					livereload: true
				}
			}
		},

		// Compile less into css
		less: {
			main: {
				options: {
					paths: ["assets/less", "assets/less/components"]
				},
				files: {
					"dist/assets/css/main.css": "assets/less/main.less",
				}
			}
		},

		cssmin: {
            target: {
                files: {
                    "dist/assets/css/main.min.css": "dist/assets/css/main.css"
                }
            }
        },

		copy: {
			main: {
				files: [
					// includes files within path
					{
						expand: true, 
						src: ['assets/js/*'], 
						dest: 'dist/assets/js/', 
						filter: 'isFile',
						flatten: true
					},
					{
						expand: true, 
						src: ['assets/js/plugins/*'], 
						dest: 'dist/assets/js/plugins/', 
						filter: 'isFile',
						flatten: true
					},
					{
						expand: true, 
						src: ['assets/img/*'], 
						dest: 'dist/assets/img/', 
						filter: 'isFile',
						flatten: true
					},
					{
						expand: true, 
						src: ['data/*'], 
						dest: 'dist/data/', 
						filter: 'isFile',
						flatten: true
					}
				]
			}
		}

	});

	// assemble for building templates
	grunt.loadNpmTasks('assemble'); 

	// watch for file changes
	grunt.loadNpmTasks('grunt-contrib-watch');

	// connect for running local server
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.loadNpmTasks('grunt-contrib-copy');

	// only compile newer files
	grunt.loadNpmTasks('grunt-newer');

	// for compiling less to css
	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Tasks available
	grunt.registerTask('default', ['less:main', 'cssmin', 'copy:main', 'assemble:all','connect','watch:all']); // Watch less & html

};
