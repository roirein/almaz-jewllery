import {defineMessages} from 'react-intl';

export const homePageMessages = defineMessages({
    welcome: {
        id: 'welcome',
        defaultMessage: 'welcome'
    },
    email: {
        id: "email",
        defaultMessage: "email",
    },
    password: {
        id: "password",
        defaultMessage: "password"
    }, 
    entry: {
        id: "entry",
        defaultMessage: "enter"
    },
    login: {
        id: "login",
        defaultMessage: "login"
    },
    clickForSignUp: {
        id: 'clickForSignUp',
        defaultMessage: 'click here to move for sigining up'
    },
    loginError: {
        id: 'loginError',
        defaultMessage: 'email or password are incorrent'
    },
    emptyFieldError: {
        id: 'emptyFieldError',
        default: 'field cannot be empty'
    },
    emailError: {
        id: 'emailError',
        defaultValue: 'Invalid email address'
    },
    registration: {
        id: 'registration',
        defaultMessage: 'registeration'
    },
    firstName: {
        id: 'firstName',
        defaultMessage: 'First Name'
    },
    lastName: {
        id: 'lastName',
        defaultMessage: 'Last Name'
    }, 
    businessName: {
        id: 'businessName',
        defaultMessage: 'businessName'
    },
    phoneNumber: {
        id: 'phoneNumber',
        defaultMessage: 'Phone Number'
    },
    additionalPhoneNumber: {
        id: 'additionalPhoneNumber',
        defaultMessage: 'Additional Phone Number(Optional)'
    },
    verifyPassword: {
        id: 'verifyPassword',
        defaultMessage: 'Repeat Password'
    },
    toRegister: {
        id: 'toRegister',
        defaultMessage: 'click here to move to login'
    },
    phoneError: {
        id: 'phoneError',
        defaultMessage: 'Invalid phone number'
    },
    passwordLengthError: {
        id: 'passwordLengthError',
        defaultMessage: 'Password must be atleast 8 character'
    },
    passwordPatternError: {
        id: 'passwordPatternError',
        defaultMessage: 'Password must include Upper and lower case, numbers and special character'
    },
    verifyPasswordError: {
        id: 'verifyPasswordError',
        defaultMessage: 'Password not equal to password field'
    },
    register: {
        id: 'register',
        defaultMessage: 'register'
    },
    userExistError: {
        id: 'userExistError',
        defaultMessage: 'User with one of those email, phone number or business name already exists'
    },
    thankForRegister: {
        id: 'thankForRegister',
        defaultMessage: 'Thank you for your registration'
    },
    postRegisterMessage: {
        id: 'postRegisterMessage',
        defaultMessage: 'Your details will be reviewd by manager and once it approved you"ll be updated by mail'
    },
    customerLoginError: {
        id: 'customerLoginError',
        defaultMessage: 'You must wait for manager approval before you"ll be able to login'
    },
    forgotPassword: {
        id: 'forgotPassword',
        defaultMessage: 'Forgot Password'
    },
    resetPassword: {
        id: 'resetPassword',
        defaultMessage: 'Reset Password'
    },
    sendCode: {
        id: 'sendCode',
        defaultMessage: 'Send Code'
    },
    emailNotExistError: {
        id: 'emailNotExistError',
        defaultMessage: 'the email is not exist'
    },
    codeSent: {
        id: 'codeSent',
        defaultMessage: 'a code sent to your email and it will be valid for 5 minutes'
    },
    requireChangePassword: {
        id: 'requireChangePassword',
        defaultMessage: 'you must change your password before you wiil be able to login'
    }, 
    code: {
        id: 'code',
        defaultMessage: 'code'
    },
    dontHaveCode: {
        id: 'dontHaveCode',
        defaultMessage: 'Dont have code, send again'
    },
    changePassword: {
        id: 'changePassword',
        defaultMessage: 'change password'
    },
    codeError: {
        id: 'codeError',
        defaultMessage: 'The code you enter is incorrect'
    },
    codeExpired: {
        id: 'codeExpired',
        defaultMessage: 'The code expired'
    },
    passwordChanged: {
        id: 'passwordChanged',
        defaultMessage: 'password changed successfully'
    },
    toLogin: {
        id: 'toLogin',
        defaultMessage: 'to login'
    },
})


export const headerMessages = defineMessages({
    orders: {
        id: 'orders',
        defaultMessage: 'orders'
    },
    customers: {
        id: 'customers',
        defaultMessage: 'customers'
    },
    employees: {
        id: 'employees',
        defaultMessage: 'employees'
    },
    stock: {
        id: 'stock',
        defaultMessage: 'stock'
    },
    reports: {
        id: 'reports',
        defaultMessage: 'reports'
    },
    settings: {
        id: 'settings',
        defaultMessage: 'settings'
    },
    models: {
        id: 'models',
        defaultMessage: 'models'
    },
    logout: {
        id: 'logout',
        defaultMessage: 'Logout'
    }
})

export const notificationMessages = defineMessages({
    newCustomerNotification: {
        id: 'newCustomerNotification',
        defaultMessage: 'new customer requested to join the system'
    },
    newCustomerNotificationMessage: {
        id: 'newCustomerNotificationMessage',
        defaultMessage: 'new customer called {name} requested to join the system , click here for details'
    }
})

export const tableColumnsMessages = defineMessages({
    email: {
        id: 'email',
        defaultMessage: 'email'
    },
    status: {
        id: 'status',
        defaultMessage: 'status'
    },
    customerName: {
        id: 'customerName',
        defaultMessage: 'customerName'
    },
    rejected: {
        id: 'rejected',
        defaultMessage: 'rejected'
    }, 
    approved: {
        id: 'approved',
        defaultMessage: 'approved'
    },
    pending: {
        id: 'pending',
        defaultMessage: 'pending'
    },
    seeMore: {
        id: 'seeMore',
        defaultMessage: 'see more'
    },
})


export const customerPageMessages = defineMessages({
    newRequestFrom: {
        id: 'newRequestFrom',
        defaultMessage: 'new join request from {name}'
    },
    customerName: {
        id: 'customerName',
        defaultMessage: 'customerName'
    },
    contactDetails: {
        id: 'contactDetails',
        defaultMessage: 'contact details'
    },
    phoneNumber: {
        id: 'phoneNumber',
        defaultMessage: 'phone number'
    },
    businessPhone: {
        id: 'businessPhone',
        defaultMessage: 'business phone'
    },
    email: {
        id: 'email',
        defaultMessage: 'email'
    },
    businessName: {
        id: 'businessName',
        defaultMessage: 'business name'
    }
})
