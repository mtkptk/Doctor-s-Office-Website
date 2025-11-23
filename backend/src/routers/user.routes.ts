import express from 'express'
import { UserController } from '../controllers/user.controller';
//import { ImageUpload } from '../controllers/imageUpload';

const userRouter = express.Router();


userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
)

userRouter.route('/register').post(
   (req, res)=> new UserController().register(req, res)
)

userRouter.route('/uploadImage').post(
    (req, res)=> new UserController().uploadImage(req, res)
 )

 userRouter.route('/removeImage').post(
    (req, res)=> new UserController().removeImage(req, res)
 )

userRouter.route('/addUser').post(
    (req, res)=> new UserController().addUser(req, res)
)

userRouter.route('/getAllRequests').get(
    (req, res)=> new UserController().getAllRequests(req, res)
)

userRouter.route('/approve_registration_request').post(
    (req, res)=> new UserController().approve_registration_request(req, res)
)

userRouter.route('/deny_registration_request').post(
    (req, res)=> new UserController().deny_registration_request(req, res)
)

userRouter.route('/getAll').get(
    (req, res)=> new UserController().getAll(req, res)
)

userRouter.route('/updateOn').post(
    (req, res)=> new UserController().updateOn(req, res)
)

userRouter.route('/getUserByID').post(
    (req, res)=> new UserController().getUserByID(req, res)
)

userRouter.route('/changePassword').post(
    (req, res)=> new UserController().changePasword(req, res)
)

userRouter.route('/getAllSpec').get(
    (req, res)=> new UserController().getAllSpec(req, res)
)

userRouter.route('/addSpec').post(
    (req, res)=> new UserController().addSpec(req, res)
)

userRouter.route('/addPregled').post(
    (req, res)=> new UserController().addPregled(req, res)
)

userRouter.route('/getAllPregled').get(
    (req, res)=> new UserController().getAllPregled(req, res)
)

userRouter.route('/editPregled').post(
    (req, res)=> new UserController().editPregled(req, res)
)

userRouter.route('/deletePregledRequest').post(
    (req, res)=> new UserController().deletePregledRequest(req, res)
)

userRouter.route('/getAllPreglediByIDs').post(
    (req, res)=> new UserController().getAllPreglediByIDs(req, res)
)

userRouter.route('/getPregledByID').post(
    (req, res)=> new UserController().getPregledByID(req, res)
)

userRouter.route('/addVrstaPregledaToLekar').post(
    (req, res)=> new UserController().addVrstaPregledaToLekar(req, res)
)

userRouter.route('/addZauzetostLekaru').post(
    (req, res)=> new UserController().addZauzetostLekaru(req, res)
)
userRouter.route('/addTermin').post(
    (req, res)=> new UserController().addTermin(req, res)
)

userRouter.route('/getTerminiForPacijent').post(
    (req, res)=> new UserController().getTerminiForPacijent(req, res)
)

userRouter.route('/deleteTermin').post(
    (req, res)=> new UserController().deleteTermin(req, res)
)

userRouter.route('/getTerminForLekar').post(
    (req, res)=> new UserController().getTerminForLekar(req, res)
)

userRouter.route('/getIzvestajiForPacijent').post(
    (req, res)=> new UserController().getIzvestajiForPacijent(req, res)
)

userRouter.route('/dodajIzvestaj').post(
    (req, res)=> new UserController().dodajIzvestaj(req, res)
)

userRouter.route('/TerminSetFlagIzvestaj').post(
    (req, res)=> new UserController().TerminSetFlagIzvestaj(req, res)
)

userRouter.route('/removeLekar').post(
    (req, res)=> new UserController().removeLekar(req, res)
)

userRouter.route('/removePacijent').post(
    (req, res)=> new UserController().removePacijent(req, res)
)

userRouter.route('/releaseName').post(
    (req, res)=> new UserController().releaseName(req, res)
)

userRouter.route('/deleteTerminiForPacijent').post(
    (req, res)=> new UserController().deleteTerminiForPacijent(req, res)
)

userRouter.route('/deleteTerminiForLekar').post(
    (req, res)=> new UserController().deleteTerminiForLekar(req, res)
)
userRouter.route('/deleteIzvestajiForPacijent').post(
    (req, res)=> new UserController().deleteIzvestajiForPacijent(req, res)
)

/*userRouter.route('/getZauzetostiByIDLekara').post(
    (req, res)=> new UserController().getZauzetostiByIDLekara(req, res)
)
userRouter.route('/addZauzetost').post(
    (req, res)=> new UserController().addZauzetost(req, res)
)*/












export default userRouter;