const {urlGoogle, getGoogleAccountFromCode} = require('../service/google');
const router = require('express').Router();
const tryCatchWrapper = require('../service/tryCatchWrapper');


//@route /api/google/loginurl
router.get('/loginurl', (req,res)=>{
    res.send(urlGoogle())
});

//@route /api/google/logincallback
router.get('/logincallback',tryCatchWrapper(async (req,res)=>{
    
    const {code} = req.query;
    const people = await getGoogleAccountFromCode(code);
    
    
    res.send(JSON.stringify(people));
}));

module.exports = router;