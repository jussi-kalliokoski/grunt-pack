/*
 * grunt-pack::tar
 * https://github.com/jussi-kalliokoski/grunt-pack
 *
 * Copyright (c) 2012 Jussi Kalliokoski
 * Licensed under the MIT license.
*/

module.exports = function(grunt) {
	var log = grunt.log

	grunt.registerMultiTask('tar', 'Packs files or folders into a .tar.gz', function () {
		var self = this
		var done = this.async()
		var files = grunt.file.expandFiles(this.file.src)

		var args = {
			cmd: 'tar',
			args: ['pczf', this.file.dest]
				.concat(files)
		}

		if (this.file.cwd) {
			args.opts = {
				cwd: this.file.cwd
			}
		}

		grunt.utils.spawn(args, function (err, result) {
			if (err) {
				log.error(err)
				return done(false)
			}

			log.success('tar (' + self.file.dest + '): done.')
			done()
		})
	})
}
