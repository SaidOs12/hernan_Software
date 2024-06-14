-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: medova
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `docente`
--

DROP TABLE IF EXISTS `docente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `docente` (
  `iddocente` int NOT NULL,
  `telefono` int NOT NULL,
  `anoExperiencia` int DEFAULT '0',
  `Especialidad` varchar(45) DEFAULT 'Sin informacion',
  `idUsuarioDocente` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`iddocente`),
  KEY `IdUsuarioDocente_idx` (`idUsuarioDocente`),
  CONSTRAINT `idUsuarioDocente` FOREIGN KEY (`idUsuarioDocente`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `docente`
--

LOCK TABLES `docente` WRITE;
/*!40000 ALTER TABLE `docente` DISABLE KEYS */;
INSERT INTO `docente` VALUES (12344,128182,12,'Ing Sistemas',11);
/*!40000 ALTER TABLE `docente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estudiante`
--

DROP TABLE IF EXISTS `estudiante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estudiante` (
  `idEstudiante` int NOT NULL,
  `idUsuarioEstudiante` int NOT NULL AUTO_INCREMENT,
  `telefono` int NOT NULL,
  `progreso` int NOT NULL DEFAULT '0',
  `descripcion` varchar(250) DEFAULT 'Ninguna descripcion por ahora',
  PRIMARY KEY (`idEstudiante`),
  KEY `idUsuarioEstudiante_idx` (`idUsuarioEstudiante`),
  CONSTRAINT `idUsuarioEstudiante` FOREIGN KEY (`idUsuarioEstudiante`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estudiante`
--

LOCK TABLES `estudiante` WRITE;
/*!40000 ALTER TABLE `estudiante` DISABLE KEYS */;
INSERT INTO `estudiante` VALUES (1,10,31,0,'soy nuevo usuario'),(2,10,1238912839,0,'Ninguna descripcion por ahora');
/*!40000 ALTER TABLE `estudiante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluacion`
--

DROP TABLE IF EXISTS `evaluacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluacion` (
  `idevaluacion` int NOT NULL,
  `calificacion` int NOT NULL DEFAULT '100',
  `reqAprobacion` tinyint NOT NULL DEFAULT '0',
  `disponibilidad` tinyint NOT NULL DEFAULT '1',
  `idDocenteEval` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idevaluacion`),
  KEY `idDocenteEval_idx` (`idDocenteEval`),
  CONSTRAINT `idDocenteEval` FOREIGN KEY (`idDocenteEval`) REFERENCES `docente` (`iddocente`)
) ENGINE=InnoDB AUTO_INCREMENT=12345 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluacion`
--

LOCK TABLES `evaluacion` WRITE;
/*!40000 ALTER TABLE `evaluacion` DISABLE KEYS */;
INSERT INTO `evaluacion` VALUES (123,100,0,1,12344);
/*!40000 ALTER TABLE `evaluacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pregunta`
--

DROP TABLE IF EXISTS `pregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pregunta` (
  `idpregunta` int NOT NULL,
  `enunciado` varchar(1024) NOT NULL,
  `tipoPregunta` varchar(45) NOT NULL,
  `respuestaCorrecta` varchar(45) NOT NULL,
  `opcion` varchar(450) NOT NULL,
  `retroalimentacion` varchar(1024) NOT NULL,
  `idEvaAsoc` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idpregunta`),
  KEY `idEvalAsoc_idx` (`idEvaAsoc`),
  CONSTRAINT `idEvaluacion` FOREIGN KEY (`idEvaAsoc`) REFERENCES `evaluacion` (`idevaluacion`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pregunta`
--

LOCK TABLES `pregunta` WRITE;
/*!40000 ALTER TABLE `pregunta` DISABLE KEYS */;
INSERT INTO `pregunta` VALUES (1234,'','','','','',123),(1235,'kdkdk','Seleccion','nada','','123',123);
/*!40000 ALTER TABLE `pregunta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reporte`
--

DROP TABLE IF EXISTS `reporte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reporte` (
  `idreporte` int NOT NULL AUTO_INCREMENT,
  `fechaCreacion` datetime NOT NULL,
  `tipo` varchar(45) NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `idDocenteReporte` int NOT NULL,
  PRIMARY KEY (`idreporte`),
  KEY `idDocenteReporte_idx` (`idDocenteReporte`),
  CONSTRAINT `idDocenteReporte` FOREIGN KEY (`idDocenteReporte`) REFERENCES `docente` (`iddocente`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reporte`
--

LOCK TABLES `reporte` WRITE;
/*!40000 ALTER TABLE `reporte` DISABLE KEYS */;
INSERT INTO `reporte` VALUES (1,'2023-01-01 00:00:00','estudiante','sdfsdf',12344);
/*!40000 ALTER TABLE `reporte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `respuesta`
--

DROP TABLE IF EXISTS `respuesta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `respuesta` (
  `idrespuesta` int NOT NULL AUTO_INCREMENT,
  `valorRespuesta` varchar(45) NOT NULL,
  `estado` varchar(45) NOT NULL,
  `idPreguntaAsociada` int NOT NULL,
  `idEvaluacionAsociada` int NOT NULL,
  `idEstudianteResponsable` int NOT NULL,
  PRIMARY KEY (`idrespuesta`),
  KEY `idPreguntaAsociada_idx` (`idPreguntaAsociada`),
  KEY `idEvaluacionAsociada_idx` (`idEvaluacionAsociada`),
  KEY `idEstudianteResponsable_idx` (`idEstudianteResponsable`),
  CONSTRAINT `idEstudianteResponsable` FOREIGN KEY (`idEstudianteResponsable`) REFERENCES `estudiante` (`idEstudiante`),
  CONSTRAINT `idEvaluacionAsociada` FOREIGN KEY (`idEvaluacionAsociada`) REFERENCES `evaluacion` (`idevaluacion`),
  CONSTRAINT `idPreguntaAsociada` FOREIGN KEY (`idPreguntaAsociada`) REFERENCES `pregunta` (`idpregunta`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respuesta`
--

LOCK TABLES `respuesta` WRITE;
/*!40000 ALTER TABLE `respuesta` DISABLE KEYS */;
INSERT INTO `respuesta` VALUES (1,'123','FALL',1235,123,1);
/*!40000 ALTER TABLE `respuesta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUsuario` int NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `codigo` int DEFAULT NULL,
  `correo` varchar(45) NOT NULL,
  `contrasena` varchar(1024) NOT NULL,
  `rol` varchar(30) NOT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (10,'Marlon',1151914,'marlonprado@gmail.com','1234','STUDENT'),(11,'Jairo',115,'marlonprado2@gmail.com','12345','TEACHER');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-28 16:54:26
