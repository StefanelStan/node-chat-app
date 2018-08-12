const expect = require('chai').expect;
const {Users} = require('./Users.js');

describe('Users', () =>{
    
    var users;
    beforeEach(() =>{
        users = new Users();
    });

    it('should add new user', ()=>{
        var users = new Users();
        let user = {id: 123, name: 'Stefan', room: 'the office'};

        let responseUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).to.deep.equal([user]);
    });

    it('should return names for node course', () =>{
        //add 2 users then get the room name
        users.addUser(3, 'Stef', 'Node Course');
        users.addUser(5, 'Rocky', 'Angular Course');
        let nodeUser = users.getUserList('Node Course');
        let angularUser = users.getUserList('Angular Course');
        expect(nodeUser).to.deep.equal(['Stef']);
        expect(angularUser).to.deep.equal(['Rocky']);
    });

    it('should remove user by id', () =>{
        users.addUser(3, 'Stef', 'Node Course');
        users.removeUser(3);
        expect(users.getUserList('Node Course')).to.be.empty;
    });

    it('find user by id', () =>{
        users.addUser(3, 'Stef', 'Node Course');
        users.addUser(5, 'Rocky', 'Angular Course');
        let user1 = users.getUser(3);
        let user2 = users.getUser(7);
        expect(user1).to.deep.equal({id: 3, name:'Stef', room: 'Node Course'});
        expect(user2).to.be.null;
    });


});