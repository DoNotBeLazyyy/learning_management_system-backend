import { RowDataPacket } from 'mysql2';
// prettier-ignore
import { StringNull, NumberNull, DateNull } from 'src/core/common/dto/common.dto';
import { PaginationDTO } from 'src/core/pagination/dto/pagination.dto';

/**
 * Allowed duplicate-check fields for department.
 */
export type DepartmentDuplicateField = 'code' | 'name' | 'email' | 'phone';

/**
 * Department List DTO
 */
export type PageableDepartmentDto = PaginationDTO<DepartmentRow>;

/**
 * Full department row shape returned by SQL queries.
 */
export interface DepartmentRow extends RowDataPacket {
    // Department primary key.
    department_id: number;

    // Unique department code.
    code: string;

    // Department name.
    name: string;

    // Department room/office.
    room: StringNull;

    // Department email address.
    email: StringNull;

    // Department contact number.
    phone: StringNull;

    // Optional department description.
    description: StringNull;

    // Active flag stored as TINYINT (1 = active, 0 = inactive).
    is_active: number;

    // Soft delete flag stored as TINYINT (1 = deleted, 0 = not deleted).
    is_deleted: number;

    // User ID who created the record.
    created_by: NumberNull;

    // Date/time when the record was created.
    created_date: Date;

    // User ID who last updated the record.
    updated_by: NumberNull;

    // Date/time when the record was last updated.
    updated_date: DateNull;
}

// Row shape used for minimal existence checks.
export interface DepartmentIdRow extends RowDataPacket {
    // Department primary key.
    department_id: number;
}

/**
 * Row shape used for count queries.
 */
export interface DepartmentCountRow extends RowDataPacket {
    // Total row count.
    total: number;
}
