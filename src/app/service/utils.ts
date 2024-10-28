// Interfaces for type safety
export interface PageableResponse<T> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;  
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
    numberOfElements: number;
    pageable: {
      offset: number;
      pageNumber: number;
      pageSize: number;
      paged: boolean;
      sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
      };
      unpaged: boolean;
    };
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
}