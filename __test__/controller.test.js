const request = require('supertest')
const { app } = require('../server')
const { clearDb } = require('../utils/clearDb.util')

const PassingEmployerRegister = {
  "email": "devdutt.chudasama@openxcell.com",
  "password": "devdutt",
  "name": "Devduttsinh Chudasama",
  "userType": "EMPLOYER",
  "contactNumber": "7698559806",
  "contactEmail": "devdutt@email.com"
}
const PassingEmployeeRegister = {
  "email": "devdut.chudasama@openxcell.com",
  "password": "devdutt",
  "name": "Devduttsinh Chudasama",
  "userType": "EMPLOYEE",
  "contactNumber": "7698559806",
  "contactEmail": "devdutt@email.com"
}
const FailingCases = [
  {
    "email": "devdutt.chudasama@",
    "password": "devdutt",
    "name": "Devduttsinh Chudasama",
    "userType": "EMPLOYER",
    "contactNumber": "7698559806",
    "contactEmail": "devdutt@email.com"
  },
  {
    "email": "devdutt.chudasama@openxcell.com",
    "password": "de",
    "name": "Devduttsinh Chudasama",
    "userType": "EMPLOYER",
    "contactNumber": "7698559806",
    "contactEmail": "devdutt@email.com"
  },
  {
    "email": "devdutt.chudasama@openxcell.com",
    "password": "devdutt",
    "name": "Devduttsinh Chudasama",
    "userType": "EMPLOYERE",
    "contactNumber": "7698559806",
    "contactEmail": "devdutt@email.com"
  },
  {
    "email": "devdutt.chudasama@openxcell.com",
    "password": "devdutt",
    "name": "Devduttsinh Chudasama",
    "userType": "EMPLOYER",
    "contactNumber": "769855980612",
    "contactEmail": "devdutt@email.com"
  },
  {
    "email": "devdutt.chudasama@openxcell.com",
    "password": "devdutt",
    "name": "Devduttsinh Chudasama",
    "userType": "EMPLOYER",
    "contactNumber": "7698559806",
    "contactEmail": "devdutt"
  },
  {
    "password": "devdutt",
    "name": "Devduttsinh Chudasama",
    "userType": "EMPLOYER",
    "contactNumber": "7698559806",
    "contactEmail": "devdutt@email.com"
  },
  {
    "email": "devdutt.chudasama@openxcell.com",
    "name": "Devduttsinh Chudasama",
    "userType": "EMPLOYER",
    "contactNumber": "7698559806",
    "contactEmail": "devdutt@email.com"
  },
  {
    "email": "devdutt.chudasama@openxcell.com",
    "password": "devdutt",
    "name": "Devduttsinh Chudasama",
    "contactNumber": "7698559806",
    "contactEmail": "devdutt@email.com"
  },
  {}
]

const PassingLogin = {
  "email": "devdutt.chudasama@openxcell.com",
  "password": "devdutt"
}
const Passing2Login = {
  "email": "devdut.chudasama@openxcell.com",
  "password": "devdutt"
}
const Failure404Login = {
  "email": "devdutt.chuma@openxcell.com",
  "password": "devdutt"
}
const Failure401Login = {
  "email": "devdutt.chudasama@openxcell.com",
  "password": "devdtt"
}
const Failure400Login = [
  {
    "email": "devduttnxcell.com",
    "password": "devdutt"
  },
  {
    "email": "devdutt.chudasama@openxcell.com",
    "password": ""
  },
  {
    "email": "",
    "password": "devdutt"
  },
  {
    "email": "devdutt.chudasama@openxcell.com",
    "password": "de"
  }
]

const ProfilePassing = [
  {
    "name": "Devdutt chuadasma",
    "contactNumber": "7698559806",
    "contactEmail": "devdutt@mail.com",
  },
  {
    "name": "Devdutt chuadasma",
    "contactEmail": "devdutt@mail.com",
  },
  {
    "name": "Devdutt chuadasma",
    "contactNumber": "7698559806",
  },
  {
    "name": "Devdutt chuadasma",
  },
]

let employertoken;
let employeetoken;
const PassingJob = [
  {
    "minimumExperience": 1,
    "jobTitle": "enginner",
    "jobDescrpition": "critical thinker who can think of creative solutions",
    "isCommitmentRequired": true,
    "minimumJobCommitment": 1,
    "paymentType": "HOURLY",
    "salary": 20000
  },
  {
    "minimumExperience": 1,
    "jobTitle": "enginner",
    "jobDescrpition": "critical thinker who can think of creative solutions",
    "isCommitmentRequired": false,
    "paymentType": "HOURLY",
    "salary": 20000
  }
]
const FailingJob = [
  {
    "minimumExperience": "as",
    "jobTitle": "enginner",
    "jobDescrpition": "critical thinker who can think of creative solutions",
    "isCommitmentRequired": true,
    "minimumJobCommitment": 1,
    "paymentType": "HOURLY",
    "salary": 20000
  },
  {
    "jobTitle": "enginner",
    "jobDescrpition": "critical thinker who can think of creative solutions",
    "isCommitmentRequired": true,
    "minimumJobCommitment": 1,
    "paymentType": "HOURLY",
    "salary": 20000
  },
  {
    "minimumExperience": 1,
    "jobTitle": 12,
    "jobDescrpition": "critical thinker who can think of creative solutions",
    "isCommitmentRequired": true,
    "minimumJobCommitment": 1,
    "paymentType": "HOURLY",
    "salary": 20000
  },
  {
    "minimumExperience": 1,
    "jobDescrpition": "critical thinker who can think of creative solutions",
    "isCommitmentRequired": true,
    "minimumJobCommitment": 1,
    "paymentType": "HOURLY",
    "salary": 20000
  },
  {
    "minimumExperience": 1,
    "jobTitle": "enginner",
    "jobDescrpition": "crit",
    "isCommitmentRequired": true,
    "minimumJobCommitment": 1,
    "paymentType": "HOURLY",
    "salary": 20000
  },
  {
    "minimumExperience": 1,
    "jobTitle": "enginner",
    "isCommitmentRequired": true,
    "minimumJobCommitment": 1,
    "paymentType": "HOURLY",
    "salary": 20000
  },
  {
    "minimumExperience": 1,
    "jobTitle": "enginner",
    "jobDescrpition": "critical thinker who can think of creative solutions",
    "isCommitmentRequired": "Y",
    "minimumJobCommitment": 1,
    "paymentType": "HOURLY",
    "salary": 20000
  },
  {
    "minimumExperience": 1,
    "jobTitle": "enginner",
    "jobDescrpition": "critical thinker who can think of creative solutions",
    "minimumJobCommitment": 1,
    "paymentType": "HOURLY",
    "salary": 20000
  },
  {
    "minimumExperience": 1,
    "jobTitle": "enginner",
    "jobDescrpition": "critical thinker who can think of creative solutions",
    "isCommitmentRequired": true,
    "paymentType": "HOURLY",
    "salary": 20000
  },
  {
    "minimumExperience": 1,
    "jobTitle": "enginner",
    "jobDescrpition": "critical thinker who can think of creative solutions",
    "isCommitmentRequired": false,
    "paymentType": "HOURLYE",
    "salary": 20000
  },
  {
    "minimumExperience": 1,
    "jobTitle": "enginner",
    "jobDescrpition": "critical thinker who can think of creative solutions",
    "isCommitmentRequired": true,
    "minimumJobCommitment": 1,
    "salary": 20000
  },
  {
    "minimumExperience": 1,
    "jobTitle": "enginner",
    "jobDescrpition": "critical thinker who can think of creative solutions",
    "isCommitmentRequired": true,
    "minimumJobCommitment": 1,
    "paymentType": "HOURLY",
    "salary": "asd"
  },
  {
    "minimumExperience": 1,
    "jobTitle": "enginner",
    "jobDescrpition": "critical thinker who can think of creative solutions",
    "isCommitmentRequired": true,
    "minimumJobCommitment": 1,
    "paymentType": "HOURLY",
  },
  {}
]
let jobId;

let applicationId;
const PassingApplication = {
  "totalExperience": 2,
  "pastExperiences": [
    {
      "role": "developer",
      "descripion": "develop websites according to requirmnets",
      "duration": 1.2
    },
    {
      "role": "engineer",
      "descripion": "find better solutions to problems"
    }
  ],
  "linkToResume": "https://somedomain.com/aasdasd/png.jpeg"
}
const FailingApplications = [
  {
    "pastExperiences": [
      {
        "role": "developer",
        "descripion": "develop websites according to requirmnets",
        "duration": 1.2
      },
      {
        "role": "engineer",
        "descripion": "find better solutions to problems"
      }
    ],
    "linkToResume": "https://somedomain.com/aasdasd/png.jpeg"
  },
  {
    "totalExperience": "qw",
    "pastExperiences": [
      {
        "role": "developer",
        "descripion": "develop websites according to requirmnets",
        "duration": 1.2
      },
      {
        "role": "engineer",
        "descripion": "find better solutions to problems"
      }
    ],
    "linkToResume": "https://somedomain.com/aasdasd/png.jpeg"
  },
  {
    "totalExperience": 2,
    "pastExperiences": [
      {
        "role": "developer",
        "descripion": "develop websites according to requirmnets",
        "duration": "as"
      }
    ],
    "linkToResume": "https://somedomain.com/aasdasd/png.jpeg"
  },
  {
    "totalExperience": 2,
    "pastExperiences": [
      {
        "role": "developer",
        "descripion": "dev",
        "duration": 1.2
      }
    ],
    "linkToResume": "https://somedomain.com/aasdasd/png.jpeg"
  },
  {
    "totalExperience": 2,
    "pastExperiences": [
      {
        "descripion": "develop websites according to requirmnets"
      },
    ],
    "linkToResume": "https://somedomain.com/aasdasd/png.jpeg"
  },
  {
    "totalExperience": 2,
    "pastExperiences": [
      {
        "role": "developer",
        "duration": 1.2
      },
      {
        "role": "engineer",
        "descripion": "find better solutions to problems"
      }
    ],
    "linkToResume": "https://somedomain.com/aasdasd/png.jpeg"
  },
]

describe('POST /register', () => { 
  describe('passing cases', () => { 
    // user will be registered and api will return 201 code
    test('should return 200 status code', async () => { 
      const responce = await request(app).post('/api/register').send(PassingEmployerRegister)
      const responc = await request(app).post('/api/register').send(PassingEmployeeRegister)
      expect(responce.statusCode).toBe(201)
      expect(responc.statusCode).toBe(201)
    })
  })

  describe('failing cases', () => {
    for(const fb of FailingCases){
      test('should return 400 status code', async () => {
        let responce = await request(app).post('/api/register').send(fb)
        expect(responce.statusCode).toBe(400)
      })
    }
  })
})

describe('POST /login', () => { 
  describe('given the true creds it', () => { 
    
    test('should return 200 status code', async () => { 
      const responce = await request(app).post('/api/login').send(PassingLogin)
      expect(responce.statusCode).toBe(200)
      const responc = await request(app).post('/api/login').send(Passing2Login)
      expect(responce.statusCode).toBe(200)
      expect(responc.statusCode).toBe(200)
    })

    test('should return token in body', async () => { 
      const responce = await request(app).post('/api/login').send(PassingLogin)
      expect(responce.body?.token).toBeDefined()
      employertoken = responce.body?.token
      const responc = await request(app).post('/api/login').send(Passing2Login)
      expect(responc.body?.token).toBeDefined()
      employeetoken = responc.body?.token
    })
  })

  describe('given bad login cases', () => { 
    test('should return 404 for unregistered user', async () => { 
      const responce = await request(app).post('/api/login').send(Failure404Login)
      expect(responce.statusCode).toBe(404)
    })

    for(const fb of Failure400Login){
      test('should return 400 for bad body', async () => { 
        const responce = await request(app).post('/api/login').send(fb)
        expect(responce.statusCode).toBe(400)
      })
    }

    

    test('should return 401 for passwordnot match', async () => { 
      const responce = await request(app).post('/api/login').send(Failure401Login)
      expect(responce.statusCode).toBe(401)
    })
  })
})

describe('GET /profile', () => {
  describe('successfull profile', () => { 

    test('should return 200 status code', async () => { 
      const responce = await request(app).get('/api/profile').set("authorization", `bearer ${employertoken}`)
      expect(responce.statusCode).toBe(200)
    })
    test('should have user body', async () => { 
      const responce = await request(app).get('/api/profile').set({ "authorization": `bearer ${employertoken}`})
      expect(responce.body).toBeDefined()
      expect(responce.body.user).toBeDefined()
      expect(responce.body.user._id).toBeDefined()
    })
  })

  describe('failing profile cases', () => { 
    test('should return with status 401 missing header', async () => { 
      const responce = await request(app).get('/api/profile')
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 missing token', async () => { 
      const responce = await request(app).get('/api/profile').set({ "authorization": `bearer`})
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 invalid token', async () => { 
      const responce = await request(app).get('/api/profile').set({ "authorization": `bearer ${employertoken}werw`})
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 expired token', async () => { 
      const responce = await request(app).get('/api/profile').set({ "authorization": `bearer eyJ1c2VyVHlwZSI6IkVNUExPWUVSIiwibmFtZSI6IkRldmR1dHRzaW5oIENodWRhc2FtYSIsImVtYWlsIjoiZGV2ZHV0dC5jaHVkYXNhbWFAb3BlbnhjZWxsLmNvbSIsImlkIjoiNjQ3ZjEyM2M4MWZiOGQ4NzA3OGMwODQ1IiwiaWF0IjoxNjg2MDU1Njc5LCJleHAiOjE2ODYwNTYwMzl9.8Np_mpxxIMX7lZK4Xegx1xtYQncFY48IQXKOqHm0Rpk`})
      expect(responce.statusCode).toBe(401)
    })
  })
})

describe('PUT /profile', () => {

  describe('successfull profile', () => { 
    for(const fb of ProfilePassing){
      test('should return 200 status code', async () => { 
        const responce = await request(app).put('/api/profile').set("authorization", `bearer ${employertoken}`).send(fb)
        expect(responce.statusCode).toBe(200)
      })
    }
  })

  describe('failing profile cases', () => { 
    test('should return with status 401 missing header', async () => { 
      const responce = await request(app).put('/api/profile').send(ProfilePassing[0])
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 400', async () => { 
      const responce = await request(app).put('/api/profile').set({ "authorization": `bearer ${employertoken}`}).send({})
      expect(responce.statusCode).toBe(400)
    })
    test('should return with status 401 missing token', async () => { 
      const responce = await request(app).put('/api/profile').set({ "authorization": `bearer`}).send(ProfilePassing[0])
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 invalid token', async () => { 
      const responce = await request(app).put('/api/profile').set({ "authorization": `bearer ${employertoken}werw`}).send(ProfilePassing[0])
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 expired token', async () => { 
      const responce = await request(app).put('/api/profile').set({ "authorization": `bearer eyJ1c2VyVHlwZSI6IkVNUExPWUVSIiwibmFtZSI6IkRldmR1dHRzaW5oIENodWRhc2FtYSIsImVtYWlsIjoiZGV2ZHV0dC5jaHVkYXNhbWFAb3BlbnhjZWxsLmNvbSIsImlkIjoiNjQ3ZjEyM2M4MWZiOGQ4NzA3OGMwODQ1IiwiaWF0IjoxNjg2MDU1Njc5LCJleHAiOjE2ODYwNTYwMzl9.8Np_mpxxIMX7lZK4Xegx1xtYQncFY48IQXKOqHm0Rpk`}).send(ProfilePassing[0])
      expect(responce.statusCode).toBe(401)
    })
  })
})

describe('POST /jobs', () => { 
  describe('passign test cases', () => { 
    for(const fb of PassingJob){
      test('should return 201', async () => { 
        const responce = await request(app).post('/api/jobs').set("authorization", `bearer ${employertoken}`).send(fb)
        expect(responce.statusCode).toBe(201)
      })
    }
  })

  describe('failing test cases', () => { 
    for(const fb of FailingJob){
      test('should return 400 invalid data', async () => { 
        const responce = await request(app).post('/api/jobs').set("authorization", `bearer ${employertoken}`).send(fb)
        expect(responce.statusCode).toBe(400)
      })
    }
  })
})

describe('GET /jobs', () => { 
  describe('passing cases', () => { 

    test('should return 200 statuscode', async () => { 
      const responce = await request(app).get('/api/jobs').set("authorization", `bearer ${employertoken}`)
      expect(responce.statusCode).toBe(200)
    })

    test('should return jobs list in body', async () => { 
      const responce = await request(app).get('/api/jobs').set("authorization", `bearer ${employertoken}`)
      expect(responce.statusCode).toBe(200)
      expect(responce.body.jobs).toBeDefined()
      expect(responce.body.jobs.length).toBeGreaterThan(0)
      expect(responce.body.jobs[0]._id).toBeDefined()
      jobId = responce.body.jobs[0]._id
    })
  })

  describe('failing cases', () => { 
    test('should return with status 401 missing header', async () => { 
      const responce = await request(app).get('/api/jobs')
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 missing token', async () => { 
      const responce = await request(app).get('/api/jobs').set({ "authorization": `bearer`})
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 invalid token', async () => { 
      const responce = await request(app).get('/api/jobs').set({ "authorization": `bearer ${employertoken}werw`})
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 expired token', async () => { 
      const responce = await request(app).get('/api/jobs').set({ "authorization": `bearer eyJ1c2VyVHlwZSI6IkVNUExPWUVSIiwibmFtZSI6IkRldmR1dHRzaW5oIENodWRhc2FtYSIsImVtYWlsIjoiZGV2ZHV0dC5jaHVkYXNhbWFAb3BlbnhjZWxsLmNvbSIsImlkIjoiNjQ3ZjEyM2M4MWZiOGQ4NzA3OGMwODQ1IiwiaWF0IjoxNjg2MDU1Njc5LCJleHAiOjE2ODYwNTYwMzl9.8Np_mpxxIMX7lZK4Xegx1xtYQncFY48IQXKOqHm0Rpk`})
      expect(responce.statusCode).toBe(401)
    })
  })
})

describe('GET /jobs/:jobId', () => { 
  describe('passing cases', () => { 

    test('should return 200 statuscode', async () => { 
      const responce = await request(app).get(`/api/jobs/${jobId}`).set("authorization", `bearer ${employertoken}`)
      expect(responce.statusCode).toBe(200)
    })

    test('should return job in body', async () => { 
      const responce = await request(app).get(`/api/jobs/${jobId}`).set("authorization", `bearer ${employertoken}`)
      expect(responce.statusCode).toBe(200)
      expect(responce.body.job).toBeDefined()
      expect(responce.body.job._id).toBeDefined()
    })
  })

  describe('failing cases', () => { 
    test('should return with status 401 missing header', async () => { 
      const responce = await request(app).get(`/api/jobs/${jobId}`)
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 missing token', async () => { 
      const responce = await request(app).get(`/api/jobs/${jobId}`).set({ "authorization": `bearer`})
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 invalid token', async () => { 
      const responce = await request(app).get(`/api/jobs/${jobId}`).set({ "authorization": `bearer ${employertoken}werw`})
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 expired token', async () => { 
      const responce = await request(app).get(`/api/jobs/${jobId}`).set({ "authorization": `bearer eyJ1c2VyVHlwZSI6IkVNUExPWUVSIiwibmFtZSI6IkRldmR1dHRzaW5oIENodWRhc2FtYSIsImVtYWlsIjoiZGV2ZHV0dC5jaHVkYXNhbWFAb3BlbnhjZWxsLmNvbSIsImlkIjoiNjQ3ZjEyM2M4MWZiOGQ4NzA3OGMwODQ1IiwiaWF0IjoxNjg2MDU1Njc5LCJleHAiOjE2ODYwNTYwMzl9.8Np_mpxxIMX7lZK4Xegx1xtYQncFY48IQXKOqHm0Rpk`})
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 404 job not found', async () => { 
      const responce = await request(app).get(`/api/jobs/64803e6ae19dc3dc26e228f7`).set({ "authorization": `bearer ${employertoken}`})
      expect(responce.statusCode).toBe(404)
    })
  })
})

describe('PUT /jobs/:jobId', () => {  

  describe('passing cases', () => { 
    for(const fb of PassingJob){
      test('should return 200 statuscode', async () => { 
        const responce = await request(app).put(`/api/jobs/${jobId}`).set("authorization", `bearer ${employertoken}`).send(fb)
        expect(responce.statusCode).toBe(200)
      })
    }
  })

  describe('failing test cases', () => { 
    for(const fb of FailingJob){
      test('should return 400 invalid data', async () => { 
        const responce = await request(app).put(`/api/jobs/${jobId}`).set("authorization", `bearer ${employertoken}`).send(fb)
        expect(responce.statusCode).toBe(400)
      })
    }
  })
})

describe('POST /apply/:jobId', () => { 

  describe('passing cases', () => { 
    test('should return with status 200', async () => { 
      const responce = await request(app).post(`/api/apply/${jobId}`).set("authorization", `bearer ${employeetoken}`).send(PassingApplication)
      expect(responce.statusCode).toBe(200)
    })
  })

  describe('failing test cases', () => { 
    for(const fb of FailingApplications){
      test('should return 400 invalid data', async () => { 
        const responce = await request(app).post(`/api/apply/${jobId}`).set("authorization", `bearer ${employeetoken}`).send(fb)
        expect(responce.statusCode).toBe(400)
      })
    }
  })
})

describe('GET /getAppliers', () => { 
  describe('passing test', () => { 
    test('should return 200', async () => { 
      const responce = await request(app).get(`/api/appliers/${jobId}`).set("authorization", `bearer ${employertoken}`)
      expect(responce.statusCode).toBe(200)
    })
    test('should return applier object', async () => { 
      const responce = await request(app).get(`/api/appliers/${jobId}`).set("authorization", `bearer ${employertoken}`)
      expect(responce.body).toBeDefined()
      expect(responce.body.applications).toBeDefined()
      expect(responce.body.job).toBeDefined()
      expect(responce.body.applications.length).toBeGreaterThan(0)
      applicationId = responce.body.applications[0]._id
    })
  })

  describe('failing cases', () => { 
    test('should return with status 401 missing header', async () => { 
      const responce = await request(app).get(`/api/appliers/${jobId}`)
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 missing token', async () => { 
      const responce = await request(app).get(`/api/appliers/${jobId}`).set({ "authorization": `bearer`})
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 invalid token', async () => { 
      const responce = await request(app).get(`/api/appliers/${jobId}`).set({ "authorization": `bearer ${employertoken}werw`})
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 expired token', async () => { 
      const responce = await request(app).get(`/api/appliers/${jobId}`).set({ "authorization": `bearer eyJ1c2VyVHlwZSI6IkVNUExPWUVSIiwibmFtZSI6IkRldmR1dHRzaW5oIENodWRhc2FtYSIsImVtYWlsIjoiZGV2ZHV0dC5jaHVkYXNhbWFAb3BlbnhjZWxsLmNvbSIsImlkIjoiNjQ3ZjEyM2M4MWZiOGQ4NzA3OGMwODQ1IiwiaWF0IjoxNjg2MDU1Njc5LCJleHAiOjE2ODYwNTYwMzl9.8Np_mpxxIMX7lZK4Xegx1xtYQncFY48IQXKOqHm0Rpk`})
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 404 job/application not found', async () => { 
      const responce = await request(app).get(`/api/appliers/64803e6ae19dc3dc26e228f7`).set({ "authorization": `bearer ${employertoken}`})
      expect(responce.statusCode).toBe(404)
    })
  })
})

describe('GET /getApplied', () => { 
  describe('passing test', () => { 
    test('should return 200', async () => { 
      const responce = await request(app).get(`/api/applied`).set("authorization", `bearer ${employeetoken}`)
      expect(responce.statusCode).toBe(200)
    })
    test('should return application object', async () => { 
      const responce = await request(app).get(`/api/applied`).set("authorization", `bearer ${employeetoken}`)
      expect(responce.body).toBeDefined()
      expect(responce.body.applications).toBeDefined()
      expect(responce.body.applications.length).toBeGreaterThan(0)
    })
  })

  describe('failing cases', () => { 
    test('should return with status 401 missing header', async () => { 
      const responce = await request(app).get(`/api/applied`)
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 missing token', async () => { 
      const responce = await request(app).get(`/api/applied`).set({ "authorization": `bearer`})
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 invalid token', async () => { 
      const responce = await request(app).get(`/api/applied`).set({ "authorization": `bearer ${employeetoken}werw`})
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 expired token', async () => { 
      const responce = await request(app).get(`/api/applied`).set({ "authorization": `bearer eyJ1c2VyVHlwZSI6IkVNUExPWUVSIiwibmFtZSI6IkRldmR1dHRzaW5oIENodWRhc2FtYSIsImVtYWlsIjoiZGV2ZHV0dC5jaHVkYXNhbWFAb3BlbnhjZWxsLmNvbSIsImlkIjoiNjQ3ZjEyM2M4MWZiOGQ4NzA3OGMwODQ1IiwiaWF0IjoxNjg2MDU1Njc5LCJleHAiOjE2ODYwNTYwMzl9.8Np_mpxxIMX7lZK4Xegx1xtYQncFY48IQXKOqHm0Rpk`})
      expect(responce.statusCode).toBe(401)
    })
  })
})

describe('GET /getApplier', () => { 
  describe('passing test', () => { 
    test('should return 200', async () => { 
      const responce = await request(app).get(`/api/applier/${applicationId}`).set("authorization", `bearer ${employertoken}`)
      expect(responce.statusCode).toBe(200)
    })
    test('should return applier object', async () => { 
      const responce = await request(app).get(`/api/applier/${applicationId}`).set("authorization", `bearer ${employertoken}`)
      expect(responce.body).toBeDefined()
      expect(responce.body.applier).toBeDefined()
    })
  })

  describe('failing cases', () => { 
    test('should return with status 401 missing header', async () => { 
      const responce = await request(app).get(`/api/applier/${applicationId}`)
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 missing token', async () => { 
      const responce = await request(app).get(`/api/applier/${applicationId}`).set({ "authorization": `bearer`})
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 invalid token', async () => { 
      const responce = await request(app).get(`/api/applier/${applicationId}`).set({ "authorization": `bearer ${employertoken}werw`})
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 expired token', async () => { 
      const responce = await request(app).get(`/api/applier/${applicationId}`).set({ "authorization": `bearer eyJ1c2VyVHlwZSI6IkVNUExPWUVSIiwibmFtZSI6IkRldmR1dHRzaW5oIENodWRhc2FtYSIsImVtYWlsIjoiZGV2ZHV0dC5jaHVkYXNhbWFAb3BlbnhjZWxsLmNvbSIsImlkIjoiNjQ3ZjEyM2M4MWZiOGQ4NzA3OGMwODQ1IiwiaWF0IjoxNjg2MDU1Njc5LCJleHAiOjE2ODYwNTYwMzl9.8Np_mpxxIMX7lZK4Xegx1xtYQncFY48IQXKOqHm0Rpk`})
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 404 job/application not found', async () => { 
      const responce = await request(app).get(`/api/appliers/64803e6ae19dc3dc26e228f7`).set({ "authorization": `bearer ${employertoken}`})
      expect(responce.statusCode).toBe(404)
    })
  })
})

afterAll(() => {
  clearDb()
})