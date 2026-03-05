// prettier-ignore
import { DateNull, NumberNull, StringNull } from 'src/core/common/dto/common.dto';

/**
 * DTO for department responses.
 *
 * Represents department data returned to the client using camelCase fields.
 */
export class DepartmentDto {
    // Primary key of the department.
    departmentId!: number;

    // Unique department code.
    code!: string;

    // Department name.
    name!: string;

    // Department room/office.
    room!: StringNull;

    // Department email address.
    email!: StringNull;

    // Department contact number.
    phone!: StringNull;

    // Additional department description.
    description!: StringNull;

    // Active flag (true = active, false = inactive).
    isActive!: boolean;

    // Soft delete flag (true = deleted, false = not deleted).
    isDeleted!: boolean;

    // User ID who created the record.
    createdBy!: NumberNull;

    // Date/time when the record was created.
    createdDate!: Date;

    // User ID who last updated the record.
    updatedBy!: NumberNull;

    // Date/time when the record was last updated.
    updatedDate!: DateNull;
}
