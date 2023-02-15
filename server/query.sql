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

INSERT INTO
  todos (user_id, description)
VALUES
  (
    '32531434-2efd-4d3f-9579-16802799392f',
    'todo 2 - test 2'
  ) Returning *;

INSERT INTO
  todos (user_id, description)
VALUES
  (
    '2e356dac-7dcb-468a-ba05-370035ae0bc3',
    'User 3 - test'
  ) Returning *;

INSERT INTO
  todos (user_id, description)
VALUES
  (
    '6aa1082b-0e16-43a3-950d-22586bf27e3a',
    'User 4 - test'
  ) Returning *;

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

-- All Todos:
select
  u.user_name,
  u.user_email,
  t.todo_id,
  t.description,
  t.created_at,
  t.updated_at
from
  users as u
  join todos as t on t.user_id = u.user_id;

-- All Todos for a User (LEFT JOIN in a case user has no todos):
select
  u.user_name,
  u.user_email,
  t.todo_id,
  t.description,
  t.created_at,
  t.updated_at
from
  users as u
  left join todos as t on t.user_id = u.user_id
where
  u.user_id = '32531434-2efd-4d3f-9579-16802799392f';

select
  u.user_name,
  u.user_email,
  t.todo_id,
  t.description,
  t.created_at,
  t.updated_at
from
  users as u
  left join todos as t on t.user_id = u.user_id
where
  u.user_id = 'b3118196-f227-4f6d-8d00-62e026e53f00';

-- //* Updating Todos Table - column private was added
ALTER TABLE
  todos
ADD
  COLUMN private BOOLEAN;

UPDATE
  todos
SET
  private = 'f';

ALTER TABLE
  todos
ALTER COLUMN
  private
SET
  NOT NULL;

ALTER TABLE
  todos
ALTER COLUMN
  private
SET
  DEFAULT FALSE;

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