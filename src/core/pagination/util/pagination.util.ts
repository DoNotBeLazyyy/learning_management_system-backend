import { StringUndefined } from 'src/core/common/dto/common.dto';
import { PaginationRequestDto } from '../dto/pagination-request.dto';
import { PaginationDTO } from '../dto/pagination.dto';

// prettier-ignore
/**
 * Normalizes a value to 'ASC' or 'DESC'.
 * Defaults to 'ASC' if the input is invalid or not a string.
 *
 * @param value  the raw input to be normalized.
 * @returns 'ASC' or 'DESC'.
 */
export function transformToSortDirection(value: string): 'ASC' | 'DESC' {
    const normalized = String(value)
        .trim()
        .toUpperCase();

    return normalized === 'DESC' ? 'DESC' : 'ASC';
}

// prettier-ignore
/**
 * Builds a safe ORDER BY SQL clause from pagination sort parameters.
 * Only sortable columns provided in the whitelist map will be used.
 *
 * @param pagination pagination request DTO containing sort parameters.
 * @param sortableColumns API field name to SQL column mapping.
 * @param defaultOrderBy fallback ORDER BY clause when no valid sort is provided.
 * @returns SQL ORDER BY clause.
 */
export function buildOrderByClause(
    pagination: Pick<PaginationRequestDto, 'sortParameters'>,
    sortableColumns: Record<string, string>,
    defaultOrderBy: string
): string {
    const sortParameters = pagination.sortParameters ?? [];
    const orderTokens: string[] = [];

    for (const sortParameter of sortParameters) {
        const column: StringUndefined = sortableColumns[sortParameter.sortBy];

        if (!column) {
            continue;
        }

        orderTokens.push(`${column} ${transformToSortDirection(sortParameter.sortDirection)}`);
    }

    return !orderTokens.length
        ? defaultOrderBy
        : `ORDER BY
            ${orderTokens.join(',\n')}
        `;
}

// prettier-ignore
/**
 * Creates a Spring-style pagination DTO from request pagination and list results.
 *
 * @param content current page content.
 * @param page requested page number (1-based).
 * @param size requested page size.
 * @param totalElements total matching row count.
 * @param numberOfElements current page row count.
 * @param isSorted whether at least one sort parameter was applied.
 * @returns paginated response DTO.
 */
export function toPaginationDto<T>(
    content: T[],
    page: number,
    size: number,
    totalElements: number,
    numberOfElements: number,
    isSorted: boolean
): PaginationDTO<T> {
    const zeroBasedPageNumber = Math.max(page - 1, 0);
    const totalPages = size > 0
        ? Math.ceil(totalElements / size)
        : 0;
    const islast = totalPages === 0
        ? true
        : zeroBasedPageNumber >= totalPages - 1;
    const sortState = {
        empty: !isSorted,
        sorted: isSorted,
        unsorted: !isSorted
    };

    return {
        content,
        pageable: {
            pageNumber: zeroBasedPageNumber,
            pageSize: size,
            sort: sortState,
            offset: zeroBasedPageNumber * size,
            unpaged: false,
            paged: true
        },
        last: islast,
        totalElements,
        totalPages,
        size,
        number: zeroBasedPageNumber,
        sort: sortState,
        first: zeroBasedPageNumber === 0,
        numberOfElements,
        empty: numberOfElements === 0
    };
}
