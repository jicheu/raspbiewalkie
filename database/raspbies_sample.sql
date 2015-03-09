-- MySQL dump 10.15  Distrib 10.0.15-MariaDB, for osx10.10 (x86_64)
--
-- Host: localhost    Database: raspbies
-- ------------------------------------------------------
-- Server version	10.0.15-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `raspbies`
--

/*!40000 DROP DATABASE IF EXISTS `raspbies`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `raspbies` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `raspbies`;

--
-- Table structure for table `raspbies`
--

DROP TABLE IF EXISTS `raspbies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `raspbies` (
  `raspbie_id` int(32) NOT NULL AUTO_INCREMENT,
  `rasTitle` varchar(45) DEFAULT NULL,
  `rasPath` varchar(45) DEFAULT NULL,
  `rasMessage` varchar(80) DEFAULT NULL,
  `rasDate` datetime DEFAULT NULL,
  `user_id` int(32) DEFAULT NULL,
  PRIMARY KEY (`raspbie_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `raspbies_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `raspbies`
--

LOCK TABLES `raspbies` WRITE;
/*!40000 ALTER TABLE `raspbies` DISABLE KEYS */;
INSERT INTO `raspbies` VALUES (1,'t11','m1',NULL,'0000-00-00 00:00:00',NULL),(2,'t2','m21',NULL,'0000-00-00 00:00:00',NULL),(3,'t2','m21',NULL,'0000-00-00 00:00:00',NULL),(38,'A','','B','2015-03-09 16:39:58',6),(39,'T2','','M2 !','2015-03-09 16:41:19',2),(42,'','','','2015-03-09 16:47:11',2),(43,'new raspbie','67537530-c67a-11e4-9cf4-2f8ff92b4105','message saved?','2015-03-09 17:36:40',5),(45,'AH !!!!','f40007f0-c67a-11e4-9cf4-2f8ff92b4105','','2015-03-09 17:40:17',2),(46,'created for user 7','56a8b9a0-c67c-11e4-bca5-8b1eb794c91f','does it work?','2015-03-09 17:50:17',NULL),(47,'t77777','991c98b0-c67c-11e4-bca5-8b1eb794c91f','4444444','2015-03-09 17:52:08',NULL),(48,'test direct','5d4ac3b0-c67d-11e4-bca5-8b1eb794c91f','direct','2015-03-09 17:57:36',7),(50,'with user 2','cdf238e0-c67e-11e4-963d-9d6bc9daab3a','aie aie','2015-03-09 18:07:56',2);
/*!40000 ALTER TABLE `raspbies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(32) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'u2','f2','l2'),(3,'u3','f3','l3'),(5,'u5','f5','l5'),(6,'u1','f1','l1'),(7,'u6','first6','last6');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-03-09 18:24:18
