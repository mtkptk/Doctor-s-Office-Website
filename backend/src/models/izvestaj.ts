import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Izvestaj = new Schema({
    kada: {type: Number},
    lekar_ime: {type: String},
    lekar_spec: {type: String},
    razlog: {type: String},
    dijagnoza: {type: String},
    terapija: {type: String},
    kontrola: {type: Number},
    pacijent_id: {type: String},
    lekar_id: {type: String},
    termin_id: {type: String}
})

export default mongoose.model('Izvestaj', Izvestaj, 'Izvestaj');