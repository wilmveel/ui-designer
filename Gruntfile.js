module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
  
	//read package.json
    pkg: grunt.file.readJSON('package.json'),
	
	// Configuration to be run (and then tested).
    element_builder: {
		options: {
			separator: ': ',
			punctuation: ' !!!',
		},
        files: {
			'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123'],
		}
    });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify']);

};