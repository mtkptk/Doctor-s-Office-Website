import multer from 'multer';

export class ImageUpload {
  static uploadImage = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, '../backend/src/images');        //C:\Users\Matija\Documents\Faks\Osmi_semestar\PIA_2023\Projekat\backend\src\images
      },
      filename: (req, file, cb) => {
        // Extract the username from the request body or any other desired field
        /*const username = req.body.username;
        const extension = file.originalname.split('.').pop();
        const filename = username + '.' + extension;*/
        cb(null, file.originalname);
      },
    }),
  });
}



/*
const multer = require('multer');
const path = require('path');

export class ImageUpload{


static uploadImage = () => {
// Create a storage instance
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'C:/User/Desktop/Images');
      },
      filename: (req, file, cb) => {
        // Extract the username from the request body or any other desired field
        const username = req.body.username;
        const extension = file.originalname.split('.').pop(); //hmmm
        const filename = username + '.' + extension;
        cb(null, filename);
      }
  });
  
  // Create the Multer middleware using the storage instance
  return multer({ storage: storage });  
}

}
*/