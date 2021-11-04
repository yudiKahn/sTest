const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const tryCatchWrapper = require('../service/tryCatchWrapper');
const uuid = require('uuid');

const filePath = path.join(__dirname, '..', 'data', 'todos.json');

// @route /api/todos/
router
    .route('/')
    .get(tryCatchWrapper((req,res)=>{
        let txt = fs.readFileSync(filePath, {encoding:'utf8'});
        let json = JSON.parse(txt);
        res.json(json);
    }))
    .post(tryCatchWrapper((req,res)=>{
        let txt = fs.readFileSync(filePath, {encoding:'utf8'});
        let json = Array.from(JSON.parse(txt));
        let alreadyExist = json.find(v=> v.txt.toLowerCase() === req.body.txt.toLowerCase());
        if(alreadyExist !== undefined) throw new Error("Todo already exist.")
        json.push({
            txt:req.body.txt,
            isDone:false,
            id: uuid.v4(),
        });
        txt = JSON.stringify(json);
        fs.writeFileSync(filePath, txt, {encoding:'utf8'});
        res.json(json);
    }))
    

//@route /api/todos/:id
router
    .route('/:id')
    .put(tryCatchWrapper((req,res)=>{
        const {id} = req.params;
        const {val}  = req.body;
        let txt = fs.readFileSync(filePath, {encoding:'utf8'});
        let json = Array.from(JSON.parse(txt));
        json[json.findIndex(v=>v.id===id)] = val;
        txt = JSON.stringify(json);
        fs.writeFileSync(filePath, txt, {encoding:'utf8'});
        res.json(json);
    }))
    .delete(tryCatchWrapper((req,res)=>{
        const {id} = req.params;
        let txt = fs.readFileSync(filePath, {encoding:'utf8'});
        let json = Array.from(JSON.parse(txt));
        json = json.filter(v=>v.id !== id);
        txt = JSON.stringify(json);
        fs.writeFileSync(filePath, txt, {encoding:'utf8'});
        res.json(json);
    }));
    

module.exports = router;