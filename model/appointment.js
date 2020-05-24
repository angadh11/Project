const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const UserSchema =new Schema({
	name:{
	type:String
    
},
pname:{
	type:String
}
});
const Appoint=mongoose.model('appointment',UserSchema);
module.exports=Appoint;