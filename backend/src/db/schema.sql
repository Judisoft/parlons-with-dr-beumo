CREATE DATABASE IF NOT EXISTS french_tutor CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE french_tutor;

CREATE TABLE IF NOT EXISTS bookings (
  id             CHAR(36)     NOT NULL,
  first_name     VARCHAR(100) NOT NULL,
  last_name      VARCHAR(100) NOT NULL,
  email          VARCHAR(255) NOT NULL,
  french_level   ENUM('beginner','intermediate','advanced') NOT NULL,
  session_goal   ENUM('tef-prep','tcf-prep','delf-dalf-prep','general','conversation') NOT NULL,
  preferred_days JSON         NOT NULL,
  preferred_time ENUM('morning','afternoon','evening') NOT NULL,
  created_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS courses (
  id            VARCHAR(20)       NOT NULL,
  title         VARCHAR(255)      NOT NULL,
  level         ENUM('beginner','intermediate','advanced') NOT NULL,
  description   TEXT              NOT NULL,
  duration      VARCHAR(50)       NOT NULL,
  lesson_count  SMALLINT UNSIGNED NOT NULL,
  instructor    VARCHAR(100)      NOT NULL,
  cover_color   VARCHAR(20)       NOT NULL,
  price         DECIMAL(8,2)      NOT NULL,
  rating        DECIMAL(3,1)      NOT NULL,
  student_count INT UNSIGNED      NOT NULL,
  tags          JSON              NOT NULL,
  PRIMARY KEY (id),
  INDEX idx_level (level)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
