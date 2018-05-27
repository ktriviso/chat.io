\c iochat_db

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS chatroom CASCADE;
DROP TABLE IF EXISTS users_chatroom CASCADE;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(28) UNIQUE NOT NULL,
  image VARCHAR(255) NOT NULL,
  name VARCHAR(28) NOT NULL,
  email VARCHAR(28) UNIQUE NOT NULL,
  password VARCHAR(28) NOT NULL
);

CREATE TABLE chatroom (
  chatroom_id SERIAL PRIMARY KEY
);

CREATE TABLE users_chatroom (
  users_chatroom_id SERIAL PRIMARY KEY,
  chatroom_id INT REFERENCES chatroom(chatroom_id),
  user_id INT REFERENCES users(user_id)
);

CREATE TABLE messages (
  message_id SERIAL PRIMARY KEY,
  sender_id  INT REFERENCES users(user_id),
  recp_id INT REFERENCES users(user_id),
  content VARCHAR(255) NOT NULL,
  chatroom_id INT REFERENCES chatroom(chatroom_id)
);

ALTER TABLE chatroom
  ADD users_chatroom_id INT REFERENCES users_chatroom(users_chatroom_id)
