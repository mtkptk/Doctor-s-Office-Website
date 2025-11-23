import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Pregled = new Schema({
    spec: {type: String},
    naziv: {type: String},
    zakaziv: {type: Boolean},
    cena: {type: Number},
    trajanje: {type: Number},
    request: {type: Boolean}
})

export default mongoose.model('Pregled', Pregled, 'Pregled');