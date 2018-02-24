import gulp from 'gulp';
import gulpif from 'gulpif';
import concat from 'gulp-concat';
import webpack from 'webpack';
import gulpWebpack from 'webpack-stream';
import named from 'vinyl-named';
import livereload from 'gulp-livereload'; //热更新
import plumber from 'gulp-plumber';  //处理文件信息流
import rename from 'gulp-rename';  //文件重命名
import uglify from 'gulp-uglify';  //压缩
import {log,colors} from 'gulp-util';
import args from './util/args';

gulp.task('scripts',()=>{
	return gulp.src(['app/js/index.js'])
	  .pipe(plumber({
	  	errorHandle:function(){

	  	}
	  }))
	  .pipe(named())
	  .pipe(gulpWebpack({
	  	module:{
	  		loaders:[{
	  			test:/\.js$/,
	  			loader:'babel'
	  		}]
	  	}
	  }),null,(err,stats)=>{
	  	log(`Finished '${colors.cyan('scripts')}'`,stats.toString({
	  		chunks:false
	  	}))
	  })
	  .pipe(gulp.dest('server/public/js'))
	  .pipe(rename({
	  	basename:'cp',
	  	extname:'.min.js'
	  }))
	  .pipe(uglify({compress:{properties:false},output:{'quote_keys':true}}))
	  .pipe(gulp.dest('server/public/js'))
	  .pipe(gulpif(args.watch,livereload()))
})