const mongoose = require('mongoose');
const bcrypt  = require('bcrypt')


const userSchema = new mongoose.Schema({
    username: {
      type:String,
      require:true
     },
    role: {
        type: String,
        enum: ['master', 'Admin', 'User'],
        default: 'User',
        require
    },
    email:{type:String, require:true},
    password:{
      type:String,
      require:true
    }
});
userSchema.pre('save',  async function (next) {
    try {
      if(this.isNew){
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        if(this.email.includes('admin@gmail.com')){
            this.role = 'master'

        }
           
      }
      next();
    } catch (error) {
      next(error)
    }
  })

  userSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  }

module.exports = mongoose.model('User', userSchema);
