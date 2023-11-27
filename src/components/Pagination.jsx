import PropTypes from "prop-types";
import {FaArrowCircleLeft, FaArrowCircleRight} from "react-icons/fa";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa6";

export default function AppPagination({currentPage, nextPage, prevPage, handlePageChange}) {

    return (
        <div className="pagination d-flex">
            <button className="btn btn-primary  rounded-start-1 rounded-end-0" onClick={() => handlePageChange(prevPage)}
                    disabled={prevPage === null}>
                <FaChevronLeft/>
            </button>
            <button type="button" className="btn btn-primary rounded-0" disabled={true}>{currentPage}</button>
            <button className="btn btn-primary rounded-start-0 rounded-end-1" onClick={() => handlePageChange(nextPage)}
                    disabled={nextPage === null}>
                <FaChevronRight/>
            </button>
        </div>
    );
}

AppPagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    nextPage: PropTypes.string,
    prevPage: PropTypes.string,
    handlePageChange: PropTypes.func.isRequired,
}
