import fetch from 'node-fetch';

fetch('https://github.com/')
    .then(res => res.text())
    .then(html => html);

console.log(process.env.DROPBOX_ACCESS_TOKEN);
