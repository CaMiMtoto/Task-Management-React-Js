import PropTypes from "prop-types";
import {FaSort, FaSortDown, FaSortUp} from "react-icons/fa6";

export default function Th({sortColumn, sortOrder, onSort, currentSortColumn, text, sortable = true}) {
    if (sortable) {
        return <th
            onClick={() => onSort(sortColumn)}
            className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider tw-cursor-pointer">
            <div className="d-flex justify-content-between align-items-center">
                <span>{text}</span>
                {/*<FaSort/>*/}
                {sortColumn === currentSortColumn && sortOrder === 'asc' && <FaSortUp/>}
                {sortColumn === currentSortColumn && sortOrder === 'desc' && <FaSortDown/>}
                {sortColumn !== currentSortColumn && <FaSort/>}
            </div>
        </th>;
    } else {
        return <th
            className="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase tw-tracking-wider ">
            <div className="d-flex justify-content-between align-items-center">
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