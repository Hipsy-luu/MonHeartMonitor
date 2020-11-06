-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 06-11-2020 a las 05:34:51
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `last_proy`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `directions`
--

CREATE TABLE `directions` (
  `idDirection` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `surnames` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `street` varchar(800) COLLATE utf8_unicode_ci NOT NULL,
  `number` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `extNumber` varchar(100) COLLATE utf8_unicode_ci DEFAULT '',
  `state` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `postalCode` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `colony` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `default` tinyint(1) NOT NULL DEFAULT 0,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `idUser` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `patients`
--

CREATE TABLE `patients` (
  `idPatient` int(11) NOT NULL,
  `idMonitor` int(11) DEFAULT NULL,
  `idUserPatient` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `patients`
--

INSERT INTO `patients` (`idPatient`, `idMonitor`, `idUserPatient`) VALUES
(3, 1, 6),
(4, 2, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `idUser` int(11) NOT NULL,
  `fullName` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `userType` int(11) NOT NULL,
  `createDate` datetime DEFAULT NULL,
  `lastLogin` datetime DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `description` varchar(5000) COLLATE utf8_unicode_ci NOT NULL,
  `active` tinyint(1) DEFAULT 0,
  `genre` int(11) NOT NULL,
  `birthDay` datetime NOT NULL,
  `direction` varchar(1500) COLLATE utf8_unicode_ci NOT NULL,
  `height` double NOT NULL,
  `weight` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`idUser`, `fullName`, `email`, `password`, `phone`, `userType`, `createDate`, `lastLogin`, `deleted`, `description`, `active`, `genre`, `birthDay`, `direction`, `height`, `weight`) VALUES
(1, 'Luismiguel Ortiz monitor', 'luismi.luu@gmail.com', '$2b$10$fzNVL9/GtWWkOKmDc9eBX.f2rivnxocOBWzi6sW/I0jnC3eTh73CK', '6394740742', 0, '2020-11-05 06:19:31', '2020-11-05 06:19:31', 0, '', 0, 0, '2018-10-03 06:00:00', '', 0, 0),
(2, 'Luismiguel Ortiz', 'luismi.luu1@gmail.com', '$2b$10$mig8E0/jMo5hWHhTGVuFDusEel6ktIlE.kM6rEghPvSsAeFJohLK.', '6394740742', 0, '2020-11-04 21:38:46', '2020-11-04 21:38:46', 0, '', 0, 0, '2020-11-04 21:38:46', '', 0, 0),
(3, 'Luismiguel Ortiz', 'luismi.luu2@gmail.com', '$2b$10$DvE.YU.psMiAYrLBLYX9Uu7YMirW/2re7Xj69qG/Cugshsp91aSkK', '6394740742', 0, '2020-11-04 21:39:19', '2020-11-04 21:39:19', 0, '', 0, 0, '2020-11-04 21:39:19', '', 0, 0),
(4, 'Luismiguel Ortiz', 'luismi.luu3@gmail.com', '$2b$10$VHjpb8RXRIB.NRAXPt65xuGOhpLykP9s5p2hL2oN0bl29d7Gm06Ga', '6394740742', 0, '2020-11-04 21:41:14', '2020-11-04 21:41:14', 0, '', 0, 0, '2020-11-04 21:41:14', '', 0, 0),
(5, 'Luismiguel Ortiz', 'luismi.luu4@gmail.com', '$2b$10$b.iZVpKVsCJrSmdJ/tjcLOisZTc1mgBtMo1FbkhLWW5wrCuiWIgPi', '6394740742', 0, '2020-11-04 21:43:19', '2020-11-04 21:43:19', 0, '', 0, 0, '2020-11-04 21:43:19', '', 0, 0),
(6, 'Luismiguel Ortiz cliente', 'luismi.luu5@gmail.com', '$2b$10$40dQykMDPCPXOJuM14MJLODU3daWGsHQ07S6YIP/VVZoVLgmsBQCq', '6394740742', 1, '2020-11-06 03:59:03', '2020-11-06 03:59:03', 0, '', 0, 1, '1994-01-18 06:00:00', 'Calle chida', 194, 72);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `directions`
--
ALTER TABLE `directions`
  ADD PRIMARY KEY (`idDirection`),
  ADD UNIQUE KEY `idDirection` (`idDirection`),
  ADD KEY `idUser` (`idUser`);

--
-- Indices de la tabla `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`idPatient`),
  ADD UNIQUE KEY `patients_UN` (`idMonitor`),
  ADD KEY `patients_FK` (`idUserPatient`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `users_UN` (`idUser`,`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `directions`
--
ALTER TABLE `directions`
  MODIFY `idDirection` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `patients`
--
ALTER TABLE `patients`
  MODIFY `idPatient` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `directions`
--
ALTER TABLE `directions`
  ADD CONSTRAINT `directions_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `patients`
--
ALTER TABLE `patients`
  ADD CONSTRAINT `patients_FK` FOREIGN KEY (`idUserPatient`) REFERENCES `users` (`idUser`),
  ADD CONSTRAINT `patients_FK_1` FOREIGN KEY (`idMonitor`) REFERENCES `users` (`idUser`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
