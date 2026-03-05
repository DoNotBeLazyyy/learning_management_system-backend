import { DepartmentRow } from '../dto/department-repository.dto';
import { DepartmentDto } from '../dto/department.dto';

/**
 * Maps a department database row into a department response DTO.
 *
 * @param row the department database row.
 * @return the mapped department DTO.
 */
export function toDepartmentDto(row: DepartmentRow): DepartmentDto {
    return {
        departmentId: row.department_id,
        code: row.code,
        name: row.name,
        room: row.room,
        email: row.email,
        phone: row.phone,
        description: row.description,
        isActive: row.is_active === 1,
        isDeleted: row.is_deleted === 1,
        createdBy: row.created_by,
        createdDate: row.created_date,
        updatedBy: row.updated_by,
        updatedDate: row.updated_date
    };
}
