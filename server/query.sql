CREATE DATABASE pern_auth_app_db;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

select
  *
from
  pg_extension;

select
  *
from
  pg_available_extensions;

-- Table 1 - Users
CREATE TABLE users(
  user_id uuid DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY(user_id)
);

SELECT
  *
FROM
  users;

-- Table 2 - Todos
CREATE TABLE todos(
  todo_id SERIAL,
  user_id UUID,
  description VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (todo_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Fake Data!
INSERT INTO
  todos (user_id, description)
VALUES
  ('32531434-2efd-4d3f-9579-16802799392f', 'test') Returning *;

UPDATE
  todos
SET
  description = 'test update6',
  updated_at = now()
WHERE
  user_id = '32531434-2efd-4d3f-9579-16802799392f' RETURNING *;

SELECT
  *
FROM
  todos;

-- //* Old Version
-- Table 2 - Todos - old Version
CREATE TABLE todos(
  todo_id SERIAL,
  user_id UUID,
  description VARCHAR(255),
  created_modified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  -- updated_at timestamp DEFAULT localtimestamp,
  PRIMARY KEY (todo_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Fake Data!
INSERT INTO
  todos (user_id, description)
VALUES
  ('32531434-2efd-4d3f-9579-16802799392f', 'test');

UPDATE
  todos
SET
  description = 'test updated5'
WHERE
  user_id = '32531434-2efd-4d3f-9579-16802799392f' RETURNING *;

UPDATE
  todos
SET
  description = 'test update6',
  created_modified_at = '2023-02-05 17:07:11.360332+01' :: timestamp AT TIME ZONE 'Europe/Warsaw'
WHERE
  user_id = '32531434-2efd-4d3f-9579-16802799392f' RETURNING *;

UPDATE
  todos
SET
  description = 'test update6',
  created_modified_at = now()
WHERE
  user_id = '32531434-2efd-4d3f-9579-16802799392f' RETURNING *;

Drop table if exists todos;