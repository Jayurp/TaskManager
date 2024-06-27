import React, {useState} from "react";
import Card from "./taskCard";
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./home.css";

function Home() {

    const [tasks, setTasks] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [search, setSearch] = useState();

    const handleNewTask = (e) => {
        
        const now = new Date();
        const newTask = {
            title: title,
            description: description,
            status: "pending",
            createdAt: now,
            updatedAt: now
        }

        fetch('http://localhost:4000/tasks', {
            method: 'POST',
            body: JSON.stringify(newTask),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },})
            .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
            })
            .then(data => {
                setTasks(data);
            })
            .catch(error => {
            console.error('Fetch error:', error);
            });
    }

    const handleFetch = () =>{
        fetch('http://localhost:4000/tasks', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },})
            .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
            })
            .then(data => {
                setTasks(data);
            })
            .catch(error => {
            console.error('Fetch error:', error);
            });
    }

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleSearchInput = (e) => {
        setSearch(e.target.value);
    }

    const handleSearch = (e) => {
        if(!search)
        {
            alert("Enter valid id");
        }
        else
        {
            fetch('http://localhost:4000/tasks/'+search, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },})
                .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
                })
                .then(data => {
                    setTasks(data);
                })
                .catch(error => {
                console.error('Fetch error:', error);
                });
        }
    }

    return(
        <div className="Home">
            <div className="topButtons">
                <button className="fetchButton" onClick={handleFetch}>Fetch Tasks</button>
                <button className="addTaskButton" onClick={handleShow}>Add Task</button>
            </div>

            <div className="search">
                <input type="text" className="searchInput" placeholder="Enter task id to search" onChange={handleSearchInput} />
                <button className="searchButton" onClick={handleSearch}>Search</button>
            </div>
            
            {Array.isArray(tasks) &&
                tasks.map((tasks, index) => (
                    <div className="inner" style={{display:"flex", justifyContent:"center", textAlign:"center", padding:"1%"}}>
                        <Card tasks={tasks}></Card>
                    </div>
                ))
            }

        <div className="newTaskModal">
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" onChange={handleTitle}/>
            </Form.Group>
            <br/>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Description" onChange={handleDescription}/>
            </Form.Group>
            <br/>
            <Button variant="primary" type="submit" onClick={handleNewTask}>
              Submit
            </Button>
            </Form>
            </Modal.Body>
        </Modal>
        </div>
        </div>
    );
}

export default Home;