import {Col, Row, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import http from "../configs/httpConfig.js";
import {formatDate} from "../utils.js";
import {Link} from "react-router-dom";
import {FaCalendarCheck, FaChevronRight, FaClock, FaPlus} from "react-icons/fa6";
import Th from "../components/common/Th.jsx";
import Td from "../components/common/Td.jsx";
import {FaTasks} from "react-icons/fa";

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
                        <Col md={4}>
                            <div className="card card-body bg-primary-subtle text-primary-emphasis">
                                <FaTasks size={44}/>
                                <h5 className="mt-3">
                                    Total Tasks
                                </h5>
                                <h1>
                                    {homeData.totalTasks}
                                </h1>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="card card-body bg-danger-subtle text-danger">
                                <FaCalendarCheck size={44}/>
                                <h5 className="mt-3">
                                    Due Tasks
                                </h5>
                                <h1>
                                    {homeData.dueTasks}
                                </h1>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="card card-body bg-success-subtle text-success">
                                <FaClock size={44}/>
                                <h5 className="mt-3">
                                    Upcoming Tasks
                                </h5>
                                <h1>
                                    {homeData.upcomingTasks}
                                </h1>
                            </div>
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col md={12}>
                            <div className="">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="mb-0">
                                        Recent Tasks
                                    </h4>
                                    <Link to={'/tasks/create'} className="btn btn-primary">
                                        <span className="me-2">New Task</span>
                                        <FaPlus/>
                                    </Link>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <Th text="Title" sortable={false}/>
                                            <Th text="Priority" sortable={false}/>
                                            <Th text="Due Date" sortable={false}/>
                                            <Th text="Actions" sortable={false}/>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            homeData.recentTasks?.map((task) => (
                                                <tr key={`task_id_${task._id}`}>
                                                    <Td>
                                                        {task.title}
                                                    </Td>
                                                    <Td>
                                                        {task.priority}
                                                    </Td>
                                                    <Td>
                                                        {formatDate(task.endDate)}
                                                    </Td>
                                                    <Td>
                                                        <Link className="btn btn-sm btn-primary"
                                                              to={`/tasks/${task._id}/details`}>
                                                            Details
                                                        </Link>
                                                    </Td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                </div>

                                <div className="">
                                    <Link to="/tasks"
                                          className="btn btn-primary d-inline-flex align-items-center gap-2 px-4 ">
                                        More Tasks
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