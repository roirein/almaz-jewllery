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

// export default defineMessages({
//     greeting: {
//         id: 'helloWorld',
//         defaultMessage: 'hello world'
//     },
//     welcome: {
//         id: "welcome",
//         defaultMessage: "welcome"
//     }, 
//     username: {
//         id: 'username',
//         defaultMessage: 'username'
//     },
//     password: {
//         id: 'password',
//         defaultMessage: 'password'
//     },
//     entry: {
//         id: 'entry',
//         defaultMessage: 'enter'
//     },
//     emptyField: {
//         id: 'emptyField',
//         defaultMessage: 'field cannot be empty'
//     },
//     invalidLogin: {
//         id: 'invalidLogin',
//         defaultMessage: 'username or password are incorrect'
//     },
//     ordersManagement: {
//         id: 'ordersManagement',
//         defaultMessage: 'orders management'
//     },
//     customers: {
//         id: 'customers',
//         defaultMessage: 'customers'
//     },
//     employess: {
//         id: 'employees',
//         defaultMessage: 'employess'
//     },
//     stock: {
//         id: 'stock',
//         defaultMessage: 'stock'
//     },
//     reportsCreation: {
//         id: 'reportsCreation',
//         defaultMessage: 'reports creation'
//     },
//     settings: {
//         id: 'settings',
//         defaultMessage: 'settings'
//     },
//     createNewOrder: {
//         id: 'createNewOrder',
//         defaultMessage: 'Create New Order'
//     },
//     newModel: {
//         id: 'newModel',
//         defaultMessage: 'New Model',
//     },
//     existingModel: {
//         id: 'existingModel',
//         defaultMessage: 'Existing Model'
//     },
//     fix: {
//         id: 'fix',
//         defaultMessage: 'Fix'
//     },
//     customerName: {
//         id: 'customerName',
//         defaultMessage: 'Customer Name'
//     },
//     item: {
//         id: 'item',
//         defaultMessage: 'item'
//     },
//     metal: {
//         id: 'metal',
//         defaultMessage: 'metal'
//     },
//     size: {
//         id: 'size',
//         defaultMessage: 'size'
//     },
//     setting: {
//         id: 'setting',
//         defaultMessage: 'setting'
//     },
//     sideStoneSize: {
//         id: 'sideStoneSize',
//         defaultMessage: 'Side Stone Size'
//     },
//     mainStoneSize: {
//         id: 'mainStoneSize',
//         defaultMessage: 'Main Stone Size'
//     },
//     coomments: {
//         id: 'comments',
//         defaultMessage: 'comments'
//     },
//     deadline: {
//         id: 'deadline',
//         defaultMessage: 'deadline'
//     },
//     image: {
//         id: 'image',
//         defaultMessage: 'image'
//     },
//     ring: {
//         id: 'ring',
//         defaultMessage: 'ring'
//     },
//     earrings: {
//         id: 'earrings',
//         defaultMessage: 'earrings'
//     },
//     pendant: {
//         id: 'pendant',
//         defaultMessage: 'pendant'
//     },
//     bracelet: {
//         id: 'bracelet',
//         defaultMessage: 'bracelet'
//     },
//     finger: {
//         id: 'finger',
//         defaultMessage: 'finger'
//     },
//     hand: {
//         id: 'hand',
//         defaultMessage: 'hand'
//     },
//     neck: {
//         id: 'neck',
//         defaultMessage: 'neck'
//     }, 
//     yellow: {
//         id: 'yellow',
//         defaultMessage: 'yellow'
//     },
//     white: {
//         id: 'white',
//         defaultMessage: 'white'
//     },
//     rose: {
//         id: 'rose',
//         defaultMessage: 'rose'
//     },
//     platinum: {
//         id: 'platinum',
//         defaultMessage: 'platinum'
//     },
//     isCastingRequired: {
//         id: 'isCastingRequired',
//         defaultMessage: 'Is Casting Required?'
//     }, 
//     cancel: {
//         id: 'cancel',
//         defaultMessage: 'cancel'
//     },
//     send: {
//         id: 'send',
//         defaultMessage: 'send'
//     },
//     newOrderSuccess: {
//         id: 'newOrderSuccess',
//         defaultMessage: 'Order Created Successfully'
//     },
//     models: {
//         id: 'models',
//         defaultMessage: 'models'
//     },
//     newOrderMessage: {
//         id: 'newOrderMessage',
//         defaultMessage: 'You received new order'
//     },
//     seeMore: {
//         id: 'seeMore',
//         defaultMessage: 'see more'
//     },
//     status: {
//         id: 'status',
//         defaultMessage: 'status'
//     }, 
//     created: {
//         id: 'created',
//         defaultMessage: 'created'
//     },
//     inProgress: {
//         id: 'inProgress',
//         defaultMessage: 'In progress'
//     },
//     managerReview: {
//         id: 'managerReview', 
//         defaultMessage: 'Manager Review'
//     },
//     approved: {
//         id: 'approved',
//         defaultMessage: 'Approved'
//     },
//     completed: {
//         id: 'completed',
//         defaultMessage: 'Completed'
//     },
//     modelNumber: {
//         id: 'modelNumber',
//         defaultMessage: 'model number'
//     },
//     createNewModel: {
//         id: 'createNewModel',
//         defaultMessage: 'Create New Model'
//     },
//     description: {
//         id: 'description',
//         defaultMessage: 'description'
//     },
//     confirm: {
//         id: 'confirm',
//         defaultMessage: 'confirm'
//     },
//     reject: {
//         id: 'reject',
//         defaultMessage: 'reject'
//     },
//     modelComments: {
//         id: 'modelComments',
//         defaultMessage: 'Model Comments'
//     },
//     needs_work: {
//         id: 'needs_work',
//         defaultMessage: 'not Approved'
//     },
//     updated: {
//         id: 'updated',
//         defaultMessage: 'updated'
//     }
// })