const request = require('supertest')
const { app } = require('../server')
const { clearDb } = require('../utils/clearDb')
const { PassingEmployerRegister, PassingEmployeeRegister, FailingCases, PassingLogin, Passing2Login, Failure404Login, Failure401Login, Failure400Login, ProfilePassing, PassingJob, FailingJob, PassingApplication, FailingApplications } = require('./data')

let jobId;
let applicationId;
let employertoken;
let employeetoken;

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
      const responce = await request(app).get('/api/profile').set({ "authorization": `bearer ${employertoken}y`})
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 expired token', async () => { 
      const responce = await request(app).get('/api/profile').set({ "authorization": `bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6IkVNUExPWUVSIiwibmFtZSI6ImRldmR1dHQgY2h1YWRhc2FtYSIsImVtYWlsIjoiZGV2ZHV0dC5jaHVkYXNhbWFAb3BlbnhjZWxsLmNvbSIsImlkIjoiNjQ4MTk5Y2Q1YzdmMDI4YTg1ZWUxMTEwIiwiaWF0IjoxNjg2MjE2MDMyLCJleHAiOjE2ODYzMDI0MzJ9.CeHWocRCSY_8QAiDFTAzkdtvLUdZleDQtzkFS4nVoDRHJhv-yOCLUvVduCDargmR0lmzh6_PxxoTObWJFgMeV3Lci431UfOA5ArbFMIJz1nO5WqkOdAxL4WFZ_Bhk0mTlcYMXjwempwnsl9RKiH27LkmqqRAQEu-62l2cV-cMiZ0T0DmjhA11ImYiPLzrwtzV5vn2qyDsxaJAgwSG9fkK8eg_278RIfaSRg1244UisN978ZPszIpuYKtLH3X1n6dxIrqAr3bSNGedKm3nR9hMaxht33r0_odCR612yiGUgd4XEmv703tXLJqGTJo6rwXFpmAo3ArTpVbux33QdYTuw`})
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
      const responce = await request(app).put('/api/profile').set({ "authorization": `bearer ${employertoken}y`}).send(ProfilePassing[0])
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 expired token', async () => { 
      const responce = await request(app).put('/api/profile').set({ "authorization": `bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6IkVNUExPWUVSIiwibmFtZSI6ImRldmR1dHQgY2h1YWRhc2FtYSIsImVtYWlsIjoiZGV2ZHV0dC5jaHVkYXNhbWFAb3BlbnhjZWxsLmNvbSIsImlkIjoiNjQ4MTk5Y2Q1YzdmMDI4YTg1ZWUxMTEwIiwiaWF0IjoxNjg2MjE2MDMyLCJleHAiOjE2ODYzMDI0MzJ9.CeHWocRCSY_8QAiDFTAzkdtvLUdZleDQtzkFS4nVoDRHJhv-yOCLUvVduCDargmR0lmzh6_PxxoTObWJFgMeV3Lci431UfOA5ArbFMIJz1nO5WqkOdAxL4WFZ_Bhk0mTlcYMXjwempwnsl9RKiH27LkmqqRAQEu-62l2cV-cMiZ0T0DmjhA11ImYiPLzrwtzV5vn2qyDsxaJAgwSG9fkK8eg_278RIfaSRg1244UisN978ZPszIpuYKtLH3X1n6dxIrqAr3bSNGedKm3nR9hMaxht33r0_odCR612yiGUgd4XEmv703tXLJqGTJo6rwXFpmAo3ArTpVbux33QdYTuw`}).send(ProfilePassing[0])
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
      const responce = await request(app).get('/api/jobs').set({ "authorization": `bearer ${employertoken}y`})
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 expired token', async () => { 
      const responce = await request(app).get('/api/jobs').set({ "authorization": `bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6IkVNUExPWUVSIiwibmFtZSI6ImRldmR1dHQgY2h1YWRhc2FtYSIsImVtYWlsIjoiZGV2ZHV0dC5jaHVkYXNhbWFAb3BlbnhjZWxsLmNvbSIsImlkIjoiNjQ4MTk5Y2Q1YzdmMDI4YTg1ZWUxMTEwIiwiaWF0IjoxNjg2MjE2MDMyLCJleHAiOjE2ODYzMDI0MzJ9.CeHWocRCSY_8QAiDFTAzkdtvLUdZleDQtzkFS4nVoDRHJhv-yOCLUvVduCDargmR0lmzh6_PxxoTObWJFgMeV3Lci431UfOA5ArbFMIJz1nO5WqkOdAxL4WFZ_Bhk0mTlcYMXjwempwnsl9RKiH27LkmqqRAQEu-62l2cV-cMiZ0T0DmjhA11ImYiPLzrwtzV5vn2qyDsxaJAgwSG9fkK8eg_278RIfaSRg1244UisN978ZPszIpuYKtLH3X1n6dxIrqAr3bSNGedKm3nR9hMaxht33r0_odCR612yiGUgd4XEmv703tXLJqGTJo6rwXFpmAo3ArTpVbux33QdYTuw`})
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
      const responce = await request(app).get(`/api/jobs/${jobId}`).set({ "authorization": `bearer ${employertoken}y`})
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 expired token', async () => { 
      const responce = await request(app).get(`/api/jobs/${jobId}`).set({ "authorization": `bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6IkVNUExPWUVSIiwibmFtZSI6ImRldmR1dHQgY2h1YWRhc2FtYSIsImVtYWlsIjoiZGV2ZHV0dC5jaHVkYXNhbWFAb3BlbnhjZWxsLmNvbSIsImlkIjoiNjQ4MTk5Y2Q1YzdmMDI4YTg1ZWUxMTEwIiwiaWF0IjoxNjg2MjE2MDMyLCJleHAiOjE2ODYzMDI0MzJ9.CeHWocRCSY_8QAiDFTAzkdtvLUdZleDQtzkFS4nVoDRHJhv-yOCLUvVduCDargmR0lmzh6_PxxoTObWJFgMeV3Lci431UfOA5ArbFMIJz1nO5WqkOdAxL4WFZ_Bhk0mTlcYMXjwempwnsl9RKiH27LkmqqRAQEu-62l2cV-cMiZ0T0DmjhA11ImYiPLzrwtzV5vn2qyDsxaJAgwSG9fkK8eg_278RIfaSRg1244UisN978ZPszIpuYKtLH3X1n6dxIrqAr3bSNGedKm3nR9hMaxht33r0_odCR612yiGUgd4XEmv703tXLJqGTJo6rwXFpmAo3ArTpVbux33QdYTuw`})
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

describe('GET /getApplications', () => { 
  describe('passing test', () => { 
    test('should return 200', async () => { 
      const responce = await request(app).get(`/api/applications/${jobId}`).set("authorization", `bearer ${employertoken}`)
      expect(responce.statusCode).toBe(200)
    })
    test('should return applier object', async () => { 
      const responce = await request(app).get(`/api/applications/${jobId}`).set("authorization", `bearer ${employertoken}`)
      expect(responce.body).toBeDefined()
      expect(responce.body.applications).toBeDefined()
      expect(responce.body.job).toBeDefined()
      expect(responce.body.applications.length).toBeGreaterThan(0)
      applicationId = responce.body.applications[0]._id
    })
  })

  describe('failing cases', () => { 
    test('should return with status 401 missing header', async () => { 
      const responce = await request(app).get(`/api/applications/${jobId}`)
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 missing token', async () => { 
      const responce = await request(app).get(`/api/applications/${jobId}`).set({ "authorization": `bearer`})
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 invalid token', async () => { 
      const responce = await request(app).get(`/api/applications/${jobId}`).set({ "authorization": `bearer ${employertoken}y`})
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 expired token', async () => { 
      const responce = await request(app).get(`/api/applications/${jobId}`).set({ "authorization": `bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6IkVNUExPWUVSIiwibmFtZSI6ImRldmR1dHQgY2h1YWRhc2FtYSIsImVtYWlsIjoiZGV2ZHV0dC5jaHVkYXNhbWFAb3BlbnhjZWxsLmNvbSIsImlkIjoiNjQ4MTk5Y2Q1YzdmMDI4YTg1ZWUxMTEwIiwiaWF0IjoxNjg2MjE2MDMyLCJleHAiOjE2ODYzMDI0MzJ9.CeHWocRCSY_8QAiDFTAzkdtvLUdZleDQtzkFS4nVoDRHJhv-yOCLUvVduCDargmR0lmzh6_PxxoTObWJFgMeV3Lci431UfOA5ArbFMIJz1nO5WqkOdAxL4WFZ_Bhk0mTlcYMXjwempwnsl9RKiH27LkmqqRAQEu-62l2cV-cMiZ0T0DmjhA11ImYiPLzrwtzV5vn2qyDsxaJAgwSG9fkK8eg_278RIfaSRg1244UisN978ZPszIpuYKtLH3X1n6dxIrqAr3bSNGedKm3nR9hMaxht33r0_odCR612yiGUgd4XEmv703tXLJqGTJo6rwXFpmAo3ArTpVbux33QdYTuw`})
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 404 job/application not found', async () => { 
      const responce = await request(app).get(`/api/applications/64803e6ae19dc3dc26e228f7`).set({ "authorization": `bearer ${employertoken}`})
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
      const responce = await request(app).get(`/api/applied`).set({ "authorization": `bearer ${employeetoken}y`})
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 expired token', async () => { 
      const responce = await request(app).get(`/api/applied`).set({ "authorization": `bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6IkVNUExPWUVSIiwibmFtZSI6ImRldmR1dHQgY2h1YWRhc2FtYSIsImVtYWlsIjoiZGV2ZHV0dC5jaHVkYXNhbWFAb3BlbnhjZWxsLmNvbSIsImlkIjoiNjQ4MTk5Y2Q1YzdmMDI4YTg1ZWUxMTEwIiwiaWF0IjoxNjg2MjE2MDMyLCJleHAiOjE2ODYzMDI0MzJ9.CeHWocRCSY_8QAiDFTAzkdtvLUdZleDQtzkFS4nVoDRHJhv-yOCLUvVduCDargmR0lmzh6_PxxoTObWJFgMeV3Lci431UfOA5ArbFMIJz1nO5WqkOdAxL4WFZ_Bhk0mTlcYMXjwempwnsl9RKiH27LkmqqRAQEu-62l2cV-cMiZ0T0DmjhA11ImYiPLzrwtzV5vn2qyDsxaJAgwSG9fkK8eg_278RIfaSRg1244UisN978ZPszIpuYKtLH3X1n6dxIrqAr3bSNGedKm3nR9hMaxht33r0_odCR612yiGUgd4XEmv703tXLJqGTJo6rwXFpmAo3ArTpVbux33QdYTuw`})
      expect(responce.statusCode).toBe(401)
    })
  })
})

describe('GET /getApplication', () => { 
  describe('passing test', () => { 
    test('should return 200', async () => { 
      const responce = await request(app).get(`/api/application/${applicationId}`).set("authorization", `bearer ${employertoken}`)
      expect(responce.statusCode).toBe(200)
    })
    test('should return applier object', async () => { 
      const responce = await request(app).get(`/api/application/${applicationId}`).set("authorization", `bearer ${employertoken}`)
      expect(responce.body).toBeDefined()
      expect(responce.body.application).toBeDefined()
    })
  })

  describe('failing cases', () => { 
    test('should return with status 401 missing header', async () => { 
      const responce = await request(app).get(`/api/application/${applicationId}`)
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 missing token', async () => { 
      const responce = await request(app).get(`/api/application/${applicationId}`).set({ "authorization": `bearer`})
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 invalid token', async () => { 
      const responce = await request(app).get(`/api/application/${applicationId}`).set({ "authorization": `bearer ${employertoken}y`})
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 401 expired token', async () => { 
      const responce = await request(app).get(`/api/application/${applicationId}`).set({ "authorization": `bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6IkVNUExPWUVSIiwibmFtZSI6ImRldmR1dHQgY2h1YWRhc2FtYSIsImVtYWlsIjoiZGV2ZHV0dC5jaHVkYXNhbWFAb3BlbnhjZWxsLmNvbSIsImlkIjoiNjQ4MTk5Y2Q1YzdmMDI4YTg1ZWUxMTEwIiwiaWF0IjoxNjg2MjE2MDMyLCJleHAiOjE2ODYzMDI0MzJ9.CeHWocRCSY_8QAiDFTAzkdtvLUdZleDQtzkFS4nVoDRHJhv-yOCLUvVduCDargmR0lmzh6_PxxoTObWJFgMeV3Lci431UfOA5ArbFMIJz1nO5WqkOdAxL4WFZ_Bhk0mTlcYMXjwempwnsl9RKiH27LkmqqRAQEu-62l2cV-cMiZ0T0DmjhA11ImYiPLzrwtzV5vn2qyDsxaJAgwSG9fkK8eg_278RIfaSRg1244UisN978ZPszIpuYKtLH3X1n6dxIrqAr3bSNGedKm3nR9hMaxht33r0_odCR612yiGUgd4XEmv703tXLJqGTJo6rwXFpmAo3ArTpVbux33QdYTuw`})
      expect(responce.statusCode).toBe(401)
    })
    test('should return with status 404 job/application not found', async () => { 
      const responce = await request(app).get(`/api/application/64803e6ae19dc3dc26e228f7`).set({ "authorization": `bearer ${employertoken}`})
      expect(responce.statusCode).toBe(404)
    })
  })
})

afterAll(() => {
  clearDb()
})