CREATE TABLE IF NOT EXISTS `category` (
  `child` int(11) DEFAULT NULL,
  `parent` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `orders` (
  `products` text NOT NULL,
  `price` int(11) NOT NULL,
  `userid` int(11) DEFAULT NULL,
  `mail` varchar(500) NOT NULL,
  `name` varchar(200) NOT NULL,
  `adress` varchar(200) NOT NULL,
  `date` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `product` (
  `name` varchar(200) NOT NULL,
  `category` varchar(100) NOT NULL,
  `price` int(11) NOT NULL DEFAULT '0',
  `images` text NOT NULL,
  `info` varchar(2000) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT '0',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rea` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `user` (
  `name` varchar(50) NOT NULL,
  `mail` varchar(150) NOT NULL,
  `pass` varchar(50) NOT NULL,
  `orders` varchar(500) NOT NULL,
  `admin` tinyint(4) NOT NULL DEFAULT '0',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mail` (`mail`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `category` (`child`,`parent`,`id`,`name`) VALUES (NULL,NULL,6,'T-SHIRT');
INSERT INTO `category` (`child`,`parent`,`id`,`name`) VALUES (NULL,NULL,7,'HOODIE');
INSERT INTO `category` (`child`,`parent`,`id`,`name`) VALUES (NULL,NULL,8,'BYXOR');
INSERT INTO `category` (`child`,`parent`,`id`,`name`) VALUES (NULL,NULL,9,'KEPS');



INSERT INTO `product` (`name`,`category`,`price`,`images`,`info`,`stock`,`id`,`rea`) VALUES ('svart byxa','BYXOR',199,'','detta är en svart byxa',17,1,149);
INSERT INTO `product` (`name`,`category`,`price`,`images`,`info`,`stock`,`id`,`rea`) VALUES ('blå byxa','BYXOR',199,'','Detta är fina blåa byxor',19,2,139);

