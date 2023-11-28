import PropTypes from "prop-types";
import {FaSort, FaSortDown, FaSortUp} from "react-icons/fa6";

export default function Th({sortColumn, sortOrder, onSort, currentSortColumn, text, sortable = true}) {
    if (sortable) {
        return <th
            onClick={() => onSort(sortColumn)}
            className="w-tracking-normal text-uppercase text-primary fw-semibold tw-border-b-primary border-0 border-3 border-bottom tw-cursor-pointer">
            <div
                className="d-flex justify-content-between align-items-center tw-cursor-pointer tw-text-xs  border-3 border-end w-100">
                <span>{text}</span>
                {/*<FaSort/>*/}
                {sortColumn === currentSortColumn && sortOrder === 'asc' && <FaSortUp/>}
                {sortColumn === currentSortColumn && sortOrder === 'desc' && <FaSortDown/>}
                {sortColumn !== currentSortColumn && <FaSort/>}
            </div>
        </th>;
    } else {
        return <th
            className="w-tracking-normal text-uppercase text-primary fw-semibold tw-border-b-primary border-0 border-3 border-bottom">
            <div
                className="d-flex justify-content-between align-items-center tw-cursor-pointer tw-text-xs  border-3 border-end w-100">
                <span>{text}</span>
            </div>
        </th>;

    }
}
Th.propTypes = {
    sortColumn: PropTypes.string,
    sortOrder: PropTypes.string,
    onSort: PropTypes.func,
    currentSortColumn: PropTypes.string,
    text: PropTypes.string.isRequired,
    sortable: PropTypes.bool
}