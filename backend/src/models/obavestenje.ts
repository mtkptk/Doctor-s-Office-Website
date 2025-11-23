import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Obavestenje = new Schema({
    type: {type: String},
    opis: {type: String}
})

export default mongoose.model('Obavestenje', Obavestenje, 'Obavestenje');