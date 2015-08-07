/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    wiredep: {
      task: {
        src: ['client/index.html'],
      }
    },
    express: {
      options: {
        port: 9000,
        spawn: false
      },
      dev: {
        options: {
          script: 'server.js',
          debug: true
        }
      }
    },
    watch: {
      express: {
        files: 'api/**/*.js',
        tasks: ['express:dev'],
        options: {
          spawn: false
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-wiredep');

  // Default task.
  grunt.registerTask('default', ['server']);
  grunt.registerTask('server', [ 'wiredep', 'express:dev', 'watch' ]);

};
