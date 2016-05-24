CREATE DATABASE dbcfg;

CREATE TABLE `t_dbcfg` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` char(128) NOT NULL,
  `dialect` char(32) default 'mysql',
  `host` char(16) NOT NULL,
  `username` varchar(64) NOT NULL,
  `password` varchar(128) NOT NULL,
  `port` int default 3306,
  `dbname` varchar(128) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

CREATE TABLE `t_tbcfg` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `dbid` int(11) unsigned NOT NULL,
  `tname` varchar(128) NOT NULL,
  `title` varchar(128) NOT NULL,
  `corder` varchar(128) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

 --0:自增id  1: input 2:select 3:textarea 4:图片 5:url 6:label 7:checkbox 8:datepicker  9:隐藏 -- */
CREATE TABLE `t_colcfg` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `tbid` int(11) unsigned NOT NULL,
  `corder` tinyint default 0 NOT NULL,
  `cname` varchar(128) NOT NULL,
  `title` varchar(128) NOT NULL,
  `type` tinyint default 1 NOT NULL,
  `cfg` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

-- dbcfg 表配置
insert into t_dbcfg values(1,'db表','mysql','127.0.0.1','root','',3306,'dbcfg',now(),now());
insert into t_tbcfg values(1,1,'t_dbcfg','table of dbcfg','', now(),now());
insert into t_colcfg values(1,1,1,'id','自动',0,'',now(),now());
insert into t_colcfg values(2,1,2,'dialect','类别',1,'',now(),now());
insert into t_colcfg values(3,1,3,'host','host',1,'',now(),now());
insert into t_colcfg values(4,1,4,'username','username',1,'',now(),now());
insert into t_colcfg values(5,1,5,'password','password',1,'',now(),now());
insert into t_colcfg values(6,1,6,'port','port',1,'',now(),now());
insert into t_colcfg values(7,1,1,'title','标题',1,'',now(),now());
insert into t_colcfg values(8,1,7,'','操作',10,'<a href="#/list/2?dbid={{id}}">table配置</a>',now(),now());

-- tablecfg 配置
insert into t_tbcfg values(2,1,'t_tbcfg','table of tbcfg','id', now(),now());
insert into t_colcfg values(9,2,1,'id','自动',0,'',now(),now());
insert into t_colcfg values(10,2,2,'dbid','选择db',1,'{"id":1,"key":"id","value":"id"}',now(),now());
insert into t_colcfg values(11,2,3,'tname','表名',1,'',now(),now());
insert into t_colcfg values(12,2,4,'corder','数据排序方式',1,'',now(),now());
insert into t_colcfg values(13,2,5,'title','描述',1,'',now(),now());
insert into t_colcfg values(14,2,6,'','操作',10,'<a href="#/list/3?tbid={{id}}">table字段配置</a> | <a href="#/list/{{id}}">数据配置</a>',now(),now());

-- columncfg 配置
insert into t_tbcfg values(3,1,'t_colcfg','table of colcfg','corder', now(),now());
insert into t_colcfg values(15,3,1,'id','自动',0,'',now(),now());
insert into t_colcfg values(16,3,2,'tbid','选择table',1,'',now(),now());
insert into t_colcfg values(17,3,3,'corder','顺序',1,'',now(),now());
insert into t_colcfg values(18,3,4,'cname','字段名称',1,'',now(),now());
insert into t_colcfg values(19,3,5,'title','字段描述',1,'',now(),now());
insert into t_colcfg values(20,3,6,'type','类别',2,'[[ 0,"自增id "],[1,"input"],[2,"select"],[3,"textarea"],[4,"图片"],[ 5,"url"],[ 6,"label"],[7,"checkbox"],[ 8,"datepicker"],[9,"隐藏"],[10,"自定义"]]',now(),now());
insert into t_colcfg values(21,3,7,'cfg','配置项',3,'',now(),now());



CREATE TABLE `t_menu` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `link` varchar(512) NOT NULL,
  `target` char(16) NOT NULL,
  `parentid` int(11) unsigned ,
  `corder` int(11) unsigned ,
  `createdAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

insert into t_menu values(1,'菜单','#/list/3',0,0 ,1,now(),now());
