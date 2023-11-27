import {Button, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import http from "../../configs/httpConfig.js";
import {Link, useMatch, useNavigate} from "react-router-dom";
import Select from 'react-select';
import {formatDate} from "../../utils.js";

const PRIORITIES = ["Low", "Medium", "High"];

export default function NewTask() {

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        _id: '',
        name: '',
        start_date: '',
        end_date: '',
        assignees: [],
        projects: [],
        description: '',
        priority: '',
        attachment: null
    });

    // const [response, setResponse] = useState({});
    const [assignees, setAssignees] = useState([]);
    const [projects, setProjects] = useState([]);


    // get id from the url params
    let match = useMatch('/tasks/:id/edit')


    const fetchTask = () => {
        setLoading(true);
        http.get(`/tasks/${match.params.id}/details`)
            .then((response) => {
                console.log(response);
                setFormData({
                    _id: response.data._id,
                    title: response.data.title,
                    description: response.data.description,
                    priority: response.data.priority,
                    assignees: response.data.assignees,
                    projects: response.data.projects,
                    // format date to yyyy-MM-dd
                    start_date: formatDate(response.data.startDate),
                    end_date: formatDate(response.data.endDate)
                });
                console.log(response.data.assignees.map((item) => ({value: item._id, label: item.name})));
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const fetchAssignees = () => {

        http.get('/users')
            .then((response) => {
                setAssignees(response.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const fetchProjects = () => {
        http.get('/projects')
            .then((response) => {
                console.log(response);
                setProjects(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    useEffect(() => {

        if (match?.params.id) {
            fetchTask();
        }
        fetchAssignees();
        fetchProjects();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }

    function resetFormData() {
        // clear the form
        setFormData({
            _id: '',
            title: '',
            description: '',
            priority: '',
            assignee: '',
            start_date: '',
            end_date: '',
            projects: [],
            assignees: [],
            attachment: null
        });
        // close the modal
    }

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // return;
        setLoading(true);
        let body = {
            _id: formData._id,
            title: formData.title,
            description: formData.description,
            priority: formData.priority,
            assignees: formData.assignees.map((item) => item.value),
            projects: formData.projects.map((item) => item.value),
            start_date: formData.start_date,
            end_date: formData.end_date,
            attachment: formData.attachment
        };
        let promise = http.post('/tasks', body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (match.params.id) {
            promise = http.put(`/tasks/${match.params.id}`, body, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        }

        promise
            .then(() => {
                resetFormData();
                navigate('/tasks');
            })
            .catch(() => {
                setLoading(false);
            })
            .finally(() => {
            });

    }
    const handleFileChange = (e) => {
        e.preventDefault();
        setFormData({
            ...formData, [e.target.name]: e.target.files[0]
        });
    }

    return (<div>
        <h4>
            New Task
        </h4>
        <p>
            Please fill in the form below to create a new task
        </p>
        <Form onSubmit={handleSubmit}>
            <div>


                <div className="mb-3">
                    <label htmlFor="name" className="form-label  fw-bold">Name</label>
                    <input type="text" className="form-control" id="title" name="title" required={true}
                           value={formData.title} onChange={handleChange}/>
                </div>

                <div className="mb-3">
                    <Row>
                        <div className="col">
                            <label htmlFor="start_date" className="form-label  fw-bold">Start Date</label>
                            <input type="date" className="form-control" id="start_date" name="start_date"
                                   required={true}
                                   value={formData.start_date} onChange={handleChange}/>
                        </div>
                        <div className="col">
                            <label htmlFor="end_date" className="form-label  fw-bold">End Date</label>
                            <input type="date" className="form-control" id="end_date" name="end_date"
                                   required={true}
                                   value={formData.end_date} onChange={handleChange}/>
                        </div>
                    </Row>
                </div>

                <div className="mb-3">
                    <div className="d-flex gap-3 align-items-center my-3">
                        <label htmlFor="assignee" className=" fw-bold">Assignees</label>
                    </div>
                    {/*assignees*/}

                    <Select
                        isMulti
                        name="assignes"
                        options={assignees.map((item) => ({value: item._id, label: item.name}))}
                        defaultValue={formData.assignees?.map((item) => ({value: item._id, label: item.name}))}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(newValue) => {
                            setFormData({
                                ...formData, assignees: newValue
                            });
                        }}
                    />


                </div>

                <div className="mb-3">

                    <div className="d-flex gap-3 align-items-center my-3">
                        <label htmlFor="assignee" className=" fw-bold">
                            Projects
                        </label>

                    </div>

                    {/*projects*/}

                    <Select
                        defaultValue={formData.projects?.map((item) => ({value: item._id, label: item.title}))}
                        isMulti
                        name="projects"
                        options={projects.map((item) => ({value: item._id, label: item.title}))}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(newValue) => {
                            setFormData({
                                ...formData, projects: newValue
                            });
                        }}
                    />

                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label  fw-bold">Description</label>
                    <textarea className="form-control" id="description" name="description" required={true}
                              value={formData.description} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="priority" className="form-label d-block fw-bold">Priority</label>

                    {PRIORITIES.map((priority) => (
                        <div className="form-check form-check-inline" key={`priority-${priority}`}>
                            <input className="form-check-input" type="radio" name="priority" required={true}
                                   defaultValue={formData.priority} onChange={handleChange}
                                   checked={formData.priority === priority}
                                   id={`priority-id-${priority}`}/>
                            <label className="form-check-label" htmlFor={`priority-id-${priority}`}>
                                {priority}
                            </label>
                        </div>))}
                </div>

                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">
                        Attachment
                    </label>
                    <input className="form-control"
                           onChange={handleFileChange}
                           type="file" id="attachment" name="attachment"/>
                </div>

            </div>
            <div className="d-flex justify-content-end align-items-center mt-4">
                <Link to={'/tasks'} className="btn btn-secondary me-2">
                    Cancel
                </Link>
                <Button type="submit" variant="primary" disabled={loading}>
                    Submit
                    {loading && <div className="spinner-border spinner-border-sm ms-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>}
                </Button>
            </div>
        </Form>


    </div>)
}