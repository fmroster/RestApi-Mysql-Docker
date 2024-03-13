const models = require('../models')
async function test (req,res){
    // 1:1 = user can have 1 address, and only address can only have one user
    // const user = await  models.User.findByPk(1,{
    //         include: [models.Address]
    // })
    // const address = await models.Address.findByPk(5,{
    //     include: [models.User]
    // })
// ******
    //one to many = 1:m user has many users
    const address = await models.User.findByPk(5,{
        include: [models.User]
    })
    //many to many


    res.status(200).json({
        data: address
    })
}

module.exports = {
    test:test
}