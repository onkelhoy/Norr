CREATE TABLE IF NOT EXISTS `category` (
  `parent` varchar(100) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `superParent` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `orders` (
  `products` text NOT NULL,
  `price` int(11) NOT NULL,
  `userid` int(11) DEFAULT NULL,
  `mail` varchar(500) NOT NULL,
  `name` varchar(200) NOT NULL,
  `adress` varchar(200) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `product` (
  `name` varchar(200) NOT NULL,
  `category` varchar(100) NOT NULL,
  `price` int(11) NOT NULL DEFAULT '0',
  `images` text NOT NULL,
  `info` text NOT NULL,
  `stock` int(11) NOT NULL DEFAULT '0',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rea` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `user` (
  `name` varchar(50) NOT NULL,
  `mail` varchar(150) NOT NULL,
  `pass` varchar(50) NOT NULL,
  `orders` varchar(500) NOT NULL,
  `admin` tinyint(4) NOT NULL DEFAULT '0',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `registerd` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `mail` (`mail`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

INSERT INTO `category` (`parent`,`id`,`name`,`superParent`) VALUES (NULL,20,'a',NULL);
INSERT INTO `category` (`parent`,`id`,`name`,`superParent`) VALUES ('a',21,'a.2aaaaab','a');
INSERT INTO `category` (`parent`,`id`,`name`,`superParent`) VALUES ('a.2aaaaab',22,'a.3','a.2');
INSERT INTO `category` (`parent`,`id`,`name`,`superParent`) VALUES (NULL,23,'b',NULL);
INSERT INTO `category` (`parent`,`id`,`name`,`superParent`) VALUES ('b',24,'b.2','b');



INSERT INTO `product` (`name`,`category`,`price`,`images`,`info`,`stock`,`id`,`rea`) VALUES ('b2 product 1','b.2',0,'http://www.pacinno.eu/wp-content/uploads/2014/05/placeholder-Copy.png','',1,12,0);
INSERT INTO `product` (`name`,`category`,`price`,`images`,`info`,`stock`,`id`,`rea`) VALUES ('a2 product 1','a.2aaaaab',0,'http://www.pacinno.eu/wp-content/uploads/2014/05/placeholder-Copy.png','',1,13,0);
INSERT INTO `product` (`name`,`category`,`price`,`images`,`info`,`stock`,`id`,`rea`) VALUES ('a2 product 2','a.2aaaaab',0,'http://www.pacinno.eu/wp-content/uploads/2014/05/placeholder-Copy.png','',1,14,0);
INSERT INTO `product` (`name`,`category`,`price`,`images`,`info`,`stock`,`id`,`rea`) VALUES ('a2 product 3','a.2aaaaab',0,'http://www.pacinno.eu/wp-content/uploads/2014/05/placeholder-Copy.png','',1,15,0);
INSERT INTO `product` (`name`,`category`,`price`,`images`,`info`,`stock`,`id`,`rea`) VALUES ('a2 product 4','a.2aaaaab',0,'http://www.pacinno.eu/wp-content/uploads/2014/05/placeholder-Copy.png','',1,16,0);
INSERT INTO `product` (`name`,`category`,`price`,`images`,`info`,`stock`,`id`,`rea`) VALUES ('a2 product 5','a.2aaaaab',0,'http://www.pacinno.eu/wp-content/uploads/2014/05/placeholder-Copy.png','',1,17,0);

INSERT INTO `user` (`name`,`mail`,`pass`,`orders`,`admin`,`id`,`registerd`) VALUES ('Henry','onkelhoy@gmail.com','#jk#nO#iJjknOo,jknOo,KAnOo,KApro,cba','',1,17,1);