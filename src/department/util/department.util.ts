import { StringNullUndefined } from 'src/core/common/dto/common.dto';
import { sanitizeStringValue } from 'src/core/common/util/clean.util';

// prettier-ignore
/**
 * Transforms an array of strings into SQL LIKE parameters.
 * Each value is trimmed, sanitized, and wrapped in percentage signs.
 *
 * @param values  the raw string values to be transformed.
 * @returns an array of sanitized LIKE strings.
 */
export function createDepartmentLikeParams(values: StringNullUndefined[]): string[] {
    return values.map((value) => (
        `%${sanitizeStringValue(value?.trim())}%`
    ));
}
