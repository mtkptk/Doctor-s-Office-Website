import mongoose from "mongoose";

const Schema = mongoose.Schema;


//slika i niz radnika?

let RegistrationRequest = new Schema({
    type: {
        type: String
    },
    username:{
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    image_path:{
        type: String
    },
    name: {
        type: String
    },
    last_name: {
        type: String
    },
    licence: {
        type: String
    },
    address: {
        type: String
    },
    spec: {
        type: String
    },
    ogranak: {
        type: String
    }/*
    workers: {
        type: [Schema.Types.ObjectId], // Assuming worker IDs are ObjectIDs
        default: []
    }*/
    
})

export default mongoose.model('RegistrationRequest', RegistrationRequest, 'RegistrationRequest');