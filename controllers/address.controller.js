const models = require('../models')

function save(req, res){
    const address= {
        address: req.body.address,
        userId: req.userData.userId
    }
    models.Address.create(address).then( result =>{
            res.status(200).json({
                message: 'address added sucess',
                post: result
            })
    }).catch( error=>{
        res.status(500).json({
            message: 'something went wrong',
            error: error
        })
    })
}

module.exports = {
    save:save
}