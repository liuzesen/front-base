'use strict';

module.exports = function(grunt) {
	
	// 读取package.json中所有任务
	require('load-grunt-tasks')(grunt);
	
	// 显示各任务完成时间
	require('time-grunt')(grunt);
	
	// 配置各个模块
	grunt.initConfig({
		
		// jshint规范JS编码
		jshint: {
			options: {
				reporter: require('jshint-stylish'),
				camelcase: true,
				curly: true,
				eqeqeq: true,
				es3: true,
				forin: true,
				indent: 2,
				latedef: true,
				newcap: true,
				plusplus: true,
				quotmark: 'single',
				undef: true,
				unused: true,
				strict: true,
				maxparams: 5,
				maxdepth: 4,
				maxlen: 80,
				multistr: true,
				trailing: true,
				sub: true,
				globals: {
					console: true
				}
			},
			build: {
				src: ['src/scripts/**/*.js']
			}
		},
		
		// usemin(包括了cssmin,uglify,concat) 简化css和js的压缩与复制问题
		useminPrepare: {
			build: {
				src: ['usemin.html']
			}
		},
		usemin: {
			html: ['dist/**/*.html']
		},
		
		// copy 复制静态文件
		copy: {
			build: {
				files: [
					{
						expand: true,
						cwd: 'src',
						src: ['fonts/**', 'images/**', '**/*.html'],
						dest: 'dist'
					}
				]
			}
		},
		
		// sass 编译sass到css
		sass: {
			options: {
				trace: true,
				noCache: true
			},
			build: {
				files: [{
					expand: true,
					cwd: 'src/scss',
					src: ['**/*.scss'],
					dest: 'src/styles',
					ext: '.css'
				}]
			}
		},
		
		// clean 清空临时缓存文件夹
		clean: {
			init: {
				src: ['dist/**']
			},
			build: {
				src: ['.tmp']
			}
		},
		
		// watch 实时监控文件变化
		watch: {
			options: {
				interrupt: true,
				livereload: true,
				port: 8000
			},
			devCss: {
				files: ['src/scss/**/*.scss'],
				tasks: ['sass:build']
			},
			devJs: {
				files: ['src/scripts/**/*.js'],
				tasks: ['jshint:build']
			},
			devHtml: {
				files: ['src/**/*.html']
			}
		},
		
		// connect 创建一个本地server用于测试
		connect: {
			options: {
				hostname: 'localhost',
				livereload: true
			},
			dev: {
				options: {
					open: true,
					base: 'src'
				}
			}
		},
		
		// htmlmin 在dist中压缩html 要在usemin之后
		htmlmin: {
			options: {
				removeComments: true,
				collapseWhitespace: true
			},
			build: {
				files: [{
					expand: true,
					cwd: 'dist',
					src: ['**/*.html'],
					dest: 'dist'
				}]
			}
		}
	});
	
	// 开发时实时编译scss和校验JS
	grunt.registerTask('dev', [ 'connect:dev', 'watch']);
	
	// 只编译scss为css，用于测试样式
	grunt.registerTask('css', ['sass:build']);
	
	// 正式发包
	grunt.registerTask(
		'default',
		['clean:init',
			'jshint:build',
			'sass:build',
			'copy:build',
			'useminPrepare:build',
			'concat:generated',
			'cssmin:generated',
			'uglify:generated',
			'usemin',
		 	'htmlmin:build',
			'clean:build']
	);
	
}