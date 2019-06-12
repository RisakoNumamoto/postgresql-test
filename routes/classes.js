const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Classes = require('../models/Classes');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get class list
router.get('/', (req,res) => Classes.findAll()
    .then(classes => {
        res.render('classes', {
            classes
        });
    })
    .catch(err => console.log(err)));

// Display add class form 
router.get('/add', (req, res) => res.render('add'));


// Add a class
router.post('/add', (req, res) => {

    let { className, instructor, time, info } = req.body;
    let errors = [];

    // Validate Fields
    if(!className) {
        errors.push({ text: 'Please add a class' });
    }
    if(!instructor) {
        errors.push({ text: 'Please add some instructor' });
    }
    if(!time) {
        errors.push({ text: 'Please add time' });
    }
    if(!info) {
        errors.push({ text: 'Please add description' });
    }
    // Check for errors
    if(errors.length > 0) {
        res.render('add', {
        errors,
        className, 
        instructor, 
        time, 
        info
        });
    } else {

        //instructor = instructor.toLowerCase().replace(/, /g, ',');
    
        Classes.create({
            className,
            instructor,
            time,
            info
        })
        .then(classes => res.redirect('/classes'))
        .catch(err => console.log(err));
    }

});


// Search for classes
router.get('/search', (req, res) => {
    let {term} = req.query;

    term = term.toLowerCase();

    Classes.findAll({where: {className: {[Op.like]: '%' + term + '%'}}})
    .then(classes => res.render('classes', {classes}))
    .catch(err => console.log(err));
});
module.exports = router;