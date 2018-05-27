const db = require ('../config/connection');

module.exports = {

  // add new user
  // handles the submit from register form
  addUser(username, image, name, email, password){
    return db.one(`
      INSERT INTO users (username, image, name, email, password)
      VALUES ($/username/, $/image/, $/name/, $/email/, $/password/)
      RETURNING *
    `, user);
  },

  // get one existing user
  // for the profile page and login
  getUser(user_id){
    return db.one(`
      SELECT *
      FROM users
      WHERE user_id = $1
    `, user_id);
  },

  // creates a reference between users, chatroom, messages
  createReference(chatroom_id, user_id, message_id){
    return db.one(`
      INSERT INTO reference (chatroom_id, user_id, message_id)
      VALUES($/chatroom_id/, $/user_id/, $/message_id/)
      RETURNING *
    `);
  },

  // get all from selected chatroom
  returnReferences(chatroom_id){
    return db.many(`
      SELECT *
      FROM reference
      JOIN users ON (reference.user_id = users.user_id)
      JOIN chatroom ON (reference.chatroom_id = chatroom.chatroom_id)
      JOIN messages ON (reference.message_id = message.message_id)
      WHERE chatroom_id = $1
    `, chatroom_id);
  },

  deleteReference(user_id, chatroom_id, message_id){
    return db.none(`
      DELETE FROM reference
      WHERE user_id = $1 AND
      WHERE chatroom_id = $2 AND
      WHERE message_id = $3
    `, [user_id, chatroom_id, message_id])
  },

  // handle submit messages in any chatroom
  storeMessage(message){
    return db.one(`
      INSERT INTO messages (content) VALUES ($/message/)
      RETURNING *
    `, message);
  },

  editMessage(message_id, content){
    return db.one(`
      UPDATE messages
      SET
      content = $2
      WHERE message_id = $1
      RETURNING *
    `, [message_id, content]);
  },

  deleteMessage(message_id){
    return db.none(`
      DELETE FROM messages
      WHERE message_id = $/message_id/
    `, message_id);
  },

  // create chatroom
  createChatroom(name) {
    return db.one(`
      INSERT INTO chatroom (name)
      VALUES ($/name/)
      RETURNING *
    `, name);
  },

}
