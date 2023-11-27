import {useEffect, useState} from "react";
import {FaEdit} from "react-icons/fa";
import {FaEye, FaPlus, FaTrash} from "react-icons/fa6";
import http from "../configs/httpConfig.js";
import AppPagination from "../components/Pagination.jsx";
import {Link} from "react-router-dom";
import {Spinner} from "react-bootstrap";
import {getTaskColor} from "../utils.js";


const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState({});


    const fetchTasks = (url = '/tasks') => {
        setLoading(true);
        http.get(url)
            .then((response) => {
                console.log(response);
                setTasks(response.data.results);
                setResponse(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchTasks();
    }, []);


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


    const exportUrl = import.meta.env.VITE_APP_API_URL + 'tasks/export';
    return (<div>
        <h1 className="mb-0">
            Tasks
        </h1>
        <div className="d-flex justify-content-between align-items-center my-3">
            <div>
                <input className="form-control" placeholder='Search ...'/>
            </div>
            <div className="btn-group">
                <Link to={'/tasks/create'} className="btn btn-primary">
                    Add Task
                    <FaPlus className="ms-2"/>
                </Link>
                <a href={exportUrl} target={"_blank"} className="btn btn-success" rel="noreferrer">
                    Export
                </a>
            </div>
        </div>

        {
            loading &&
            <div className="d-flex justify-content-center align-items-center">
                <Spinner variant="primary"/>
            </div>
        }

        {!loading && tasks.length > 0 && <div>
            <table className="table table-striped table-hover  rounded">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Priority</th>
                    <th>Validity</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tasks.map((task) => (
                    <tr key={task._id}>
                        <td>{task.title}</td>
                        <td>
                            <span
                                className={`badge rounded-pill bg-${getTaskColor(task.priority)}-subtle text-${getTaskColor(task.priority)}`}>
                                {task.priority}
                            </span>
                        </td>
                        <td>
                            From {new Date(task.startDate).toLocaleDateString()} to {new Date(task.endDate).toLocaleDateString()}
                        </td>
                        <td>
                            <div>
                                <Link to={`/tasks/${task._id}/details`} title="Details"
                                      className="btn btn-primary  bg-primary-subtle text-primary-emphasis border-0 rounded-1">
                                    <FaEye/>
                                </Link>
                                <Link to={`/tasks/${task._id}/edit`} title="Edit"
                                      className="btn btn-primary  bg-primary-subtle mx-2 text-primary-emphasis border-0 rounded-1">
                                    <FaEdit/>
                                </Link>
                                <button type="button" title="Delete"
                                        className="btn btn-danger bg-danger-subtle text-danger-emphasis border-0 rounded-1"
                                        onClick={() => handleDelete(task._id)}>
                                    <FaTrash/>
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="my-3">
                <AppPagination currentPage={response.page} handlePageChange={fetchTasks}
                               prevPage={response.prevPage}
                               nextPage={response.nextPage}/>
            </div>
        </div>}
        {tasks.length === 0 && <div className="alert alert-info">
            No tasks found , please add a task to get started
        </div>}


    </div>);
};

export default Tasks;