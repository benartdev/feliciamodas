-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 04-Jan-2019 às 22:57
-- Versão do servidor: 5.7.21-log
-- PHP Version: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `felicia`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `admins`
--

CREATE TABLE `admins` (
  `admin_id` int(11) NOT NULL,
  `admin_login` varchar(100) NOT NULL,
  `admin_email` varchar(250) NOT NULL,
  `admin_pwd` varchar(250) NOT NULL,
  `admin_nome` varchar(250) NOT NULL,
  `admin_permissao` text NOT NULL,
  `admin_dtcriacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `admin_status` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `admins`
--

INSERT INTO `admins` (`admin_id`, `admin_login`, `admin_email`, `admin_pwd`, `admin_nome`, `admin_permissao`, `admin_dtcriacao`, `admin_status`) VALUES
(1, 'superadm', 'ricardo@vidal.com.br', 'teste@1234', 'Ricardo Vidal', '', '2019-01-03 16:08:50', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `opcoes`
--

CREATE TABLE `opcoes` (
  `id` int(11) NOT NULL,
  `opcoes_logo` varchar(250) NOT NULL,
  `opcoes_titulo` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `opcoes`
--

INSERT INTO `opcoes` (`id`, `opcoes_logo`, `opcoes_titulo`) VALUES
(1, '', '');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `user_id` int(11) NOT NULL,
  `user_email` varchar(250) NOT NULL,
  `user_pwd` varchar(250) NOT NULL,
  `user_nome` varchar(100) NOT NULL,
  `user_sobrenome` varchar(100) NOT NULL,
  `user_cpf` varchar(25) NOT NULL,
  `user_telefone` varchar(20) NOT NULL,
  `user_cep` varchar(13) NOT NULL,
  `user_endereco` varchar(250) NOT NULL,
  `user_numero` int(11) NOT NULL,
  `user_bairro` varchar(250) NOT NULL,
  `user_cidade` varchar(250) NOT NULL,
  `user_estado` varchar(250) NOT NULL,
  `user_pais` varchar(250) NOT NULL,
  `user_lat` varchar(250) NOT NULL,
  `user_lnt` varchar(250) NOT NULL,
  `user_dtcriacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_dtnascimento` date NOT NULL,
  `user_sexo` char(1) NOT NULL,
  `user_status` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `opcoes`
--
ALTER TABLE `opcoes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `opcoes`
--
ALTER TABLE `opcoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
