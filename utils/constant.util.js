const CODE = {
  'validation': '001',
}

const MESSAGE = {
  'ONLY_EMPLOYEE': 'only employee can perform this action',
  'ONLY_EMPLOYER': 'only employer can perform this action',
  'NOT_OWNER': 'you do not own the document',
  'NOT_REGISTERED': 'user not registered',
  'PASSWORD_FAIL': 'password does not match',
  'HEADER_MISSING': 'authorization header missing',
  'HEADER_EMPTY': 'authorization is empty',
  'NOT_FOUND': 'document not found'
}

module.exports = { CODE, MESSAGE }