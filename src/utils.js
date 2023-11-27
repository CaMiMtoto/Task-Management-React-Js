function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

const getTaskColor = (priority) => {
    switch (priority) {
        case 'Low':
            return 'success';
        case 'Medium':
            return 'warning';
        case 'High':
            return 'danger';
        default:
            return 'secondary';
    }
}

export {
    formatDate,
    getTaskColor
}