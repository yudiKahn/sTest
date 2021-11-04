const fs = require('fs');
const path = require('path');

function useApi(app){
    const dir = path.join(__dirname.split('\\').slice(0, -1).join('\\'),'api');
    let filesWithExt = fs.readdirSync(dir);
    filesWithExt.forEach(name=>{
        app.use(`/api/${name.split(path.extname(name))[0]}`, require(`../api/${name}`));
    });
}

module.exports = useApi;