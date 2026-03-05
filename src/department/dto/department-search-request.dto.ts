import { PartialType, PickType, IntersectionType } from '@nestjs/swagger';
import { PaginationRequestDto } from '../../core/pagination/dto/pagination-request.dto';
import { DepartmentCreateRequestDto } from './department-create-request.dto';

// prettier-ignore
/**
 * DTO for department list/search request parameters.
 * Includes field-based contains search and pagination/sorting parameters.
 */
export class DepartmentSearchRequestDto extends IntersectionType(
    PartialType(
        PickType(
            DepartmentCreateRequestDto,
            [
                'name',
                'code',
                'room'
            ] as const
        )
    ),
    PaginationRequestDto
) {

}
