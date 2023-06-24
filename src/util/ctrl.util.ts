export function applyPagination(limit: number = 10, page: number = 1, data: any) {
    const startIndex = (page - 1) * limit ? 1 : (page - 1) * limit;
    const endIndex = page * limit;
    const results = {
        next: {},
        previous: {},
        data: {},
    };
    if (endIndex < data.length) {
        results.next = {
            page: page + 1,
            limit: limit,
        };
    }
    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit,
        };
    }
    results.data = data.slice(startIndex, startIndex + limit);
    return results;
}

export function applySort(sortBy: keyof any, sortOrder: 'asc' | 'desc', dataList: any) {
    const sortedData = [...dataList];

    sortedData.sort((a, b) => {
        let compareResult = 0;
        if (a[sortBy] < b[sortBy]) {
            compareResult = -1;
        } else if (a[sortBy] > b[sortBy]) {
            compareResult = 1;
        }
        if (sortOrder === 'desc') {
            compareResult *= -1;
        }
        return compareResult;
    });

    return sortedData;
}