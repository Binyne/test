import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{type:String, require: true, trim:true},
    price:{type:Number, require: true},
    discount:{type:Number, require:true},
    quantity:{type:Number, require:true},
    image:{type:String, require:true},
    description:{type:String, default:null},
    color:{type:String, require:true},
    size:{type:Number, require:true},
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        require:true,
    },
    materialId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Material",
    },
    sexId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Sex",
    },
    imagePublicId:{type:String, default:null}
})

export default mongoose.model("Product", productSchema);