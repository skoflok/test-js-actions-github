
import { uploadFile, moveObject } from './dropbox.js';

const file = process.env.UPLOAD_FILE || "test.txt";

const folder = process.env.DROPBOX_REMOTE_FOLDER || '/kps';

const cPrefix = "current-";
const pPrefix = "previous-";

const fileFrom = folder + '/' + cPrefix + file;
const fileTo = folder + '/' + pPrefix + file;

let move = await moveObject(fileFrom, fileTo);

console.log(fileFrom, fileTo);
move.json().then(async res => { 
    console.dir(res);
    let upload = await uploadFile(file, fileFrom);

    upload.json().then((res) => {
        console.dir(res);
    });
}).catch(err => {
    console.error(err);
});



