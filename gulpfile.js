"use strict";

let gulp = require("gulp");
let sourcemaps = require("gulp-sourcemaps");
let typescript = require("gulp-typescript");
let nodemon = require("gulp-nodemon");
let tslint = require("gulp-tslint");
let runSequence = require("gulp4-run-sequence");
let rimraf = require("rimraf");

const CLEAN_BUILD = "clean:build";
const TSLINT = "tslint";
const COMPILE_TYPESCRIPT = "compile:typescript";
const COPY_STATIC_FILES = "copy:static";
const BUILD = "build";
const WATCH = "watch";

const TS_SRC_GLOB = "./src/**/*.ts";
const TS_GLOB = [TS_SRC_GLOB];
const STATIC_FILES = ["./src/**/*.json"];

const tsProject = typescript.createProject("tsconfig.json");

gulp.task(CLEAN_BUILD, (callback) => {
  rimraf("./build", callback);
});

gulp.task(TSLINT, () =>
  gulp
    .src(TS_GLOB)
    .pipe(tslint({ formatter: "verbose" }))
    .pipe(
      tslint.report({
        emitError: false,
      })
    )
);

gulp.task(COPY_STATIC_FILES, () =>
  gulp.src(STATIC_FILES).pipe(gulp.dest("build"))
);

gulp.task(COMPILE_TYPESCRIPT, () =>
  gulp
    .src(TS_GLOB)
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write(".", { sourceRoot: "../src" }))
    .pipe(gulp.dest("build"))
);

gulp.task(BUILD, function (callback) {
  runSequence(
    CLEAN_BUILD,
    TSLINT,
    COMPILE_TYPESCRIPT,
    COPY_STATIC_FILES,
    callback
  );
});

gulp.task(
  WATCH,
  gulp.series(
    gulp.parallel(BUILD),
    () =>
      nodemon({
        ext: "ts js json",
        script: "build/server.js",
        watch: ["src/*", "test/*"],
        tasks: [BUILD],
      }),
    (done) => {
      done();
    }
  )
);
