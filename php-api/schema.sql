CREATE TABLE IF NOT EXISTS experiences (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  role VARCHAR(160) NOT NULL,
  company VARCHAR(160) NOT NULL,
  location VARCHAR(160) NOT NULL,
  start_year SMALLINT NOT NULL,
  start_month TINYINT NOT NULL,
  end_year SMALLINT NULL,
  end_month TINYINT NULL,
  bullets LONGTEXT NOT NULL,
  related LONGTEXT NOT NULL,
  technologies LONGTEXT NOT NULL,
  project_ids LONGTEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  status ENUM('public', 'review') NOT NULL DEFAULT 'public',
  title VARCHAR(160) NOT NULL,
  summary TEXT NOT NULL,
  product_type ENUM('mobile-app', 'website', 'dashboard', 'marketing') NOT NULL,
  engagement ENUM('employment', 'freelance', 'personal') NULL,
  contribution_kind ENUM('built', 'features', 'maintained') NULL,
  contribution TEXT NULL,
  technologies LONGTEXT NOT NULL,
  tasks LONGTEXT NOT NULL,
  problem TEXT NULL,
  completed TEXT NULL,
  links LONGTEXT NOT NULL,
  featured TINYINT(1) NOT NULL DEFAULT 0,
  experience_id VARCHAR(64) NULL,
  also_types LONGTEXT NOT NULL,
  audiences LONGTEXT NOT NULL,
  screenshot LONGTEXT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS sessions (
  token CHAR(64) NOT NULL PRIMARY KEY,
  expires_at DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS posts (
  track ENUM('software', 'marketing') NOT NULL,
  slug VARCHAR(80) NOT NULL,
  status ENUM('public', 'review') NOT NULL DEFAULT 'public',
  title VARCHAR(180) NOT NULL,
  excerpt TEXT NOT NULL,
  published_on DATE NOT NULL,
  tags LONGTEXT NOT NULL,
  body LONGTEXT NOT NULL,
  PRIMARY KEY (track, slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
