
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
    "email": "devdut.chudasama@openxcell.com",
    "password": "de",
    "name": "Devduttsinh Chudasama",
    "userType": "EMPLOYER",
    "contactNumber": "7698559806",
    "contactEmail": "devdutt@email.com"
  },
  {
    "email": "devdtt.chudasama@openxcell.com",
    "password": "devdutt",
    "name": "Devduttsinh Chudasama",
    "userType": "EMPLOYERE",
    "contactNumber": "7698559806",
    "contactEmail": "devdutt@email.com"
  },
  {
    "email": "devutt.chudasama@openxcell.com",
    "password": "devdutt",
    "name": "Devduttsinh Chudasama",
    "userType": "EMPLOYER",
    "contactNumber": "769855980612",
    "contactEmail": "devdutt@email.com"
  },
  {
    "email": "dedutt.chudasama@openxcell.com",
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
    "email": "evdutt.chudasama@openxcell.com",
    "name": "Devduttsinh Chudasama",
    "userType": "EMPLOYER",
    "contactNumber": "7698559806",
    "contactEmail": "devdutt@email.com"
  },
  {
    "email": "chudasama@openxcell.com",
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


const PassingJob = [
  {
    "minimumExperience": 1,
    "jobTitle": "enginner",
    "jobDescription": "critical thinker who can think of creative solutions",
    "isCommitmentRequired": true,
    "minimumJobCommitment": 1,
    "paymentType": "HOURLY",
    "salary": 20000
  },
  {
    "minimumExperience": 1,
    "jobTitle": "enginner",
    "jobDescription": "critical thinker who can think of creative solutions",
    "isCommitmentRequired": false,
    "paymentType": "HOURLY",
    "salary": 20000
  }
]
const FailingJob = [
  {
    "minimumExperience": "as",
    "jobTitle": "enginner",
    "jobDescription": "critical thinker who can think of creative solutions",
    "isCommitmentRequired": true,
    "minimumJobCommitment": 1,
    "paymentType": "HOURLY",
    "salary": 20000
  },
  {
    "jobTitle": "enginner",
    "jobDescription": "critical thinker who can think of creative solutions",
    "isCommitmentRequired": true,
    "minimumJobCommitment": 1,
    "paymentType": "HOURLY",
    "salary": 20000
  },
  {
    "minimumExperience": 1,
    "jobTitle": 12,
    "jobDescription": "critical thinker who can think of creative solutions",
    "isCommitmentRequired": true,
    "minimumJobCommitment": 1,
    "paymentType": "HOURLY",
    "salary": 20000
  },
  {
    "minimumExperience": 1,
    "jobDescription": "critical thinker who can think of creative solutions",
    "isCommitmentRequired": true,
    "minimumJobCommitment": 1,
    "paymentType": "HOURLY",
    "salary": 20000
  },
  {
    "minimumExperience": 1,
    "jobTitle": "enginner",
    "jobDescription": "crit",
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
    "jobDescription": "critical thinker who can think of creative solutions",
    "isCommitmentRequired": "Y",
    "minimumJobCommitment": 1,
    "paymentType": "HOURLY",
    "salary": 20000
  },
  {
    "minimumExperience": 1,
    "jobTitle": "enginner",
    "jobDescription": "critical thinker who can think of creative solutions",
    "minimumJobCommitment": 1,
    "paymentType": "HOURLY",
    "salary": 20000
  },
  {
    "minimumExperience": 1,
    "jobTitle": "enginner",
    "jobDescription": "critical thinker who can think of creative solutions",
    "isCommitmentRequired": true,
    "paymentType": "HOURLY",
    "salary": 20000
  },
  {
    "minimumExperience": 1,
    "jobTitle": "enginner",
    "jobDescription": "critical thinker who can think of creative solutions",
    "isCommitmentRequired": false,
    "paymentType": "HOURLYE",
    "salary": 20000
  },
  {
    "minimumExperience": 1,
    "jobTitle": "enginner",
    "jobDescription": "critical thinker who can think of creative solutions",
    "isCommitmentRequired": true,
    "minimumJobCommitment": 1,
    "salary": 20000
  },
  {
    "minimumExperience": 1,
    "jobTitle": "enginner",
    "jobDescription": "critical thinker who can think of creative solutions",
    "isCommitmentRequired": true,
    "minimumJobCommitment": 1,
    "paymentType": "HOURLY",
    "salary": "asd"
  },
  {
    "minimumExperience": 1,
    "jobTitle": "enginner",
    "jobDescription": "critical thinker who can think of creative solutions",
    "isCommitmentRequired": true,
    "minimumJobCommitment": 1,
    "paymentType": "HOURLY",
  },
  {}
]


const PassingApplication = {
  "totalExperience": 2,
  "pastExperiences": [
    {
      "role": "developer",
      "description": "develop websites according to requirmnets",
      "duration": 1.2
    },
    {
      "role": "engineer",
      "description": "find better solutions to problems"
    }
  ],
  "linkToResume": "https://somedomain.com/aasdasd/png.jpeg"
}
const FailingApplications = [
  {
    "pastExperiences": [
      {
        "role": "developer",
        "description": "develop websites according to requirmnets",
        "duration": 1.2
      },
      {
        "role": "engineer",
        "description": "find better solutions to problems"
      }
    ],
    "linkToResume": "https://somedomain.com/aasdasd/png.jpeg"
  },
  {
    "totalExperience": "qw",
    "pastExperiences": [
      {
        "role": "developer",
        "description": "develop websites according to requirmnets",
        "duration": 1.2
      },
      {
        "role": "engineer",
        "description": "find better solutions to problems"
      }
    ],
    "linkToResume": "https://somedomain.com/aasdasd/png.jpeg"
  },
  {
    "totalExperience": 2,
    "pastExperiences": [
      {
        "role": "developer",
        "description": "develop websites according to requirmnets",
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
        "description": "dev",
        "duration": 1.2
      }
    ],
    "linkToResume": "https://somedomain.com/aasdasd/png.jpeg"
  },
  {
    "totalExperience": 2,
    "pastExperiences": [
      {
        "description": "develop websites according to requirmnets"
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
        "description": "find better solutions to problems"
      }
    ],
    "linkToResume": "https://somedomain.com/aasdasd/png.jpeg"
  },
]

module.exports = { PassingEmployerRegister, PassingEmployeeRegister, FailingCases, PassingLogin, Passing2Login, Failure404Login, Failure401Login, Failure400Login, ProfilePassing, PassingJob, FailingJob, PassingApplication, FailingApplications }