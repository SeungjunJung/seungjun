// logger.js
var winston=require('winston');
var moment=require('moment');
var daily_file=require('winston-daily-rotate-file');

/*
	로그파일 날짜별로 관리학.
*/

//옵션
var daily_opts = {
	level:'error',	//운영소스로 설정.
	filename:'yogibaba-error',
	maxsize:10*1024*1024,
	datePattern:'.YYYY-MM-dd.log',
	timestamp:function(){return moment().format('YYYY-MM-dd HH:mm:ss');}
};

/*
	아래의 로그기록 방법.
	1.콘솔
	2.파일
	3.날짜별
*/
var options={
	level:'debug',
	transports:[
		new(winston.transports.Console)({level:'error',colorize:'all'}),  //출력결과가 색깔별로 나온다.
		new(winston.transports.File)({filename:'somefile.log'}),
		new(daily_file)(daily_opts)  //운영자 소스는 error로 설정..
	] //-s:배열
};

var logger=new winston.Logger(options);
module.exports=logger;