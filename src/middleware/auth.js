const auth = async (req,res,next) => {
    try {
        console.log('This is dummy');
        next()
    } catch (e) {
        res.status(401).send({ error: "Please authorize!"})
    }
}

module.exports = auth;