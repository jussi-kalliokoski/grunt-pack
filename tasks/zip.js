/*
 * grunt-pack::zip
 * https://github.com/jussi-kalliokoski/grunt-pack
 *
 * Copyright (c) 2012 Jussi Kalliokoski
 * Licensed under the MIT license.
*/

module.exports = function(grunt) {
	var log = grunt.log

	grunt.registerMultiTask('zip', 'Packs files or folders into a .zip', function () {
		var self = this
		var done = this.async()
		var files = grunt.file.expand(this.file.src)

		var args = {
			cmd: 'zip',
			args: ['-r', this.file.dest]
				.concat(files)
		}

		if (this.data.cwd) {
			args.opts = {
				cwd: this.data.cwd
			}
		}

		grunt.utils.spawn(args, function (err, result) {
			if (err) {
				log.error(err)
				return done(false)
			}

			log.success('zip (' + self.file.dest + '): done.')
			done()
		})
	})
}
