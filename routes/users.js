const router = require('express').Router();
let User = require('../models/users.model');


//get all useres details
router.route('/').get((req, res)=>{
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Eror' + err))
});


// add new user
router.route('/add').post((req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const name = req.body.name;

    const newUser = new User({username, password, email, name})
    newUser.save()
    .then(() => res.json('User added'), console.log('Good! User added'))
    .catch(err => res.status(400).json('Eror' + err))
});



// fnd a user by id
router.route('/:id').get((req, res, next)=>{
    User.findById(req.params.id, (error, data) =>{
        if (error) {
            return next(error)
        }
        else{
            res.json(data)
            console.log(data);
        }
    })
 
})

// find a user by username
router.route('/findUser/:username').get((req, res, next)=>{
User.find({username: req.params.username})
  .then((data)=> res.json(data),console.log('Log in good!'))
  .catch(err => res.status(400).json('eror ' + err))
})


//find a user by email
router.route('/findEmail/:email').get((req, res, next)=>{
    User.find({email: req.params.email})
    .then((data)=> res.json(data),console.log('Email found'))
    .catch(err => res.status(400).json('eror ' + err))
})


// delete a user
router.route('/:id').delete((req, res)=>{
    User.findByIdAndDelete(req.params.id)
    .then(()=> res.json('user deleted!!!'))
    .catch(err => res.status(400).json('eror ' + err))
})


// update u user details
router.route('/update/:id').post((req, res)=>{
    User.findById(req.params.id)

    .then( user => {
        user.username = req.body.username
        user.password = req.body.password
        user.email = req.body.email

        user.save()
        .then(()=> res.json('user updates!!!'))
        .catch(err => res.status(400).json('eror ' + err))
    })

    .catch(err => res.status(400).json('eror ' + err))
})


// add a movie to a user
router.route('/addmovie/:id').post((req, res)=>{
    console.log(req.body.m);

    User.findById(req.params.id)
    .then( user => {
        user.movies = [...user.movies, req.body.m]
        user.save()
        .then((user)=> res.json(user))
        .catch(err => res.status(400).json('eror ' + err))
    })

    .catch(err => res.status(400).json('eror ' + err))
})

// remove a movie from a user
router.route('/removemovie/:id').post((req, res)=>{
    console.log(req.body.m);
    console.log(req.params.id);

    User.findById(req.params.id)
    .then( user => {
        user.movies = user.movies.filter(e => e.imdbID != req.body.m.imdbID )
        user.save()
        .then((user)=> res.json(user))
        .catch(err => res.status(400).json('eror ' + err))
    })

    .catch(err => res.status(400).json('eror ' + err))
})

module.exports = router;
