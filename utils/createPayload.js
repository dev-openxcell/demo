exports.generateUserPayload = (data) => {
  return {
    userType: data.userType,
    name: data.name,
    email: data.email,
    id: data._id
  }
}