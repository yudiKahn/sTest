const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const tryCatchWrapper = require('../service/tryCatchWrapper');
const uuid = require('uuid');

const filePath = path.join(__dirname.split('\\').slice(0,-1).join('\\'), 'data', 'itemsCategories.json');

// @route /api/categories/
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
        let alreadyExist = json.find(v=> v.toLowerCase() === req.body.category.toLowerCase());
        if(alreadyExist !== undefined) throw new Error("Category already exist.")
        json.push(req.body.category);
        txt = JSON.stringify(json);
        fs.writeFileSync(filePath, txt, {encoding:'utf8'});
        res.json(json);
    }))
    .delete(tryCatchWrapper((req,res)=>{
        let {index} = req.body;
        let txt = fs.readFileSync(filePath, {encoding:'utf8'});
        let json = Array.from(JSON.parse(txt));
        json = json.filter((v,i)=>i!==index);   
        txt = JSON.stringify(json);
        fs.writeFileSync(filePath, txt, {encoding:'utf8'});
        res.json(json);
    }));
    

module.exports = router;