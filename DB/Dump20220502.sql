-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: workbay
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `Id` int NOT NULL,
  `Name` varchar(45) NOT NULL,
  `City` varchar(45) DEFAULT NULL,
  `weeklyschedule` varchar(45) NOT NULL,
  `leaves` varchar(45) DEFAULT NULL,
  `employementstatus` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT 'current',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `id_UNIQUE` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'11','1','8','11','1'),(2,'2','2','13','2','1');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weeklyschedule`
--

DROP TABLE IF EXISTS `weeklyschedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weeklyschedule` (
  `Eid` int NOT NULL,
  `weekid` int NOT NULL,
  `mon` double DEFAULT '0',
  `tue` double DEFAULT '0',
  `wed` double DEFAULT '0',
  `thur` double DEFAULT '0',
  `fri` double DEFAULT '0',
  `sat` double DEFAULT '0',
  `sun` double DEFAULT '0',
  PRIMARY KEY (`Eid`),
  CONSTRAINT `weeklyschedule_ibfk_1` FOREIGN KEY (`Eid`) REFERENCES `employee` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weeklyschedule`
--

LOCK TABLES `weeklyschedule` WRITE;
/*!40000 ALTER TABLE `weeklyschedule` DISABLE KEYS */;
INSERT INTO `weeklyschedule` VALUES (1,1,3,1,1,1,1,1,NULL),(2,2,5,2,2,2,2,NULL,NULL);
/*!40000 ALTER TABLE `weeklyschedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'workbay'
--
/*!50003 DROP PROCEDURE IF EXISTS `deletedata` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `deletedata`(
IN Eid int)
BEGIN
DELETE FROM workbay.weeklyschedule
WHERE Eid = Eid ;
DELETE FROM workbay.employee
WHERE id = Eid ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllemployees` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllemployees`()
BEGIN
select * from employee e left join weeklyschedule w on e.Id = w.Eid ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Insertemployee` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insertemployee`(
 IN Eid int,
 IN EName varchar(50),
 IN ECity varchar(50),
 IN Eweeklyschedule varchar(50),
 IN Eleaves varchar(50),
 IN Estatus varchar(50),
IN  WeekId int,
 IN Monday int,
IN  Tuesday double,
IN  Wednesday double,
IN  Thursday double,
IN  Friday double,
IN  Saturday double,
IN  Sunday double
 
 )
BEGIN
INSERT INTO workbay.employee ( Id,Name, City,weeklyschedule, leaves,employementstatus) VALUES (Eid,EName,ECity, Eweeklyschedule, Eleaves,Estatus);
INSERT INTO workbay.weeklyschedule
(Eid,
weekid,
mon,
tue,
wed,
thur,
fri,
sat,
sun)
VALUES
(Eid,WeekId,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateemployee` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateemployee`( 
 IN id int,
 IN EName varchar(50),
 IN ECity varchar(50),
 IN Eweeklyschedule varchar(50),
 IN Eleaves varchar(50),
 IN Estatus varchar(50),
IN  WeekId int,
 IN Monday int,
IN  Tuesday double,
IN  Wednesday double,
IN  Thursday double,
IN  Friday double,
IN  Saturday double,
IN  Sunday double)
BEGIN
UPDATE workbay.employee e
SET
e.Name = EName,
e.City =ECity,
e.weeklyschedule = Eweeklyschedule,
e.leaves = Eleaves,
e.employementstatus = Estatus
WHERE e.Id = id;

UPDATE workbay.weeklyschedule w
SET
w.weekid = WeekId,
w.mon = Monday,
w.tue = Tuesday,
w.wed = Wednesday,
w.thur = Thursday,
w.fri = Friday,
w.sat = Saturday,
w.sun = Sunday
WHERE Eid = id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-02  9:57:09
