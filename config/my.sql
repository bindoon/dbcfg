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

CREATE TABLE `t_tablecfg` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `dbid` int(11) unsigned NOT NULL,
  `tname` varchar(128) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

CREATE TABLE `t_columncfg` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `tableid` int(11) unsigned NOT NULL,
  `corder` tinyint default 0 NOT NULL,
  `cname` varchar(128) NOT NULL,
  `title` varchar(128) NOT NULL,
  `type` tinyint NOT NULL,
  `cfg` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

CREATE TABLE `t_menu` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `link` varchar(512) NOT NULL,
  `target` tinyint default 'self',
  `parentid` int(11) unsigned ,
  `corder` int(11) unsigned ,
  `createdAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

insert into t_dbcfg values(1,1,'127.0.0.1','root','','dbcfg',3306,now(),now())
insert into t_tablecfg values(1,1,'t_dbcfg',now(),now())
insert into t_columncfg values(1,1,1,'id','',1,'',now(),now())
insert into t_columncfg values(2,1,2,'type','',1,'',now(),now());
insert into t_columncfg values(3,1,3,'host','',1,'',now(),now());
insert into t_columncfg values(4,1,4,'username','',1,'',now(),now());
insert into t_columncfg values(5,1,5,'password','',1,'',now(),now());
insert into t_columncfg values(6,1,6,'port','',1,'',now(),now());
