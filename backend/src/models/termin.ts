import mongoose from "mongoose";
import Pregled from "../models/pregled";

const Schema = mongoose.Schema;

let Termin = new Schema({
    start: {type: Number},
    duration: {type: Number},
    lekar_id: {type: String},
    pacijent_id: {type: String},
    pregled: {type: Object},
    izvestaj: {type: Boolean}
})



export default mongoose.model('Termin', Termin, 'Termin');