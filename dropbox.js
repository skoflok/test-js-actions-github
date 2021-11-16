import fetch from 'node-fetch';
import {fileFromSync} from 'fetch-blob/from.js';

const accessToken = process.env.DROPBOX_ACCESS_TOKEN;
const apiV2Url = "https://api.dropboxapi.com/2";
const apiUploadUrl = 'https://content.dropboxapi.com/2/files/upload';
const defaultOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken,
        'Accept': 'application/json'
    }
};

// async function get

export async function listFolder(folder = "", options = defaultOptions) {
    let url = apiV2Url + '/files/list_folder';

    let payload = {
        path: folder,
        recursive: false,
        include_media_info: false,
        include_deleted: false,
        include_has_explicit_shared_members: false,
        include_mounted_folders: true,
        include_non_downloadable_files: true
    };

    let body = JSON.stringify(payload);

    options = { ...options, body: body };

    return await makeRequest(url, options);
}

export async function deleteObject(path, options = defaultOptions) {
    let url = apiV2Url + '/files/delete_v2';

    let body = JSON.stringify({ path: path });

    options = { ...options, body: body };

    console.log(options);
    return await makeRequest(url, options, false);
}

export async function moveObject(from, to, options = defaultOptions) {
    let url = apiV2Url + '/files/move_v2';
    let payload = {
        from_path: from,
        to_path: to,
        allow_shared_folder: false,
        autorename: false,
        allow_ownership_transfer: false
    }

    let body = JSON.stringify(payload);

    options = { ...options, body: body };

    return await makeRequest(url, options, false);

}

export async function uploadFile(pathToFile, pathToUpload) {
    let dropboxAPIArg = JSON.stringify({
        "path": pathToUpload, 
        "mode": "overwrite", 
        "autorename": true, 
        "mute": false, 
        "strict_conflict": false
    });

    const url = apiUploadUrl;

    const file = fileFromSync(pathToFile, 'text/plain');


    let options = {
        method: 'POST',
        headers: {
            'Dropbox-API-Arg' : dropboxAPIArg,
            'Content-Type' : 'application/octet-stream',
            'Authorization': 'Bearer ' + accessToken,
        },
        'body': file,
    }

    return await makeRequest(url, options);
}

async function makeRequest(url, options, httpThrowing = true) {
    try {
        let response = await fetch(url, options );
        if(httpThrowing) {
            if(response.status >= 400) {
                throw new Error("status code: " + response.status + " => " + response.statusText);
            }
        }
        return response;
    } catch (error) {
        throw new Error(error);
    }
}
