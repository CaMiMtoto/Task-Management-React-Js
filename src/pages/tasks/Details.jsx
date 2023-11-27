import {useMatch} from "react-router-dom";
import {useEffect, useState} from "react";
import http from "../../configs/httpConfig.js";
import {Spinner} from "react-bootstrap";
import {formatDate, getTaskColor} from "../../utils.js";
import {FaDownload} from "react-icons/fa6";

export default function TaskDetails() {
    let match = useMatch('/tasks/:id/details');
    const [loading, setLoading] = useState(true);
    const [task, setTask] = useState({});

    const fetchTask = () => {
        setLoading(true);
        http.get(`/tasks/${match.params.id}/details`)
            .then((response) => {
                setTask(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });

    }

    useEffect(() => {
        fetchTask();
    }, []);
    return (
        <div>
            <h4 className="mb-4">Task Details</h4>
            <div>
                {
                    loading && <div className="d-flex justify-content-center align-items-center my-4">
                        <Spinner/>
                    </div>
                }
            </div>

            <div className="row">
                <div className="col-md-12">
                    <h6>
                        Title
                    </h6>
                    <p>
                        {task?.title}
                    </p>

                </div>
                <div className="col-md-12">
                    <h6>
                        Description
                    </h6>
                    <p>
                        {task?.description}
                    </p>
                </div>

            </div>
            <div className="row">
                <div className="col-md-6">
                    <h6>
                        Start Date
                    </h6>
                    <p>
                        {formatDate(task?.startDate)}
                    </p>
                </div>
                <div className="col-md-6">
                    <h6>
                        End Date
                    </h6>
                    <p>
                        {formatDate(task?.endDate)}
                    </p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <h6>
                        Priority
                    </h6>
                    <p>
                         <span
                             className={`badge rounded-pill bg-${getTaskColor(task?.priority)}-subtle text-${getTaskColor(task?.priority)}`}>
                                {task?.priority}
                            </span>
                    </p>
                </div>
                <div className="col-md-6">
                    <h6>
                        Attachment
                    </h6>
                    <a href={`${import.meta.env.VITE_APP_API_URL}tasks/download/${task?._id}`} target="_blank"
                       rel="noreferrer"
                       className="btn btn-success btn-sm px-3">
                        <span className="">Download</span>
                    </a>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <h6>
                        Assignees
                    </h6>
                    <p>
                        {task?.assignees?.map((assignee) => {
                            return <span className="badge bg-secondary-subtle text-secondary-emphasis me-2"
                                         key={`project_${assignee._id}`}>{assignee.name}</span>;

                        })}
                    </p>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <h6>
                        Projects
                    </h6>
                    <p>
                        {task?.projects?.map((item) => {
                            return <span className="badge bg-secondary-subtle text-secondary-emphasis me-2"
                                         key={`project_${item._id}`}>{item.title}</span>;
                        })}
                    </p>
                </div>
            </div>


        </div>
    )
}