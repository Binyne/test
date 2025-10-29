import mongoose from "mongoose";

const sexSchema = new mongoose.Schema({
    name:{type:String, require: true, trim:true},
})

export default mongoose.model("Sex", sexSchema, "sex");