import {Col, Row, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import http from "../configs/httpConfig.js";
import {formatDate} from "../utils.js";
import {Link} from "react-router-dom";
import {FaChevronRight} from "react-icons/fa6";

function Home() {

    const [loading, setLoading] = useState(false);
    const [homeData, setHomeData] = useState({});

    const fetchHomeData = () => {
        setLoading(true);
        http.get('/tasks/overview')
            .then(value => {
                setHomeData(value.data);
            })
            .finally(() => {
                setLoading(false);
            });

    }

    useEffect(() => {
        fetchHomeData();
    }, []);

    return (
        <div>
            <h4 className="mb-4">
                Task Overview
            </h4>

            <div>
                {
                    loading && <Spinner/>
                }
            </div>

            {
                !loading && homeData && <div>
                    <Row>
                        <Col md={6}>
                            <div className="card card-body bg-primary-subtle text-primary-emphasis">
                                <h5>
                                    Total Tasks
                                </h5>
                                <h1>
                                    {homeData.totalTasks}
                                </h1>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="card card-body bg-danger-subtle text-danger">
                                <h5>
                                    Due Tasks
                                </h5>
                                <h1>
                                    {homeData.dueTasks}
                                </h1>
                            </div>
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col md={12}>
                            <div className="card card-body">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="mb-0">
                                        Recent Tasks
                                    </h4>
                                    <Link to={'/tasks/create'} className="btn btn-primary">
                                        New Task
                                    </Link>
                                </div>
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>
                                            Title
                                        </th>
                                        <th>
                                            Priority
                                        </th>
                                        <th>
                                            Due Date
                                        </th>
                                        <th>
                                            Actions
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        homeData.recentTasks?.map((task) => (
                                            <tr key={`task_id_${task._id}`}>
                                                <td>
                                                    {task.title}
                                                </td>
                                                <td>
                                                    {task.priority}
                                                </td>
                                                <td>
                                                    {formatDate(task.endDate)}
                                                </td>
                                                <td>
                                                    <Link className="btn btn-sm btn-primary" to={`/tasks/${task._id}/edit`}>
                                                        Edit
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>

                                <div className="text-center">
                                    <Link to="/tasks" className="btn btn-primary d-inline-flex align-items-center gap-2 px-4 rounded-1">
                                        More
                                        <FaChevronRight/>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            }
        </div>
    );
}

export default Home;