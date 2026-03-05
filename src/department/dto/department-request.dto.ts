import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// prettier-ignore
import { IsBoolean, IsEmail, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

/**
 * Base DTO for department request payloads.
 *
 * Contains common department fields shared by create, update, and search request DTOs.
 */
export class DepartmentRequestDto {
    @ApiPropertyOptional({
        description: 'Department ID (used only in some request contexts).'
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    department_id?: number;

    @ApiProperty({
        description: 'Unique department code',
        example: 'CCS',
        maxLength: 50
    })
    @IsString()
    @MaxLength(50)
    code!: string;

    @ApiProperty({
        description: 'Department name',
        example: 'College of Computer Studies',
        maxLength: 150
    })
    @IsString()
    @MaxLength(150)
    name!: string;

    @ApiPropertyOptional({
        description: 'Department room/office',
        example: 'Room 301',
        maxLength: 100
    })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    room?: string;

    @ApiPropertyOptional({
        description: 'Department email',
        example: 'ccs@school.edu',
        maxLength: 255
    })
    @IsOptional()
    @IsEmail()
    @MaxLength(255)
    email?: string;

    @ApiPropertyOptional({
        description: 'Department phone',
        example: '09123456789',
        maxLength: 30
    })
    @IsOptional()
    @IsString()
    @MaxLength(30)
    phone?: string;

    @ApiPropertyOptional({
        description: 'Department description',
        example: 'Handles computing-related programs',
        maxLength: 500
    })
    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;

    @ApiPropertyOptional({ description: 'Active flag', example: true })
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

    @ApiPropertyOptional({
        description: 'Soft delete flag (not used in normal create)',
        example: false
    })
    @IsOptional()
    @IsBoolean()
    is_deleted?: boolean;
}
