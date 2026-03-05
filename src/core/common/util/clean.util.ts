// prettier-ignore
import { NumberNull, NumberNullUndefined, StringNull, StringNullUndefined } from '../dto/common.dto';

/**
 * Returns the first row in the array, or null if the array is empty.
 *
 * @param rows the result rows array.
 * @return the first row, or null when no rows exist.
 */
export function getFirstRowOrNull<T>(rows: T[]): T | null {
    return rows[0] ?? null;
}

/**
 * Trims a string value and converts null/undefined to an empty string.
 *
 * @param value the string value to clean.
 * @return the cleaned string.
 */
export function sanitizeStringValue(value: StringNullUndefined): string {
    return value ?? '';
}

/**
 * Normalizes a value to a number.
 * Defaults to a specified fallback if the input is null, undefined, or not a number.
 *
 * @param value the raw input to be normalized.
 * @param fallback the default value if the input is nullish.
 * @returns a number.
 */
export function sanitizeNumberValue(value: NumberNullUndefined): number {
    return typeof value === 'number' && !Number.isNaN(value)
        ? Number(value)
        : 0;
}

/**
 * Normalizes a nullable string value by converting undefined to null.
 * Useful for preparing optional string fields for database inserts/updates.
 *
 * @param value the string value to normalize.
 * @returns the original string, or null if the value is null or undefined.
 */
export function stringOrNull(value: StringNullUndefined): StringNull {
    return value ?? null;
}

/**
 * Normalizes a nullable number value by converting undefined to null.
 *
 * Useful for preparing optional numeric fields for database inserts/updates.
 *
 * @param number the numeric value to normalize.
 * @returns the original number, or null if the value is null or undefined.
 */
export function numberOrNull(number: NumberNullUndefined): NumberNull {
    return number ?? null;
}
