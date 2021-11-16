
import { uploadFile, moveObject, deleteObject } from './dropbox.js';

const file = process.env.UPLOAD_FILE || "test.txt";

const folder = process.env.DROPBOX_REMOTE_FOLDER || '/kps';

const cPrefix = "current-";
const pPrefix = "previous-";

const fileFrom = folder + '/' + cPrefix + file;
const fileTo = folder + '/' + pPrefix + file;

console.log(fileFrom, fileTo);


    let del = await deleteObject(fileTo);
    del.json()
    .then(res => console.log(res));

try {
    let move = await moveObject(fileFrom, fileTo);

    move.json().then(async res => {
        console.dir(res);
        let upload = await uploadFile(file, fileFrom);
    
        upload.json().then((res) => {
            console.dir(res);
        });
    }).catch(err => {
        console.error(err);
    });
} catch (error) {
    console.error(error);
    exit(1);
}


