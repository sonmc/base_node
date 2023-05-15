export function pagination(limit: number, cursor: number, data: any) {
    let startIndex = 0;
    const pageSize: number = limit;
    if (cursor) {
        const cursorIndex = data.findIndex((record: any) => record.id.toString() === cursor);
        if (cursorIndex !== -1) {
            startIndex = cursorIndex + 1;
        }
    }

    const pageRecords = data.slice(startIndex, startIndex + pageSize);
    const nextPageCursor = pageRecords.length > 0 ? pageRecords[pageRecords.length - 1].id.toString() : undefined;

    return {
        records: pageRecords,
        cursor: nextPageCursor,
    };
}
