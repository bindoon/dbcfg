CREATE DATABASE dbcfg;

CREATE TABLE `t_dbcfg` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
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
  `createdAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

CREATE TABLE `t_colcfg` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `tbid` int(11) unsigned NOT NULL,
  `corder` tinyint default 0 NOT NULL,
  `cname` varchar(128) NOT NULL,
  `title` varchar(128) NOT NULL,
  `type` tinyint default 1 NOT NULL,  /* 1: input 2:select 3:textarea 4:图片 5:url 6:label 7:checkbox 8:datepicker 9:自增id 10:隐藏 */
  `cfg` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

-- dbcfg 表配置
insert into t_dbcfg values(1,1,'127.0.0.1','root','','dbcfg',3306,now(),now());
insert into t_tbcfg values(1,1,'t_dbcfg',now(),now());
insert into t_colcfg values(1,1,1,'id','自动',1,'',now(),now());
insert into t_colcfg values(2,1,2,'type','类别',1,'',now(),now());
insert into t_colcfg values(3,1,3,'host','host',1,'',now(),now());
insert into t_colcfg values(4,1,4,'username','username',1,'',now(),now());
insert into t_colcfg values(5,1,5,'password','password',1,'',now(),now());
insert into t_colcfg values(6,1,6,'port','port',1,'',now(),now());

-- tablecfg 配置
insert into t_tbcfg values(2,1,'t_tbcfg',now(),now());
insert into t_colcfg values(7,2,1,'id','自动',1,'',now(),now());
insert into t_colcfg values(8,2,2,'dbid','选择db',1,'',now(),now());
insert into t_colcfg values(9,2,3,'tname','表名',1,'',now(),now());

-- columncfg 配置
insert into t_tbcfg values(3,1,'t_colcfg',now(),now());
insert into t_colcfg values(10,3,1,'id','自动',1,'',now(),now());
insert into t_colcfg values(11,3,2,'tbid','选择table',1,'',now(),now());
insert into t_colcfg values(12,3,3,'corder','顺序',1,'',now(),now());
insert into t_colcfg values(13,3,4,'cname','字段名称',1,'',now(),now());
insert into t_colcfg values(14,3,5,'title','字段描述',1,'',now(),now());
insert into t_colcfg values(15,3,6,'type','类别',1,'',now(),now());
insert into t_colcfg values(16,3,7,'cfg','配置项',1,'',now(),now());



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
