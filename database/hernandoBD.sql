-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql-hernandito.alwaysdata.net
-- Generation Time: Nov 21, 2024 at 09:30 PM
-- Server version: 10.11.9-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hernandito_administracion`
--

-- --------------------------------------------------------

--
-- Table structure for table `abonos`
--

CREATE TABLE `abonos` (
  `metodo_pago_id` int(11) NOT NULL,
  `pedido_id` int(11) NOT NULL,
  `valor` double NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `abonos`
--
ALTER TABLE `abonos`
  ADD PRIMARY KEY (`metodo_pago_id`,`pedido_id`),
  ADD KEY `abonos_pedido_fk` (`pedido_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `abonos`
--
ALTER TABLE `abonos`
  ADD CONSTRAINT `abonos_metodo_fk` FOREIGN KEY (`metodo_pago_id`) REFERENCES `metodo_pago` (`id_metodo`),
  ADD CONSTRAINT `abonos_pedido_fk` FOREIGN KEY (`pedido_id`) REFERENCES `pedido` (`id_pedido`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
