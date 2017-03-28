(function()
{
	'use strict';

		var gulp = require('gulp'),
			aglio = require('aglio'),
	browserSync = require('browser-sync'),
		  concat = require('gulp-concat');


	// concat all api-blueprint files into single all.apib file
	gulp.task( 'concat-apib', function()
	{
		return gulp.src([ 'apiblueprint/**/*.apib', '!apiblueprint/all.apib' ])
				.pipe( concat('all.apib') )
				.pipe( gulp.dest('apiblueprint/') );
	});

	// generate html off previously concat-ed all.apib
	gulp.task( 'make-html', ['concat-apib'], function()
	{
		var opts = {
			themeVariables: 'streak',
			themeTemplate: 'triple'
		};

		aglio.renderFile( 'apiblueprint/all.apib', 'html/index.html', opts, function(){} );
	});

	gulp.task( 'watch', ['make-html'], function()
	{
		gulp.watch( 'apiblueprint/*.apib', ['make-html'] ).on( 'change', browserSync.reload );

		gulp.watch('html/index.html').on( 'change', browserSync.reload );
	});

	// synchronize browser
	gulp.task( 'local', function()
	{
		browserSync
		({
			port: 9000,
			notify: false,
			server: { baseDir: ['html'] }
		});
	});

	gulp.task( 'default', ['watch','local'] );

})();
