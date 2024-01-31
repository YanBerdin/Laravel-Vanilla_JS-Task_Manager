/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tasks` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

INSERT INTO `tasks` (`id`, `title`, `created_at`, `updated_at`) VALUES
(1, 'Acheter une salade', '2022-08-21 19:13:59', '2022-08-21 19:13:59'),
(2, 'Manger la salade', '2022-08-21 19:14:18', '2022-08-21 19:14:18'),
(3, 'Laver son assiette', '2022-08-21 19:14:33', '2022-08-21 19:14:33');


/* Ajout des deux tables categories et tags */;
-- Adminer 4.7.6 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'L''identifiant de notre catégorie',
  `name` varchar(64) NOT NULL COMMENT 'Le nom de la catégorie',
  `status` tinyint(3) unsigned NOT NULL DEFAULT 1 COMMENT 'Le statut de la catégorie (1=active, 2=désactivée)',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'La date de création de la catégorie',
  `updated_at` timestamp NULL DEFAULT NULL COMMENT 'La date de la dernière mise à jour de la catégorie',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Modif Post Oclock
-- DROP TABLE IF EXISTS `tasks`;

-- CREATE TABLE `tasks` (
--   `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
--   `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
--   `status` tinyint(4) NOT NULL DEFAULT 0,
--   `created_at` timestamp NULL DEFAULT NULL,
--   `updated_at` timestamp NULL DEFAULT NULL,
--   `category_id` int unsigned NULL,
--   `tag_id` int unsigned NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- version perso
-- INSERT INTO `tasks` (`id`, `title`, `created_at`, `updated_at`, `category_id`) VALUES
-- (1,'Acheter une salade', '2022-08-21 19:13:59', '2022-08-21 19:13:59',1),
-- (3,'Laver son assiette', '2022-08-21 19:14:33', '2022-08-21 19:14:33',2),
-- (4,'Manger des frites', '2023-03-30 22:50:28', '2023-03-31 00:08:32',3),
-- (5,'balayer devant ma porte', '2023-04-05 17:54:55', '2023-04-05 17:54:55',2),
-- (6,'Donner à manger aux oiseaux', '2023-04-05 18:01:35', '2023-04-05 18:01:35',2),
-- (7,'Apprendre la POO', '2023-04-05 18:02:31', '2023-04-05 18:02:31',3),
-- (8,'Apprendre la physique Quantique', '2023-10-03 09:38:32', '2023-10-03 09:38:32',3),
-- (9,'Apprendre Python', '2023-10-10 14:01:01', '2023-10-10 14:01:01',3),
-- (10,'Apprendre PHP', '2023-10-10 21:25:45', '2023-10-10 21:25:45',3);


-- A utiliser si besoin
-- ALTER TABLE `tasks`
-- ADD `task_id` int unsigned NULL;
-- ADD `tag_id` int unsigned NULL;



-- TABLE DE LIAISON => E06 Marion

-- CREATE TABLE `EST_TAGGÉE_PAR` (
--   `id` VARCHAR(42),
--   `id_1` VARCHAR(42),
--   PRIMARY KEY (`id`, `id_1`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

-- Version perso
CREATE TABLE `tag_task` (
  `tag_id` VARCHAR(42),
  `task_id` VARCHAR(42),
  PRIMARY KEY (`tag_id`, `task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;