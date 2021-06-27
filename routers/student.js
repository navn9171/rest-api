const express = require("express");
const Student = require("../models/student");
const router = new express.Router();


//adding details using promises
// router.post('/students', (req, res)=>{
//     // console.log(req.body);
//     const user = new Student(req.body);
//     user.save().then(()=>{
//         res.send(user);
//     }).catch((e)=>{
//         res.send(e);
//     })
// })

//adding details using async await
router.post('/students', async(req, res)=>{
    try{
        const user = new Student(req.body);
        const createUser = await user.save();
        res.send(createUser);
    }catch(e){
        res.send(e);
    }
})

//reading whole the data stored in db
router.get('/students', async(req, res)=>{
    try{
        const studentsData = await Student.find();
        res.send(studentsData);
    }catch(e){
        res.send(e);
    }
})

//reading the data of an individual
router.get('/students/:id', async(req, res)=>{
    try{
        const _id = req.params.id; 
        const studentData = await Student.findById({_id: _id})
        if(!studentData){
            return res.status(404).send();
        }else{
            res.send(studentData);
        }
    }catch(e){
        res.status(500).send(e);
    }
})

//update the particular individual by ID
router.patch('/students/:id', async(req, res)=>{
    try{
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate({_id: _id}, req.body,{new : true});
        res.send(updateStudent);
    }catch(e){
        res.status(400).send(e);
    }
})

//delete the particular individual by ID
router.delete('/students/:id', async(req, res)=>{
    try{
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send();
        }
        res.send(deleteStudent);
    }catch(e){
        res.status(500).send(e);
    }
})


module.exports = router;