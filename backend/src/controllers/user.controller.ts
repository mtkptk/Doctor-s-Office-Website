import express, { response } from 'express'
import {Md5} from 'ts-md5'
import UserModel from '../models/user'
import RegistrationRequest from '../models/registration_request';
import UnavailableNames from '../models/unavailable_names';
import { ImageUpload } from './imageUpload'
import Specijalizacija from '../models/specijalizacija';
import Pregled from '../models/pregled';
import Termin from '../models/termin';
import Izvestaj from '../models/izvestaj';

const fs = require('fs');

export class UserController{

    imageUpload = ImageUpload.uploadImage.single('image');

    uploadImage = (req: express.Request, res: express.Response)=>{
        this.imageUpload(req, res, (err)=>{
            if(err) console.log(err);
            else{
                res.json({'message': "ok"});
            }

        })
    }

    removeImage = (req: express.Request, res: express.Response)=>{

        let user = req.body.user;

        if(user.image_path != null){
            let path = 'src/images/';
            let name = user.username;
            let final_path = path + name;
            fs.unlink(final_path + ".png", err=>{
                if(err){
                    fs.unlink(final_path + ".jpg", err=>{
                        if(err) console.log(err);
                        else res.json({"message": "ok"});
                    })
                } else{
                    res.json({"message": "ok"});
                }
            })
         }
         else{
            res.json({"message": "ok"});
         }
    }

    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = Md5.hashStr(req.body.password);

        UserModel.findOne({'username': username, 'password': password}, (err, user) =>{
            if(err) console.log(err);
            else res.json(user);
        })
    }

    register = (req: express.Request, res: express.Response)=>{

       /* this.imageUpload(req, res, (err)=>{
            if(err) console.log(err);

        })*/

        //hashujem password
        req.body.password = Md5.hashStr(req.body.password)
        //uzimamo username
        let username = req.body.username;
        let email = req.body.email;
        //proveravamo da li je zabranjeno ili iskorisceno
        let OK;



        UnavailableNames.findOne({
            $or: [
                {forbidden: {$in: [username]}},
                {used: {$in: [username]}},
                {email: {$in: [email]}}
            ]
        }, (err, unavail) =>{
            if(err) console.log(err);
            else {
                OK = unavail;
                if(OK == null){
                    let user = new RegistrationRequest(req.body)
            
                        user.save((err, resp)=>{
                            if(err) {
                            console.log(err)
                            res.status(400).json({"message": "not ok"})
                        }
                            else{
                                let un = new UnavailableNames({forbidden: username, email: email});
                                un.save((err, resp)=>{
                                    if(err) console.log(err);
                                    else res.json({"message": "ok"});
                                })
                            }
                        })
                    }
                    else{
                        res.json({"message": "forbidden_username"})
                    }
            
            }
        });
        
}

     addUser = (req: express.Request, res: express.Response)=>{
        //hashujem password
        req.body.password = Md5.hashStr(req.body.password)
        //uzimamo username
        let username = req.body.username;
        let email = req.body.email;
        //proveravamo da li je zabranjeno ili iskorisceno
        let OK;

        UnavailableNames.findOne({
            $or: [
                {forbidden: {$in: [username]}},
                {used: {$in: [username]}},
                {email: {$in: [email]}}
            ]
        }, (err, unavail) =>{
            if(err) console.log(err);
            else {
                OK = unavail;
                if(OK == null){
                    let user = new UserModel(req.body)
            
                        user.save((err, resp)=>{
                            if(err) {
                            console.log(err)
                            res.status(400).json({"message": "not ok"})
                        }
                            else{
                                let un = new UnavailableNames({forbidden: username, email: email});
                                un.save((err, resp)=>{
                                    if(err) console.log(err);
                                    else res.json({"message": "ok"});
                                })
                            }
                        })
                    }
                    else{
                        res.json({"message": "forbidden_username"})
                    }
            
            }
        });
    }

    getAllRequests = (req: express.Request, res: express.Response)=>{
        RegistrationRequest.find({}, (err, usrs)=>{
            if(err) console.log(err);
            else{
                res.json(usrs);
            }
        })
     }

     approve_registration_request = (req: express.Request, res: express.Response)=>{
        let user = req.body.user;
        
        RegistrationRequest.find({'_id': user._id}, (err, usr)=>{
            if(err) console.log(err);
            else{
                let new_user = new UserModel({
                    type: user.type,
                    username: user.username,
                    password: user.password,
                    phone: user.phone,
                    email: user.email,
                    name: user.name,
                    last_name: user.last_name,
                    licence: user.licence,
                    address: user.address,
                    spec: user.spec,
                    ogranak: user.ogranak
                })
                new_user.save((err)=>{
                    if(err) console.log(err);
                    else{
                        RegistrationRequest.deleteOne({'_id': user._id}, (err)=>{
                            if(err) console.log(err);
                            else UnavailableNames.deleteOne({'used': user.username}, (err)=>{
                                if(err) console.log(err);
                                else{
                                    res.json({message: "ok"});
                                }
                            });
                        });
                    }
                })
            }
        })
     }

     deny_registration_request = (req: express.Request, res: express.Response)=>{
        let user = req.body.user

        RegistrationRequest.deleteOne({'_id': user._id}, (err)=>{
            if(err) console.log(err);
            else{
                if(user.image_path!=null){
                    let path = "src/images/";
                    let name = user.username;
                    let final_path = path + name;
                    fs.unlink(final_path + ".png", err=>{
                        if(err){
                            fs.unlink(final_path + ".jpg", err=>{
                                if(err) console.log(err);
                                else res.json({"message": "ok"});
                            })
                        } else{
                            res.json({"message": "ok"});
                        }
                    })
                 }
                 else{
                    res.json({"message": "ok"});
                 }
            }
            
        })
     }

     getAll = (req: express.Request, res: express.Response)=>{
        UserModel.find({}, (err, usrs)=>{
            if(err) console.log(err);
            else res.json(usrs);
        })
    }

    updateOn = (req: express.Request, res: express.Response)=>{
        let user = req.body.user;       //koga menjam
        let prop = req.body.prop;       //sta menjam
        let val = req.body.val;         //cime menjam
        let old = req.body.old;

        if(prop == "email"){        //ako je email ono sto menjamo moramo utvrditi da novi mejl jeste unique.
            UnavailableNames.findOne({'email': val}, (err, usr)=>{
                if(err) console.log(err);
                else{
                    if(usr != null){
                        res.json({message: "email in use"})
                    }
                    else{
                        UserModel.updateOne({'_id': user._id}, {$set: {[prop]: val}}, (err)=>{
                            if(err) console.log(err);
                            else {
                                UnavailableNames.updateOne({'email': old}, {$set: {"email": val}}, (err)=>{
                                    if(err) console.log(err);
                                    else res.json({message: "ok"});
                                })
                            }
                        }) 
                    }
                }
            })
        } else{
            UserModel.updateOne({'_id': user._id}, {$set: {[prop]: val}}, (err)=>{
                if(err) console.log(err);
                else {
                    res.json({message: "ok"});}
            })    
        }  
   
     }

     getUserByID = (req: express.Request, res: express.Response) =>{
        let user_id = req.body.user_id;
        UserModel.findById(user_id, (err, usr)=>{
            if(err) console.log(err);
            else{
                res.json(usr);
            }
        })
     }

     changePasword = (req: express.Request, res: express.Response) => {
        let user = req.body.user;
        //let old_password = req.body.old_password;
        //let new_password = req.body.new_password;
   
        let old_password = Md5.hashStr(req.body.old_password);
        let new_password = Md5.hashStr(req.body.new_password);

        UserModel.findOne({'_id': user._id, 'password': old_password}, (err, usr)=>{
            if(err) console.log(err);
            else {
                if(usr != null){
                    UserModel.updateOne({'_id': user._id}, {$set:{password: new_password}}, (err)=>{
                        if(err) console.log(err);
                        else res.json({message: "ok"});
                    })
                }else{
                    res.json({message: "wrong old_password"});
                }
            }
        })
     }

     getAllSpec = (req: express.Request, res: express.Response) => {
        Specijalizacija.find({}, (err, specs)=>{
            if(err) console.log(err);
            else res.json(specs);
        })
    }

    addSpec  = (req: express.Request, res: express.Response) => {
        let spec = new Specijalizacija(req.body);
        spec.save((err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }

    addPregled = (req: express.Request, res: express.Response) => {
        let pregled = new Pregled(req.body);
        pregled.save((err, resp)=>{
            if(err) console.log(err);
            else res.json({'message':'ok'});
        })
    }

    getAllPregled = (req: express.Request, res: express.Response) => {
        Pregled.find({}, (err, specs)=>{
            if(err) console.log(err);
            else res.json(specs);
        })
    }

    editPregled = (req: express.Request, res: express.Response)=>{ 
        Pregled.updateOne({'_id': req.body._id}, {$set: {[req.body.param]: req.body.val}}, err=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'});
        });
    }

    deletePregledRequest = (req: express.Request, res: express.Response)=>{ 
        Pregled.deleteOne({'_id': req.body._id}, (err)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }

    getAllPreglediByIDs = (req: express.Request, res: express.Response)=>{ 
        Pregled.find({'_id': req.body.id}, (err, resp)=>{
            if(err) console.log(err);
            else res.json(resp);
        })
    }

    addVrstaPregledaToLekar= (req: express.Request, res: express.Response)=>{
        UserModel.updateOne({'_id': req.body.id_lekara}, {$push: {'pregledi': req.body.id_pregleda}}, err=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'});
        })
    }

    getPregledByID = (req: express.Request, res: express.Response)=>{
        Pregled.findOne({'_id': req.body._id}, (err,resp)=>{
            if(err) console.log(err);
            else res.json(resp);
        })
    }



    addZauzetostLekaru  = (req: express.Request, res: express.Response)=>{
        UserModel.updateOne({'_id': req.body.id_lekara}, {$push: {'zauzetost': {start: req.body.start, duration: req.body.duration, odmor: req.body.odmor}}}, (err)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'});
        })
    }

    /*getZauzetostiByIDLekara = (req: express.Request, res: express.Response)=>{
        Zauzetost.find({'lekar_id': req.body.lekar_id}, (err, resp)=>{
            if(err) console.log(err);
            else res.json(resp);
        })
    }

    addZauzetost = (req: express.Request, res: express.Response)=>{
        let z = new Zauzetost(req.body);
        z.save(err=>{
            if(err) console.log(err);
            else res.json({'message': 'ok', '_id': z._id});
        })
    }*/

    addTermin = (req: express.Request, res: express.Response)=>{
        let t = new Termin(req.body);
        t.save(err=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'});
        })
    }

    getTerminiForPacijent = (req: express.Request, res: express.Response)=>{
        Termin.find({'pacijent_id': req.body.pacijent_id}, (err, resp)=>{
            if(err) console.log(err);
            else { res.json(resp); }
        })
    }

    deleteTermin = (req: express.Request, res: express.Response)=>{
        UserModel.updateOne({'_id': req.body.termin.lekar_id}, {$pull: {'zauzetost': {'start': req.body.termin.start}}}, err=>{
            if(err) console.log(err);
            else{
                Termin.deleteOne({'_id': req.body.termin._id}, err=>{
                    if(err) console.log(err);
                    else res.json({'message': 'ok'});
                })
            }
        })
    }

    getTerminForLekar = (req: express.Request, res: express.Response)=>{
        Termin.find({'lekar_id': req.body.lekar_id}, (err, resp)=>{
            if(err) console.log(err);
            else { res.json(resp); }
        })
    }

    getIzvestajiForPacijent = (req: express.Request, res: express.Response)=>{
        Izvestaj.find({'pacijent_id': req.body.pacijent_id}, (err, resp)=>{
            if(err) console.log(err);
            else res.json(resp);
        })
    }

    dodajIzvestaj = (req: express.Request, res: express.Response)=>{
        let i = new Izvestaj(req.body);
        i.save(err=>{
            if(err) console.log(err);
            else res.json({'message':'ok'});
        })
    }

    TerminSetFlagIzvestaj = (req: express.Request, res: express.Response)=>{
        Termin.updateOne({'_id': req.body.id_termin}, {$set: {'izvestaj': true}}, err=>{
            if(err) console.log(err);
            res.json({'message': 'ok'});
        })
    }

    removeLekar = (req: express.Request, res: express.Response)=>{
        Termin.deleteMany({'lekar_id': req.body._id}, err=>{
            if(err) console.log(err);
            else{
                UserModel.deleteOne({'_id': req.body._id}, err=>{
                    if(err) console.log(err);
                    else res.json({'message': 'ok'});
                })
            }
        })
    }

    removePacijent = (req: express.Request, res: express.Response)=>{
        Termin.deleteMany({'pacijent_id': req.body._id}, err=>{
            if(err) console.log(err);
            else{
                UserModel.deleteOne({'_id': req.body._id}, err=>{
                    if(err) console.log(err);
                    else res.json({'message': 'ok'});
                })
            }
        })
    }

    releaseName = (req: express.Request, res: express.Response)=>{
        UnavailableNames.deleteOne({'forbidden': req.body.username}, err=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'});
        })
    }

    deleteTerminiForPacijent = (req: express.Request, res: express.Response)=>{
        Termin.deleteMany({'pacijent_id': req.body._id}, err=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'});
        })
    }

    deleteTerminiForLekar = (req: express.Request, res: express.Response)=>{
        Termin.deleteMany({'lekar_id': req.body._id}, err=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'});
        })
    }

    deleteIzvestajiForPacijent = (req: express.Request, res: express.Response)=>{
        Termin.deleteMany({'pacijent_id': req.body._id}, err=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'});
        })
    }
    
}