const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;
const client = require('./db')
  
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Establishing connection with DB
client.connect()
.then( () => console.log('DB Connected !'))
.catch( () => console.log("DB connection failed"))

// Getting all the students from DB
app.get('/get-students',async (req, res) => {
    try{
        const students  = await client.query('SELECT * FROM students;')
        res.json(students.rows);
    }
    catch(err){
        res.json({Error : err});
    }
})

// Inserting a new student into the DB
app.post('/new-student',async(req,res) => {
   try{
    const {id, stud_name, stud_email, stud_address} = req.body;
    const students = await client.query('INSERT INTO students (id, stud_name, stud_email, stud_address) VALUES ($1, $2, $3, $4) RETURNING *',
    [id, stud_name, stud_email, stud_address])

    res.json(students.rows);
   }
   catch(err){
    console.log("err ",err);
   }
})

// Updating students in the DB
app.put('/edit-student', async(req, res) => { 
    // const { id } = req.params;
    const { id, stud_name } = req.body;
    try {
        const students = 
        await client.query('UPDATE students SET stud_name = $2 WHERE id = $1 RETURNING *',[id, stud_name]);

        res.json(students.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Removing the student from DB
app.delete('/delete-student', async(req, res) => { 
    const {id} = req.body;
    try{
        const students = await client.query('DELETE FROM students WHERE id = $1',[id]);
        res.json({message : "Student deleted !"})
    }
    catch(err){
        res.json({Err : err});
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

