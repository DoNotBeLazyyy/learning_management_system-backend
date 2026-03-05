import { Injectable } from '@nestjs/common';
import { ResultSetHeader } from 'mysql2/promise';
// prettier-ignore
import { StringNullUndefined, StringUndefined } from 'src/core/common/dto/common.dto';
import { BaseRepository } from 'src/core/common/repository/base.repository';
// prettier-ignore
import { getFirstRowOrNull, sanitizeNumberValue, stringOrNull } from 'src/core/common/util/clean.util';
// prettier-ignore
import { buildOrderByClause, toPaginationDto } from 'src/core/pagination/util/pagination.util';
import { DatabaseService } from 'src/database/service/database.service';
import { DepartmentCreateRequestDto } from '../dto/department-create-request.dto';
// prettier-ignore
import { DepartmentCountRow, DepartmentDuplicateField, DepartmentIdRow, PageableDepartmentDto, DepartmentRow } from '../dto/department-repository.dto';
import { DepartmentSearchRequestDto } from '../dto/department-search-request.dto';
import { createDepartmentLikeParams } from '../util/department.util';

/**
 * Repository for department data access.
 * Handles all SQL queries related to the department table.
 */
@Injectable()
export class DepartmentRepository extends BaseRepository {
    constructor(databaseService: DatabaseService) {
        super(databaseService);
    }

    // Department table name.
    private readonly tableName: string = 'department';

    // prettier-ignore
    // Whitelisted duplicate-check columns.
    private readonly duplicateFieldColumns: Record<DepartmentDuplicateField, string> = {
        code: 'code',
        name: 'name',
        email: 'email',
        phone: 'phone'
    };

    // prettier-ignore
    /**
     * Inserts a new department record.
     *
     * @param requestDto the create department request payload.
     * @return the newly created department ID.
     */
    async create(requestDto: DepartmentCreateRequestDto): Promise<boolean> {
        const { code, name, room, email, phone, description} = requestDto;
        const [result] = await this.pool.execute<ResultSetHeader>(
            `INSERT INTO
                department (
                    code,
                    name,
                    room,
                    email,
                    phone,
                    description,
                    created_by
                )
            VALUES
                (?, ?, ?, ?, ?, ?, ?)`,
            [
                code,
                name,
                stringOrNull(room),
                stringOrNull(email),
                stringOrNull(phone),
                stringOrNull(description),
                null
            ]
        );

        return result.affectedRows === 1;
    }

    // prettier-ignore
    /**
     * Returns paginated department rows and total count based on search filters.
     *
     * @param searchRequestDTO department search and pagination request DTO.
     * @returns list rows and total count.
     */
    async findList(searchRequestDTO: DepartmentSearchRequestDto): Promise<PageableDepartmentDto> {
        const { code, name, room, page, size } = searchRequestDTO;
        const offset = (page - 1) * size;
        const sortableColumns = {
            id: 'id',
            code: 'code',
            name: 'name',
            room: 'room',
            email: 'email',
            phone: 'phone',
            createdDate: 'created_date',
            updatedDate: 'updated_date'
        };
        const orderByClause = buildOrderByClause(
            searchRequestDTO,
            sortableColumns,
            'ORDER BY created_date ASC'
        );
        const total = await this.findCountByCodeAndNameAndRoom(
            code,
            name,
            room
        );
        const [rows] = await this.pool.query<DepartmentRow[]>(
            `SELECT
                department_id,
                code,
                name,
                room,
                email,
                phone,
                is_deleted,
                created_by,
                created_date,
                updated_by,
                updated_date
            FROM
                department
            WHERE
                is_deleted = 0
                AND name LIKE ?
                AND code LIKE ?
                AND COALESCE(room, '') LIKE ?
            ${orderByClause}
            LIMIT ?
            OFFSET ?`,
            [
                ...createDepartmentLikeParams([
                    code,
                    name,
                    room
                ]),
                size,
                offset
            ]
        );

        return toPaginationDto<DepartmentRow>(
            rows,
            page,
            size,
            total,
            rows.length,
            Boolean(searchRequestDTO.sortParameters?.length)
        );
    }

    /**
     * Finds an active department by primary key.
     *
     * @param departmentId the department ID.
     * @return the full department row, or null if not found.
     */
    async findById(departmentId: number): Promise<DepartmentRow | null> {
        const [rows] = await this.pool.query<DepartmentRow[]>(
            `SELECT
                department_id,
                code,
                name,
                room,
                email,
                phone,
                description,
                is_active,
                is_deleted,
                created_by,
                created_date,
                updated_by,
                updated_date
            FROM
                department
            WHERE
                is_deleted = 0
                AND department_id = ?
            LIMIT 1`,
            [departmentId]
        );

        return getFirstRowOrNull(rows);
    }

    // prettier-ignore
    /**
     * Returns total count of departments matching the name/code/room filters.
     *
     * @param code the department code.
     * @param name the department name.
     * @param room the department room.
     * @returns total matching rows.
     */
    async findCountByCodeAndNameAndRoom(
        code: StringUndefined,
        name: StringUndefined,
        room: StringUndefined
    ): Promise<number> {
        const [rows] = await this.pool.query<DepartmentCountRow[]>(
            `SELECT
                COUNT(*) AS total
            FROM
                department
            WHERE
                is_deleted = 0
                AND code LIKE ?
                AND name LIKE ?
                AND COALESCE(room, '') LIKE ?`,
            createDepartmentLikeParams([
                code,
                name,
                room
            ])
        );

        return sanitizeNumberValue(rows[0]?.total);
    }

    // prettier-ignore
    /**
     * Checks whether a non-deleted department row exists with the same value
     * for a whitelisted duplicate field.
     *
     * @param duplicateColumn the allowed department duplicate field to check.
     * @param value the value to check for duplicates.
     * @returns true if a duplicate exists; otherwise, false.
     */
    async existByFieldAndDepartmentIdNot(
        duplicateColumn: DepartmentDuplicateField,
        value: StringNullUndefined
    ) {
        return this.existsByFieldAndIdNot<DepartmentIdRow, DepartmentDuplicateField>(
            duplicateColumn,
            value,
            this.tableName,
            this.duplicateFieldColumns
        );
    }
}
