const CODE = {
  'validation': '001',
}

const OPEN_URLS = [
  '/register',
  '/login'
]

const MODELS = {
  USER: 'User',
  JOB: 'Job',
  APPLICATION: 'Application',
}

const ENUMS = {
  EMPLOYER: 'EMPLOYER',
  EMPLOYEE: 'EMPLOYEE',
  MONTHLY: 'MONTHLY',
  HOURLY: 'HOURLY',
}

const ENUMS_ARR = {
  USER_TYPE: [ENUMS.EMPLOYEE, ENUMS.EMPLOYER],
  PAYMENT_TYPE: [ENUMS.HOURLY, ENUMS.MONTHLY],
}

const MESSAGE = {
  'ONLY_EMPLOYEE': 'only employee can perform this action',
  'ONLY_EMPLOYER': 'only employer can perform this action',
  'NOT_OWNER': 'you do not own the document',
  'NOT_REGISTERED': 'user not registered',
  'PASSWORD_FAIL': 'password does not match',
  'HEADER_MISSING': 'authorization header missing',
  'HEADER_EMPTY': 'authorization is empty',
  'NOT_FOUND': 'document not found',
  'FILE_ERROR': 'only files with extension .pdf and .doc are allowed',
  'FILE_NOT_FOUND': 'file not uploaded'
}

const ERROR_NAME = {
  TOKEN_INVALID: '',
  TOKEN_EXPIRED: ''
}

const ALLOWED_EXTENSION = ["application/msword", "application/pdf"]

module.exports = { CODE, MESSAGE, ENUMS, ENUMS_ARR, MODELS, OPEN_URLS, ERROR_NAME, ALLOWED_EXTENSION }