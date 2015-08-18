/*global module:false*/
module.exports = function(grunt) {

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
    open: {
      server: {
        url: 'http://localhost:9000'
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
    },
    mochaTest: {
      options: {
        reporter: 'spec',
        timeout: 15000
      },
      api: ['api/**/*.spec.js']
    },
    karma: {
      webapp: {
        configFile: 'karma.conf.js',
        singleRun: true,
        logLevel: 'INFO'
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('default', ['server']);
  grunt.registerTask('server', [ 'wiredep', 'less', 'express:dev', 'open', 'watch' ]);
  grunt.registerTask('test', [ 'mochaTest', 'karma' ]);
};