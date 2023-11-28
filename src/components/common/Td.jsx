import PropTypes from "prop-types";

export default function Td({children, ...props}) {
    return (
        <td className="border-bottom border-4 border-0 tw-border-b-white tw-bg-primary/5  tw-text-sm tw-align-middle py-2" {...props}>
            {children}
        </td>
    );
}

Td.propTypes = {
    children: PropTypes.node
}