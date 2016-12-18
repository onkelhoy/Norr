CREATE TABLE IF NOT EXISTS `category` (
  `parent` varchar(100) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `superParent` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;

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

INSERT INTO `category` (`parent`,`id`,`name`,`superParent`) VALUES (NULL,6,'T-SHIRT','');
INSERT INTO `category` (`parent`,`id`,`name`,`superParent`) VALUES (NULL,7,'HOODIE','');
INSERT INTO `category` (`parent`,`id`,`name`,`superParent`) VALUES (NULL,8,'BYXOR','');
INSERT INTO `category` (`parent`,`id`,`name`,`superParent`) VALUES (NULL,9,'KEPS','');
INSERT INTO `category` (`parent`,`id`,`name`,`superParent`) VALUES (NULL,10,'BAJS','');
INSERT INTO `category` (`parent`,`id`,`name`,`superParent`) VALUES (NULL,11,'APA','');
INSERT INTO `category` (`parent`,`id`,`name`,`superParent`) VALUES ('BYXOR',12,'LÅNGBYXOR','BYXOR');
INSERT INTO `category` (`parent`,`id`,`name`,`superParent`) VALUES ('BYXOR',13,'KORT BYXOR','BYXOR');
INSERT INTO `category` (`parent`,`id`,`name`,`superParent`) VALUES ('KORT BYXOR',14,'BAJS BYXOR','BYXOR');



INSERT INTO `product` (`name`,`category`,`price`,`images`,`info`,`stock`,`id`,`rea`) VALUES ('svart byxa','LÅNGBYXOR',100,'http://riverisland.scene7.com/is/image/RiverIsland/274519_main?$CrossSellProductPage514$,http://riverisland.scene7.com/is/image/RiverIsland/671762_main?$CrossSellProductPage514$,https://cdn.nudiejeans.com/img/Long-John-Black-Black-111199-01_800x800.jpg,http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=164030947','oooh fuuuucking shitballz',16,1,10);
INSERT INTO `product` (`name`,`category`,`price`,`images`,`info`,`stock`,`id`,`rea`) VALUES ('blå byxa','BYXOR',199,'','Detta är fina blåa byxor',19,2,139);

INSERT INTO `user` (`name`,`mail`,`pass`,`orders`,`admin`,`id`,`registerd`) VALUES ('Henry','onkelhoy@gmail.com','#jk#nO#iJjknOo,jknOo,KAnOo,KApro,cba','',1,17,1);