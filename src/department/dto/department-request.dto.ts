import { IsBoolean, IsEmail, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class DepartmentRequestDto {
    /** Department ID (used only in some request contexts, not for create). */
    @IsOptional()
    @IsInt()
    @Min(1)
        department_id?: number;

    /** Department code (must be unique). */
    @IsString()
    @MaxLength(50)
        code!: string;

    /** Department name (display name). */
    @IsString()
    @MaxLength(150)
        name!: string;

    /** Assigned room/office of the department. */
    @IsOptional()
    @IsString()
    @MaxLength(100)
        room?: string;

    /** Department email address. */
    @IsOptional()
    @IsEmail()
    @MaxLength(255)
        email?: string;

    /** Department contact number. */
    @IsOptional()
    @IsString()
    @MaxLength(30)
        phone?: string;

    /** Optional department description/notes. */
    @IsOptional()
    @IsString()
    @MaxLength(500)
        description?: string;

    /** Active flag (true = active, false = inactive). */
    @IsOptional()
    @IsBoolean()
        is_active?: boolean;

    /** Soft delete flag (excluded in normal create/update flows). */
    @IsOptional()
    @IsBoolean()
        is_deleted?: boolean;
}