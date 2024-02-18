export default class UserModel{
    constructor(id,name, email,password){
        this.id=id;
        this.name=name;
        this.email=email;
        this.password=password;
    }

    static getAllUsers(){
        return users;
    }

    static addUser(name,email,password){
        const newuser=new UserModel(users.length+1,name,email,password);
        users.push(newuser);
        console.log(users);
    }

    static isValidUSer(email,password){
        const result=users.find(u=>u.email==email && u.password==password);
        return result;
    }
    
}

var users=[];