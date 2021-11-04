
/**
 * @param {(req:import("express").Request,res:import("express").Response)=>{}} func
 */
const tryCatchWrapper = (func) => async (req,res) => {
    try {
        await func(req,res);
    } catch (err) {
        console.log(err.message)
        res.status(400).json({err:err.message});
    }
}

module.exports = tryCatchWrapper;
