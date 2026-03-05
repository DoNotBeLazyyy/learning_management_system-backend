import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { DepartmentCreateRequestDto } from '../dto/department-create-request.dto';
import { DepartmentSearchRequestDto } from '../dto/department-search-request.dto';
import { DepartmentService } from '../service/department.service';

/**
 * Controller for department-related endpoints.
 *
 * Handles department create, list/search, and other department operations.
 */
@Controller('department')
export class DepartmentController {
    constructor(private readonly departmentService: DepartmentService) {}

    /**
     * Creates a new department after validating unique constraints.
     *
     * @param requestDto the create department request payload.
     * @returns the standard response containing a success message.
     */
    @Post()
    @ApiOperation({ summary: 'Create department' })
    async create(@Body() requestDto: DepartmentCreateRequestDto) {
        return await this.departmentService.create(requestDto);
    }

    /**
     * Returns a paginated department list using optional field-based search filters.
     * Supports pagination and multi-column sorting for frontend table components
     * such as AG Grid.
     *
     * @param requestDto the department search and pagination request payload.
     * @returns the standard response containing paginated department results.
     */
    @Post('list')
    @ApiOperation({ summary: 'Get pageable departments' })
    @HttpCode(HttpStatus.OK)
    getList(@Body() requestDto: DepartmentSearchRequestDto) {
        return this.departmentService.getList(requestDto);
    }
}
