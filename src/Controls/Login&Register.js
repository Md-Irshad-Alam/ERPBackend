const User =require('../Models/UserModel')
const jwt = require('jsonwebtoken')

let generateToken = (user)=>{
    let {_id, name, email} = user;
    return jwt.sign({
        _id, name, email
    }, "@#$%12")
}
const IsvalidateEmail = (email)=>{
    const RegexEmil = /^[^\s@]+@gmail\.com$/
    const Isemailvalid = RegexEmil.test(email)
    return Isemailvalid;
}
const register = async (req, res) => {
        try {
          const { email } = req.body;
         if( IsvalidateEmail(email)){
            let user = await User.findOne({ email });
      
          if (user) {
            return res.send({ error: "User email already registered" });
          } else {
            const userData = {
              ...req.body,
             
            };
            user = await User.create(userData);
            return res.status(200).send({data: user });
          }
         }else{
            res.send('Incorrect email formate,  please provide correct email')
         }
          
        } catch (error) {
          console.log(error);
          return res.status(400).send({ error });
        }
      };

const login = async(req, res) => {
    try {
    
        if(IsvalidateEmail(req.body.email)){
            const user  = await User.findOne({email : req.body.email});

            if (!user) return res.status(404).send({message: "Invalid Credentials"});
    
            const match = user.checkPassword(req.body.password);
    
            if (!match) return res.status(404).send({message: "Invalid password"});
    
    
            const token = generateToken(user);
    
            return res.status(200).send({token: token});
        }else{
            res.send('Incorrect email formate,  please provide correct email')
        }
        

    } catch (error) {
        return res.status(500).send(error.message);
    }
}
module.exports ={
    login,
    register
}