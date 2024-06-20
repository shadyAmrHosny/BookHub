const getPagination = (page, size) => {
    const limit = size ? parseInt(size) : 10;
    const offset = page ? (parseInt(page) - 1) * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: items } = data;
    const currentPage = page ? parseInt(page) : 1;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, items, totalPages, currentPage };
};

module.exports = {
    getPagination,
    getPagingData
};
