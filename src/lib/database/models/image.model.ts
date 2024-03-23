import { Schema, model, models } from "mongoose";

const ImageSchema = new Schema({
    title: {type: String, required: true},
    transformationType: {type: String, required: true},
    publicId: {type: String, required: true},
    secur_url: {type: String, required: true},
    width: {type: Number},
    height: {type: Number},
    config: {type: Object},
    transformation: {type: URL},
    aspectRatio: {type: String},
    color: {type: String},
    prompt: {type: String},
    author: {type: Schema.Types.ObjectId, ref: "User"},
    created_at: {type: Date, default: Date.now()},
    updated_at: {type: Date, default: Date.now()},
})

const Image = models?.Image || model("Image", ImageSchema);
export default Image;