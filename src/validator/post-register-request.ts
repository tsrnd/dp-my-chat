import { ErrorsMessage } from '../utils/validator';
export const PostRegisterRequest = {
    required: ['username', 'nickname', 'password'],
    properties: {
        username: {
                'minLength': 4,
                'maxLength': 16,
                'pattern': '^[a-z]+$',
                errorMessage: {
                    minLength: ErrorsMessage.minLength('Username', 4),
                    maxLength: ErrorsMessage.maxLength('Username', 16),
                    pattern: 'Username must contains only lowercase alphabet'
                }
        },
        nickname: {
            'minLength': 4,
            'maxLength': 32,
            'pattern': '^[a-zA-Z ]+$',
            errorMessage: {
                minLength: ErrorsMessage.minLength('Nickname', 4),
                maxLength: ErrorsMessage.maxLength('Nickname', 32),
                pattern: 'Nickname must contains only alphabet'
            }
        },
        password: {
            'minLength': 6,
            'maxLength': 16,
            errorMessage: {
                minLength: ErrorsMessage.minLength('Password', 6),
                maxLength: ErrorsMessage.maxLength('Password', 16),
            }
        }
    },
    errorMessage: {
        required: {
            username: ErrorsMessage.required('Username'),
            nickname: ErrorsMessage.required('Nickname'),
            password: ErrorsMessage.required('Password'),
        }
    }
};
