export interface Pageable {

    pageNumber: number,
    pageSize: number,
    sortBy: string,
    direction: string,
    queryParams?: Map<string, string>

}
