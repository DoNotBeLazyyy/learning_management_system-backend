import { ConflictException, Injectable } from '@nestjs/common';
import { StringNullUndefined } from 'src/core/common/dto/common.dto';
import { DepartmentCreateRequestDto } from '../dto/department-create-request.dto';
// prettier-ignore
import { DepartmentDuplicateField, PageableDepartmentDto } from '../dto/department-repository.dto';
import { DepartmentSearchRequestDto } from '../dto/department-search-request.dto';
// prettier-ignore
import { DepartmentRepository } from '../repository/department.repository';

interface UniqueColumnParams {
    // Column name
    name: DepartmentDuplicateField;

    // Column value
    value: StringNullUndefined;
}

/**
 * Department service.
 * Handles business logic and validation for department operations.
 */
@Injectable()
export class DepartmentService {
    constructor(private readonly departmentRepository: DepartmentRepository) {}

    // prettier-ignore
    /**
     * Creates a new department after validating unique constraints.
     *
     * @param requestDto the create department request payload.
     * @return the standard response containing a success message.
     * @throws ConflictException when code, name, email, or phone already exists.
     * @throws Error when the insert operation fails.
     */
    async create(requestDto: DepartmentCreateRequestDto): Promise<string> {
        const {code, name, email, phone} = requestDto;
        const uniqueColumns: UniqueColumnParams[] = [
            {name: 'code', value: code},
            {name: 'name', value: name},
            {name: 'email', value: email},
            {name: 'phone', value: phone}
        ];

        await this.validateFieldUniqueness(uniqueColumns);

        if (await this.departmentRepository.create(requestDto)) {
            return 'Department created successfully.';
        } else {
            throw new Error('Failed to create department.');
        }
    }

    // prettier-ignore
    /**
     * Returns the department list using optional field-based search filters.
     *
     * @param requestDto the department search request payload.
     * @return the standard response containing the department list.
     */
    async getList(requestDto: DepartmentSearchRequestDto): Promise<PageableDepartmentDto> {
        return await this.departmentRepository.findList(requestDto);
    }

    // prettier-ignore
    /**
     * Validates department unique fields before create/update operations.
     * Iterates through the provided field-value pairs and checks whether a
     * non-deleted department already exists with the same value.
     *
     * @param uniqueColumns department fields and values to validate for uniqueness.
     * @throws ConflictException when any duplicate value is found.
     */
    private async validateFieldUniqueness(uniqueColumns: UniqueColumnParams[]) {
        for (const {name, value} of uniqueColumns) {
            if (await this.departmentRepository.existByFieldAndDepartmentIdNot(name, value)) {
                throw new ConflictException(`Department ${name} already exists.`);
            }
        }
    }
}
