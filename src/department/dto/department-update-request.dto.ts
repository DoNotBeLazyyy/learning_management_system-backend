import { PartialType } from '@nestjs/mapped-types';
import { DepartmentCreateRequestDto } from './department-create-request.dto';

// prettier-ignore
/**
 * Request payload for updating a department.
 * All fields are optional to support partial updates.
 */
export class DepartmentUpdateRequestDto extends PartialType(DepartmentCreateRequestDto) {

}
