module.exports = function ( grunt ) {
  
  /** 
   * Load required Grunt tasks. These are installed based on the versions listed
   * in `package.json` when you do `npm install` in this directory.
   */
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html');

  /**
   * This is the configuration object Grunt uses to give each plugin its 
   * instructions.
   */
  var taskConfig = {

    /**
     * The directories to delete when `grunt clean` is executed.
     */
    clean: {
      build: [ '/build' ]
    },

    /**
     * This lints our html to make sure it's correct.
     */
    htmllint: {
      all: ["index.html"]
    },

    /**
     * The `copy` task just copies files from A to B. We use it here to copy
     * our project assets into `build`.
     */
    copy: {
      build: {
        files: [
          { 
            src: 'index.html',
            dest: 'build/index.html'
          }
        ]   
      }
    },

    /**
     * And for rapid development, we have a watch set up that checks to see if
     * any of the files listed below change, and then to execute the listed 
     * tasks when they do. This just saves us from having to type "grunt" into
     * the command-line every time we want to see what we're working on; we can
     * instead just leave "grunt watch" running in a background terminal.
     */
    watch: {
      /**
       * By default, we want the Live Reload to work for all tasks; this is
       * overridden in some tasks (like this file) where browser resources are
       * unaffected. It runs by default on port 35729, which your browser
       * plugin should auto-detect.
       */
      options: {
        port: 3100,
        livereload: true
      },

      /**
       * When index.html changes, we need to lint and copy it.
       */
      html: {
        files: [ 'index.html' ],
        tasks: [ 'build' ]
      }

    }
  };

  grunt.initConfig(taskConfig);

  /**
   * The default task is to build and watch.
   */
  grunt.registerTask( 'default', [ 'build', 'watch' ] );

  /**
   * The `build` task gets your app ready to run for development.
   */
  grunt.registerTask( 'build', ['htmllint:all', 'clean:build', 'copy:build']);

};
