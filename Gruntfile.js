/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    wiredep: {
      app: {
        src: 'client/index.html'
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
      scripts: {
        files: 'api/**/*.js',
        tasks: ['express:dev'],
        options: {
          spawn: false
        }
      },
      css: {
        files: 'client/assets/**/*.less',
        tasks: ['less']
      },
    },
    less: {
      dev:{
        files: {
          "client/assets/css/app.css": "client/assets/less/app.less"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-wiredep');

  grunt.registerTask('default', ['server']);
  grunt.registerTask('server', [ 'wiredep', 'less', 'express:dev', 'watch' ]);

};
