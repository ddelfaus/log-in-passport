const db = require('../database/dbConfig.js');


module.exports = {
findBy,
findById,
add
    
   
}


// async function add(user) {
//     return db('users')
//     .insert(user, 'id')
// }


function findBy(filter) {
    
    return db('users').where(filter)
   
  }


function findById(id) {
    return db('users')
        .where({id: id})
}

async function add(user) {
    return db('users')
    .insert(user, 'id')
}

// function findById(id,cb) {
//     process.nextTick(function() {
//         const idx = id - 1;
//         if (db('users')) {
//             cb(null, db('users')[idx]);
//         } else {
//             cb(new Error('User' + id + 'does not exist'))
//         }
//     })
// }

// function findByUsername(username,cb) {
//     process.nextTick(function() {
//         for(var i = 0, len = db('users').length; i< len; i++) {
         
//             const user = db('users')[i];
//             if (user.username === username) {
//                 return cb(null, user)
//             }
//         }
//         return cb(null, null);
//     })
// }