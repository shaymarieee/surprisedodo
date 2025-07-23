const users = [];

//User data field
class User {
    constructor(id, username, bio, profileUrl) {
        this.id = id;
        this.username = username;
        this.active = true;
        this.bio = bio;
        this.dateJoined = new Date();
        this.profileUrl = profileUrl;
        this.posts = [];
    }
}

//add a new user
function addUser(username, bio, profileUrl) {
    const id = users.length + 1;
    const newUser = new User(id, username, bio, profileUrl);
    users.push(newUser);
    return newUser;
}