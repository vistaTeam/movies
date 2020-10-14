const router = require('express').Router();
let User = require('../models/users.model');



router.route('/').get((req, res)=>{
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Eror' + err))
});


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


    router.route('/findUser/:username').get((req, res, next)=>{
    User.find({username: req.params.username})
    .then((data)=> res.json(data),console.log('Log in good!'))
    .catch(err => res.status(400).json('eror ' + err))
})


router.route('/findEmail/:email').get((req, res, next)=>{
    User.find({email: req.params.email})
    .then((data)=> res.json(data),console.log('Email found'))
    .catch(err => res.status(400).json('eror ' + err))
})


router.route('/:id').delete((req, res)=>{
    User.findByIdAndDelete(req.params.id)
    .then(()=> res.json('user deleted!!!'))
    .catch(err => res.status(400).json('eror ' + err))
})

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




module.exports = router;
