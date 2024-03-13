const Validator =  require('fastest-validator')
const models = require("../models");

// get all posts
function index(req, res) {
  models.Post.findAll()
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
}

// create post middleware
function save(req, res) {
  const post = {
      title: req.body.title,
      content: req.body.content,
      imageUrl: req.body.image_url,
      categoryId: req.body.category_id,
      userId: req.userData.userId
  };

  console.log(req.userData.userId)

  const schema = {
      title: {type: 'string', optional: false, max: "100"},
      content: {type: 'string', optional: false, max: "500"},
      categoryId: {type: 'number', optional: false},
  }
  const v = new Validator()
  const validationResponse = v.validate(post, schema)

    if (validationResponse !== true){
        return res.status(400).json({
            message: "validation failed",
            errors: validationResponse
        })
    }
  models.Category.findByPk(req.body.category_id).then(result =>{
      if(result !==null){
          models.Post.create(post)
              .then((result) => {
                  if(result){
                      res.status(201).json({
                          message: "Post created successfully",
                          post: result,
                      });
                  }else{
                      res.status(404).json({
                          message: "Not posts",
                      });
                  }

              })
              .catch((error) => {
                  res.status(500).json({
                      message: "something went wrong",
                      error: error,
                  });
              })
      }else{
          res.status(400).json({
              message: "Invalid category",
          });
      }
  }).catch(error =>{
      res.status(500).json({
          message: "Something went wrong",
      });
  })
}
//show single post
function show(req, res) {
  const id = req.params.id;

  // get a post by primary key: method by sequelize
  models.Post.findByPk(id)
    .then((results) => {
        if(results){
            res.status(200).json(results);
        }else{
            res.status(404).json({
                message: "Post not found",
            });
        }
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went",
      });
    });
}

//update pots
function modify(req, res) {
    const id = req.params.id;
    const userId = 1
    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
    };
    // get a post by primary key: method by sequelize
    models.Post.update(updatedPost, {where: {id:id , userId:userId}})
        .then((results) => {
            res.status(200).json({
                message:"post updated",
                post: updatedPost
            })
        })
        .catch((error) => {
            res.status(500).json({
                message: "something went",
            });
        });
}

function remove(req, res) {
    const id = req.params.id;
    const userId = 1
    // get a post by primary key: method by sequelize
    models.Post.destroy({where: {id:id , userId:userId}})
        .then((results) => {
            res.status(200).json({
                message:"post deleted"
            })
        })
        .catch((error) => {
            res.status(500).json({
                message: "something went",
            });
        });
}

// export the module as an object
module.exports = {
    index: index,
    save: save,
    show: show,
    modify:modify,
    remove: remove,
}
