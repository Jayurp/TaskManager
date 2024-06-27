import React, {useState} from "react";
import "./taskCard.css";
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Card = ({tasks}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [status, setStatus] = useState('pending');

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleUpdate = (e) => {
        const now = new Date();

        const obj = {
            title: title,
            description: description,
            status: status,
            createdAt: tasks.createdAt,
            updatedAt: now
        }

        fetch('http://localhost:4000/tasks/'+tasks._id, {
            method: 'PUT',
            body: JSON.stringify(obj),
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
                console.log(data);
            })
            .catch(error => {
            console.error('Fetch error:', error);
            });
    }

    const handleChange = (e) => {
        setStatus(e.target.value);
    }

    const handleDelete = (e) => {
        
        fetch('http://localhost:4000/tasks/'+tasks._id, {
            method: 'DELETE',
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
                console.log(data);
            })
            .catch(error => {
            console.error('Fetch error:', error);
            });
    }

    return(
        <div className="cardParent">
            <h1 className="title">{tasks.title}</h1>
            <h4 className="description">Description: {tasks.description}</h4>
            <h4 className="status">Status: {tasks.status}</h4>
            <h6 className="created">Created: {tasks.createdAt}</h6>
            <h6 className="updated">Updated: {tasks.updatedAt}</h6>
            <h7 className="id">ID: {tasks._id}</h7>
            <br/>
            <div className="buttons">
                <button className="editButton" onClick={handleShow}>Edit</button>
                <button className="deleteButton" onClick={handleShow2}>Delete</button>
            </div>

        <div className="updaateTaskModal">
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
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
            <Form.Group controlId="formBasicPassword">
            <label for="status">Status </label>
            <br/>
                <select id="status" name="status" onChange={handleChange}>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
            </Form.Group>
            <br/>
            <Button variant="primary" type="submit" onClick={handleUpdate}>
              Submit
            </Button>
            </Form>
            </Modal.Body>
        </Modal>
        </div>

        <div className="deleteTaskModal">
        <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Delete task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            Are you sure you want to delete this task? <br/>

            <br/>
            <Button className="deleteYes" variant="primary" type="submit" onClick={handleDelete}>
              Yes
            </Button>
            <Button className="deleteNo" variant="primary"  onClick={handleClose2}>
              No
            </Button>
            </Form>
            </Modal.Body>
        </Modal>
        </div>
        </div>
    );
}

export default Card;