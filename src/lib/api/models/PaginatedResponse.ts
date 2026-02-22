export type PaginatedResponse<T> = {
    count: number;
    total_pages: number;
    page: number;
    page_size: number;
    results: T[];
};
