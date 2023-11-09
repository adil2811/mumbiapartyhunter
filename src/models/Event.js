import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true, 
    },
    email:{
        type: String,
        required: true, 
    },
    title: {
        type: String,
        required: true, // This makes the 'title' field required
    },
    description: {
        type: String,
        required: true, // This makes the 'description' field required
    },
    company:{
        type:String,
    },
    h1: {
        type: String,
        required: true, // This makes the 'h1' field required
    },
    images: [
        {
            type: String,
        },
    ],
    category: {type:mongoose.Types.ObjectId, ref:'Category'},
    properties: {type:Object},
    price:{
        type: Number,
        required:true,
    },
    disprice:{
        type: Number,
    },
    rating:{
        type:Number,
    },

    addedDate: {
        type:Date,
        required:true,
        default:Date.now()
    },
    isVerified: {
        type:Boolean,
        required:true,
        default:false
    },
});

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

export default Event;
