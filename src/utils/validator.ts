import * as Ajv from 'ajv';
const ajv = new Ajv({allErrors: true, jsonPointers: true});
require('ajv-errors')(ajv);

export const Validator = {
    ajv: ajv,
    getErrors: function(data: Array<any>) {
        let errors: Array<String> = [];
        data.forEach(function(item) {
            errors.push(item.message);
        });
        return errors;
    }
};

export const ErrorsMessage = {
    required: function(field) {
        return `${field} must be required`;
    },
    minLength: function(field: String, value: Number) {
        return `${field} should NOT be shorter than ${value} characters`;
    },
    maxLength: function(field: String, value: Number) {
        return `${field} should NOT be longer than ${value} characters`;
    }
};
