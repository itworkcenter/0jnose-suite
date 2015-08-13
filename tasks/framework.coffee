module.exports =
  init: (gulp, mods, params,packages)->
    console.log(mods)
    gulp.task 'frameworks', (back)->
      gulp.src("./sources/test.less")
      .pipe(mods.gulpless())
      .pipe(gulp.dest(packages.publish))
      console.log("frameworks")

