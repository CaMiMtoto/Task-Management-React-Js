import {Button, Dropdown, Form, Modal, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import {FaEdit} from "react-icons/fa";
import {FaChevronDown, FaTrash, FaUser} from "react-icons/fa6";
import http from "../configs/httpConfig.js";
import AppPagination from "../components/Pagination.jsx";

const PRIORITIES = [
    "Low", "Medium", "High"
];
const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        _id: '',
        title: '',
        description: '',
        priority: '',
        assignee: ''
    });
    const [response, setResponse] = useState({});
    const [assignees, setAssignees] = useState([]);

    const fetchAssignees = () => {
        http.get('/users')
            .then((response) => {
                console.log(response);
                setAssignees(response.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const fetchTasks = (url = '/tasks') => {
        http.get(url)
            .then((response) => {
                console.log(response);
                setTasks(response.data.results);
                setResponse(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchAssignees();
        fetchTasks();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const toggleTask = (id) => {
        setLoading(true)
        http.patch(`/tasks/${id}/toggle-completed`)
            .then((response) => {
                // update the state
                setTasks(tasks.map((task) => {
                    if (task._id === id) {
                        return response.data;
                    }
                    return task;
                }));
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }


    function updateTask() {
        http.put(`/tasks/${formData._id}`, {
            title: formData.title,
            description: formData.description,
            priority: formData.priority
        })
            .then((response) => {
                console.log(response);
                // update the state
                setTasks(tasks.map((task) => {
                    if (task._id === formData._id) {
                        return response.data;
                    }
                    return task;
                }));
                resetFormData();
            })
            .catch((error) => {
                console.log(error);

            })
            .finally(() => {
                setLoading(false);
            });
    }

    function resetFormData() {
        // clear the form
        setFormData({
            _id: '',
            title: '',
            description: '',
            priority: '',
            assignee: ''
        });
        // close the modal
        setShowModal(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // add the new task to the tasks array
        if (editing) {
            // find the task with the id
            updateTask();
        } else {
            http.post('/tasks', {
                title: formData.title,
                description: formData.description,
                completed: false,
                priority: formData.priority
            }).then((response) => {
                console.log(response);
                // update the state
                setTasks([...tasks, response.data]);
                resetFormData();
            })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }

    }

    const handleEdit = (id) => {
        // find the task with the id
        let task = tasks.find((task) => task._id === id);
        // set the form data
        setFormData({
            _id: task._id,
            title: task.title,
            description: task.description,
            priority: task.priority
        });
        // set editing to true
        setEditing(true);
        // show the modal
        setShowModal(true);
    }
    const handleDelete = (id) => {
        // filter the tasks array
        http.delete(`/tasks/${id}`)
            .then((response) => {
                console.log(response);
                // update the state
                setTasks(tasks.filter((task) => task._id !== id));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getTaskColor = (priority) => {
        switch (priority) {
            case 'Low':
                return 'success';
            case 'Medium':
                return 'warning';
            case 'High':
                return 'danger';
            default:
                return 'secondary';
        }
    }

    const handleAssign = (e) => {
        e.preventDefault();
        setLoading(true);
        http.patch(`/tasks/${formData._id}/assign`, {
            assignedTo: formData.assignee
        })
            .then(() => {
                resetFormData();
                setShowAssignModal(false);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="mb-0">
                    Tasks
                </h1>
                <Button variant="primary" type="button" onClick={() => setShowModal(true)}>
                    Add Task
                </Button>
            </div>

            {
                tasks.length > 0 &&
                <div>
                    <div className="list-group list-group-flush">
                        {tasks.map((task) => (
                            <div
                                className={`list-group-item border-0 mb-2  border-start border-4 ps-2 border-${getTaskColor(task.priority)}`}
                                key={task._id}>


                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value={task._id}
                                           checked={task.completed}
                                           onChange={() => toggleTask(task._id)}
                                           id={`flexCheckDefault${task._id}`}/>
                                    <label
                                        htmlFor={`flexCheckDefault${task._id}`}
                                        className={`form-check-label fw-bold ${task.completed ? 'text-decoration-line-through' : ''}`}>
                                        {task.title}
                                        {loading && <Spinner variant="primary" className="ms-2" size="sm"/>}
                                    </label>
                                </div>

                                <div className="ms-4">
                                    <p className={`mb-1 small border-4 `}>
                                        {task.description}
                                    </p>

                                    <div className="d-flex align-items-center gap-2 justify-content-between">
                                        <div>
                                    <span
                                        className={`badge rounded-pill small ${task.completed ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                                {task.completed ? 'Completed' : 'Not Completed'}</span>
                                        </div>
                                        <div className="d-flex justify-content-end  gap-2">


                                            <Dropdown>
                                                <Dropdown.Toggle variant="light" id="dropdown-basic">
                                                    More
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/action-1"
                                                                   onClick={() => {
                                                                       setShowAssignModal(true);
                                                                       setFormData({
                                                                           ...formData,
                                                                           _id: task._id
                                                                       });
                                                                   }}>
                                                        <FaUser className="me-2"/>
                                                        Assign
                                                    </Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2"
                                                                   onClick={() => handleEdit(task._id)}>
                                                        <FaEdit className="me-2"/> Edit
                                                    </Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3"
                                                                   onClick={() => handleDelete(task._id)}>
                                                        <FaTrash className="me-2"/> Delete
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="my-3">
                        <AppPagination currentPage={response.page} handlePageChange={fetchTasks}
                                       prevPage={response.prevPage}
                                       nextPage={response.nextPage}/>
                    </div>
                </div>
            }
            {
                tasks.length === 0 &&
                <div className="alert alert-info">
                    No tasks found , please add a task to get started
                </div>
            }

            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showModal}
                contentClassName="rounded-1">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Task
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>

                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" name="title" required={true}
                                   value={formData.title} onChange={handleChange}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" id="description" name="description" required={true}
                                      value={formData.description} onChange={handleChange}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="priority" className="form-label">Priority</label>
                            <select className="form-select" id="priority" name="priority" required={true}
                                    value={formData.priority}
                                    onChange={handleChange}>
                                <option value="">Select Priority</option>
                                {PRIORITIES.map((priority) => (
                                    <option key={priority} value={priority}>{priority}</option>
                                ))}
                            </select>
                        </div>

                    </Modal.Body>
                    <Modal.Footer className="bg-light">
                        <Button type="submit" variant="primary" disabled={loading}>Save changes
                            {
                                loading && <div className="spinner-border spinner-border-sm ms-2" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            }
                        </Button>
                        <Button type="button"
                                onClick={() => setShowModal(false)}
                                variant="secondary">Close</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/*modal for assign task*/}

            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showAssignModal}
                contentClassName="rounded-1">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Assign Task
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleAssign}>
                    <Modal.Body>

                        {/*select user to assign task*/}
                        <div className="mb-3">
                            <label htmlFor="assignee" className="form-label">Assignee</label>
                            <select className="form-select" id="assignee" name="assignee" required={true}
                                    value={formData.assignee}
                                    onChange={handleChange}>
                                <option value="">Select Assignee</option>
                                {assignees.map((assignee) => (
                                    <option key={assignee._id} value={assignee._id}>{assignee.name}</option>
                                ))}
                            </select>
                        </div>

                    </Modal.Body>
                    <Modal.Footer className="bg-light">
                        <Button type="submit" variant="primary" disabled={loading}>Save changes
                            {
                                loading && <div className="spinner-border spinner-border-sm ms-2" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            }
                        </Button>
                        <Button type="button"
                                onClick={() => setShowAssignModal(false)}
                                variant="secondary">Close</Button>
                    </Modal.Footer>
                </Form>
            </Modal>


        </div>
    );
};

export default Tasks;