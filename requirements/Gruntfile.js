module.exports = function(grunt) {

  grunt.initConfig({
    cucumberjs: {
      options: {
        format: 'pretty',
        output: './build/tests/result.json'
      },
      features: []
    },
    selenium_standalone: {
      options: {
        stopOnExit: false
      },
      server: {
        seleniumVersion: '2.53.1',
        seleniumDownloadURL: 'http://selenium-release.storage.googleapis.com',
        drivers: {
          chrome: {
            version: '2.25',
            arch: process.arch,
            baseURL: 'http://chromedriver.storage.googleapis.com'
          }
        }
      }
    },
    exec: {
      picklesmono: {
        cmd: function() {
          return 'mono ./tools/pickles/pickles.exe -f ./features -o ./build/pickles -lr ./build/tests/result.json -trfmt cucumberjson -df DHTML';
        }
      },
      picklesnative: {
        cmd: function() {
          return '.\\tools\\pickles\\pickles.exe -f ./features -o ./build/pickles -lr ./build/tests/result.json -trfmt cucumberjson -df DHTML';
        }
      },
      cucumberjs: {
        cmd: function() {
          return 'cucumberjs -p default';
        }
      },
      gherkinlintlinux: {
        cmd: function() {
          return './node_modules/.bin/gherkin-lint ./features/**/*.feature -c ./features/.gherkin-lintrc';
        }
      },
      gherkinlintwin: {
        cmd: function() {
          return '.\\node_modules\\.bin\\gherkin-lint ./features/**/*.feature -c ./features/.gherkin-lintrc';
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-selenium-standalone');
  grunt.loadNpmTasks('grunt-cucumberjs');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('gherkinlint', 'Run linter for Gherkin feature files', function() {
    if (process.env.OS === 'Windows_NT') {
      grunt.task.run('exec:gherkinlintwin');
    } else {
      grunt.task.run('exec:gherkinlintlinux');
    }
  });
  grunt.registerTask('testsonly', 'Run automated acceptance tests without Pickles generation', ['gherkinlint', 'selenium_standalone:server:start', 'exec:cucumberjs']);
  grunt.registerTask('pickles', 'Run Pickles generation', function() {
    if (process.env.OS === 'Windows_NT') {
      grunt.task.run('exec:picklesnative');
    } else {
      grunt.task.run('exec:picklesmono');
    }
  });
  grunt.registerTask('test', 'Run linter, automated acceptance tests and Pickles generation', ['testsonly', 'pickles']);

};
