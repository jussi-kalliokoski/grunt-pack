/*
 * grunt-pack::tar
 * https://github.com/jussi-kalliokoski/grunt-pack
 *
 * Copyright (c) 2012 Jussi Kalliokoski
 * Licensed under the MIT license.
*/

module.exports = function(grunt) {
	var tar = require('tar')
	var fs = require('fs')
	var log = grunt.log

	grunt.registerMultiTask('tar', 'Packs files or folders into a .tar.gz', function () {
		var self = this
		var files = grunt.file.expandFiles(this.file.src)

		log.verbose.writeln('Creating a write stream for ' + this.file.dest)
		var ps = new tar.Pack({})
		var ws = fs.createWriteStream(this.file.dest)

		ps.pipe(ws)

		var done = this.async()

		if (files.length) {
			files.forEach(function (file) {
				grunt.helper('tar', file, self.file.dest, ps)
			})
		} else {
			/* FIXME: This should be a warning */
			log.error('No input files for tar! Creating an empty archive.')
		}

		ps.on('end', function () {
			log.success('tar (' + self.file.dest + '): done.')
			done()
		})

		ps.end()
	})

	grunt.registerHelper('tar', function (src, dest, packer) {
		log.verbose.writeln('Adding ' + src + ' to ' + dest)

		var stream = fs.createReadStream(src)
		packer.add(stream)

		return stream
	})
}
