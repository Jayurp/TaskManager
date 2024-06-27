const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const newSchema = require('./schema');
const cors = require('cors');

app.use(cors());

mongoose.connect('mongodb+srv://Jayurp:jayur1410@cluster0.x2ycigw.mongodb.net/?retryWrites=true&w=majority')
mongoose. connection.on('error' ,err=>{
    console.log('connection failed');
});

mongoose. connection.on('connected' , connected=>{
	console. log('connected with database....');
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.listen(4000, () => {
	console.log('Server listening on port 4000');
});

app.post('/tasks', (req,res)=>{
	const nsc = new newSchema(req.body);

    nsc.save().then(result=>{
		console.log("success");
        res.status(200);
        res.json({
            message: 'success'
        })
	}).catch(err=>{
		console.log(err);
	})
});

app.get('/tasks', (req,res)=>{
	newSchema.find().then(result=>{
		res.status(200).send(result)
	}).catch
	(err=>{
		console.log(err);
		res.status(500).json({
			error:err,
		})
	})
});

app.get('/tasks/:id', (req,res)=>{
    const id = req.params.id;

	newSchema.find({_id:id},{}).then(result=>{
		res.status(200).send(result)
	}).catch
	(err=>{
		console.log(err);
		res.status(500).json({
			error:err,
		})
	})
});

app.put('/tasks/:id', (req,res)=>{
    const id = req.params.id;
    const updatedData = req.body;
	
    newSchema.findOneAndUpdate({_id:id},updatedData).then
	(
        result => {
		res.status(200).json({
            message: "updated successfully",
		})}
    )
});

app.delete('/tasks/:id', (req,res)=>{
    const id = req.params.id;
	
    newSchema.deleteMany({_id:id}).then
	(
        result => {
		console.log(result);
		res.status(200).json({
            message: "deleted successfully",
		})
	})
});