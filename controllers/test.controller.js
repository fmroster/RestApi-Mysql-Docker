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
//     one to many = 1:m user has many users
//     const user = await models.User.findByPk(1,{
//         include: [models.Post]
//     })
    //many to many
    const post = await models.Post.findByPk(1, {
        include:[models.Category]
    });

    const category = await models.Category.findByPk(1, {
        include:[models.Post]
    });


    res.status(200).json({
        data: post
    })
}

module.exports = {
    test:test
}