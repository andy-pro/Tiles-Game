// Karma configuration
// Generated on Tue Jun 14 2016 12:16:35 GMT+0300 (Финляндия (лето))

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './app/static/js',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'angular/angular.js',
      'angular/angular-animate.min.js',
      'angular/angular-mocks.js',
      'app/*.js',
      'tests/*.js'
    ],

    colors: true,

    browsers: ['Chrome', 'Firefox']

  })
}
