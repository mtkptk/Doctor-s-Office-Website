import mongoose from "mongoose";

const Schema = mongoose.Schema;

let UnavailableNames = new Schema({
    forbidden: {type: String},
    used: {type: String},
    email: {type: String}
})

export default mongoose.model('UnavailableNames', UnavailableNames, 'UnavailableNames');