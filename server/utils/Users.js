const {User} = require('./User.js');

//add user (idf, name, roomname)
//remove user (to update the people list) by socket id
//getUser (id)
//getUsers(room_name): [] of names

class Users{
    constructor(){
        this.users = [];
    }

    addUser(id, name, room){
        let newUser = new User(id, name, room);
        this.users.push(newUser);
        return newUser;
    }

    removeUser(id){
        let userToDelete = this.getUser(id);
        if (userToDelete){
            this.users = this.users.filter((user) => user.id !== id);
        }
        return userToDelete;
    }

    getUser(id) {
        for (let user of this.users) {
            if (user.id === id) {
                return user;
            }
        }
        return null;
    }

    getUserList(room){
        //return the users that are inside a specific room ['Tom', 'Jamie']
        let roomUsers = this.users.filter((user) =>user.room === room);
        let namesArray = roomUsers.map((user) => user.name);
        return namesArray;
    }
}

module.exports = {
    Users
}
