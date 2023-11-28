import {Button, Row, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import http from "../../configs/httpConfig.js";
import {Link, useMatch, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import Select from 'react-select';
import {formatDate} from "../../utils.js";
import {toast} from "react-toastify";
import {Formik, Form, Field, ErrorMessage} from 'formik';

const PRIORITIES = ["Low", "Medium", "High"];
const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    start_date: Yup.date().required('Start date is required'),
    end_date: Yup.date().required('End date is required').min(Yup.ref('start_date'), 'End date must be after start date'),
    description: Yup.string().required('Description is required').max(255, "Description must be at most 255 characters"),
    priority: Yup.string().required('Priority is required'),
});
export default function NewTask() {
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [remaining, setRemaining] = useState(255);
    const [formData, setFormData] = useState({
        assignees: [],
        projects: [],
        attachment: null
    });
    const initialValues = {
        title: '',
        start_date: '',
        end_date: '',
        description: '',
        priority: '',
        attachment: null
    };

    // const [response, setResponse] = useState({});
    const [assignees, setAssignees] = useState([]);
    const [projects, setProjects] = useState([]);


    // get id from the url params
    let match = useMatch('/tasks/:id/edit')

    const [savedAssignees, setSavedAssignees] = useState([]);
    const [savedProjects, setSavedProjects] = useState([]);
    const fetchTask = () => {
        setLoading(true);
        http.get(`/tasks/${match.params.id}/details`)
            .then((response) => {

                initialValues.title = response.data.title;
                initialValues.description = response.data.description;
                initialValues.priority = response.data.priority;
                initialValues.start_date = formatDate(response.data.startDate);
                initialValues.end_date = formatDate(response.data.endDate);

                setFormData({
                    assignees: response.data.assignees,
                    projects: response.data.projects,
                });
                setSavedAssignees(response.data.assignees);
                setSavedProjects(response.data.projects);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const fetchAssignees = () => {
        setLoading(true);
        http.get('/users')
            .then((response) => {
                let results = response.data.results;
                // remove formData.assignees from results
                if (match?.params.id) {
                    results = results.filter((item) => {
                        return !formData.assignees.find((assignee) => assignee._id === item._id);
                    });
                }
                setAssignees(results);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const fetchProjects = () => {
        setLoading(true);
        http.get('/projects')
            .then((response) => {
                console.log(response);
                setProjects(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });

    }

    useEffect(() => {
        if (match?.params.id) {
            fetchTask();
        }
        fetchAssignees();
        fetchProjects();
    }, []);


    const navigate = useNavigate();
    const handleSubmit = (values) => {
        if (formData.assignees.length === 0) {
            toast("Please choose at least one assignee", {
                type: "error"
            });
            return;
        }
        if (formData.projects.length === 0) {
            toast("Please choose at least one project", {
                type: "error"
            })
        }
        setSubmitting(true);
        let body = {
            title: values.title,
            description: values.description,
            priority: values.priority,
            assignees: formData.assignees.map((item) => item.value),
            projects: formData.projects.map((item) => item.value),
            start_date: values.start_date,
            end_date: values.end_date,
            attachment: formData.attachment
        };

        let promise;
        if (match?.params.id) {
            promise = http.put(`/tasks/${match.params.id}`, body, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } else {
            promise = http.post('/tasks', body, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        }
        promise.then(() => {
            toast('Task saved successfully', {
                type: 'success'
            });
            navigate('/tasks');
        })
            .catch(() => {
                setSubmitting(false);
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
                {match?.params.id ? 'Edit' : 'Create'}
                Task
            </h4>
            {
                loading &&
                <div className="d-flex justify-content-center align-items-center gap-2 my-4">
                    <Spinner/>
                    Fetching data ...
                </div>
            }


            <div>
                <p className="tw-tracking-wide tw-leading-loose">
                    Please fill in the form below to create a new task
                </p>
                <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                    {({errors, touched}) => {
                        return (
                            <Form>
                                <div>


                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label  fw-bold">Name</label>
                                        {/*<input type="text" className="form-control" id="title" name="title" required={true}*/}
                                        {/*       value={formData.title} onChange={handleChange}/>*/}
                                        <Field type="text"
                                               className={`form-control ${touched.title && errors.title ? 'border-danger' : ''}`}
                                               name="title" id="title"/>
                                        <ErrorMessage name="title" component="div"
                                                      className="text-danger tw-text-xs mt-1"/>
                                    </div>

                                    <div className="mb-3">
                                        <Row>
                                            <div className="col">
                                                <label htmlFor="start_date" className="form-label  fw-bold">Start
                                                    Date</label>

                                                <Field type="date"
                                                       className={`form-control ${touched.start_date && errors.start_date ? 'border-danger' : ''}`}
                                                       name="start_date" id="start_date"/>
                                                <ErrorMessage name="start_date" component="div"
                                                              className="text-danger tw-text-xs mt-1"/>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="end_date" className="form-label  fw-bold">End
                                                    Date</label>
                                                <Field type="date"
                                                       className={`form-control ${touched.end_date && errors.end_date ? 'border-danger' : ''}`}
                                                       name="end_date" id="start_date"/>
                                                <ErrorMessage name="end_date" component="div"
                                                              className="text-danger tw-text-xs mt-1"/>
                                            </div>
                                        </Row>
                                    </div>

                                    <div className="mb-3">
                                        <div className="d-flex gap-3 align-items-center my-3">
                                            <label htmlFor="assignee" className=" fw-bold">Assignees</label>
                                        </div>
                                        {/*assignees*/}
                                        {
                                            match?.params.id &&
                                            <Select
                                                isMulti
                                                name="assignes"
                                                options={assignees.map((item) => ({
                                                    value: item._id,
                                                    label: item.name
                                                }))}
                                                defaultValue={savedAssignees.map((item) => ({
                                                    value: item._id,
                                                    label: item.name
                                                }))}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                onChange={(newValue) => {
                                                    setFormData({
                                                        ...formData, assignees: newValue
                                                    });
                                                }}/>
                                        }
                                        {
                                            !match?.params.id &&
                                            <Select

                                                isMulti
                                                name="assignes"
                                                options={assignees.map((item) => ({
                                                    value: item._id,
                                                    label: item.name
                                                }))}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                onChange={(newValue) => {
                                                    setFormData({
                                                        ...formData, assignees: newValue
                                                    });
                                                }}/>
                                        }


                                        {
                                            formData.assignees.length === 0 &&
                                            <span className="text-muted tw-text-xs mt-1 d-block">
                                            Please choose at least one assignee.
                                        </span>

                                        }


                                    </div>

                                    <div className="mb-3">

                                        <div className="d-flex gap-3 align-items-center my-3">
                                            <label htmlFor="assignee" className=" fw-bold">
                                                Projects
                                            </label>

                                        </div>

                                        {/*projects*/}
                                        {
                                            match?.params.id &&
                                            <Select
                                                defaultValue={savedProjects?.map((item) => ({
                                                    value: item._id,
                                                    label: item.title
                                                }))}
                                                isMulti
                                                name="projects"
                                                options={projects.map((item) => ({
                                                    value: item._id,
                                                    label: item.title
                                                }))}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                onChange={(newValue) => {
                                                    setFormData({
                                                        ...formData, projects: newValue
                                                    });
                                                }}
                                            />
                                        }
                                        {
                                            !match?.params.id &&
                                            <Select
                                                isMulti
                                                name="projects"
                                                options={projects.map((item) => ({
                                                    value: item._id,
                                                    label: item.title
                                                }))}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                onChange={(newValue) => {
                                                    setFormData({
                                                        ...formData, projects: newValue
                                                    });
                                                }}
                                            />
                                        }


                                        {
                                            formData.projects.length === 0 &&
                                            <span className="text-muted tw-text-xs mt-1 d-block">
                                            Please choose at least one project.
                                        </span>

                                        }

                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="description"
                                               className="form-label  fw-bold">Description</label>
                                        {/*       <textarea className="form-control" id="description" name="description"
                                              required={true}
                                              value={formData.description} onChange={handleChange}/>*/}
                                        <Field as="textarea"
                                               onInput={(e) => {
                                                   setRemaining(255 - e.target.value.length);
                                               }}
                                               className={`form-control ${touched.description && errors.description ? 'border-danger' : ''} ${touched.description && !errors.description ? 'border-success' : ''}`}
                                               name="description" id="description"/>
                                        <p className="text-muted tw-text-xs mt-2">
                                            Remaining {remaining >= 0 ? remaining : 0} characters.
                                        </p>
                                        <ErrorMessage name="description" component="div"
                                                      className="text-danger tw-text-xs mt-1"/>
                                    </div>
                                    <div className="mb-3">
                                        <p className="form-label d-block fw-bold">Priority</p>

                                        {PRIORITIES.map((priority) => (
                                            <div className="form-check form-check-inline"
                                                 key={`priority_${priority}`}>
                                                <Field type="radio" className="form-check-input" name="priority"
                                                       id={`priority_${priority}`}
                                                       value={priority}
                                                />
                                                <label className="form-check-label"
                                                       htmlFor={`priority_${priority}`}>{priority}</label>
                                            </div>
                                        ))}

                                        <ErrorMessage name="priority" component="div"
                                                      className="text-danger tw-text-xs mt-1"/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="formFile" className="form-label">
                                            Attachment
                                        </label>
                                        <input className="form-control"
                                               onChange={handleFileChange}
                                               accept={".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg"}
                                               type="file" id="attachment" name="attachment"/>
                                        <ErrorMessage name="attachment" component="div"
                                                      className="text-danger tw-text-xs mt-1"/>
                                    </div>

                                </div>
                                <div className="d-flex justify-content-end align-items-center mt-4">
                                    <Link to={'/tasks'} className="btn btn-secondary me-2 px-4 py-2">
                                        Cancel
                                    </Link>
                                    <Button type="submit" variant="primary" disabled={loading}
                                            className="px-4 py-2">
                                        Submit
                                        {submitting &&
                                            <div className="spinner-border spinner-border-sm ms-2" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>}
                                    </Button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>

            </div>

        </div>
    )
}