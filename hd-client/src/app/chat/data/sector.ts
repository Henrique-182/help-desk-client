export const CustomersList = [
    {
      id: 3,
      username: "COMMON_USER",
      fullname: "COMMON_USER",
      enabled: true,
      permissions: [
        {
          id: 3,
          description: "COMMON_USER",
          authority: "COMMON_USER"
        }
      ]
    }
]

export const EmployeesList = [
    {
      id: 1,
      username: "ADM",
      fullname: "ADM",
      enabled: true,
      permissions: [
        {
          id: 1,
          description: "ADMIN",
          authority: "ADMIN"
        },
        {
          id: 2,
          description: "MANAGER",
          authority: "MANAGER"
        },
        {
          id: 3,
          description: "COMMON_USER",
          authority: "COMMON_USER"
        }
      ]
    },
    {
      id: 2,
      username: "MANAGER",
      fullname: "MANAGER",
      enabled: true,
      permissions: [
        {
          id: 2,
          description: "MANAGER",
          authority: "MANAGER"
        },
        {
          id: 3,
          description: "COMMON_USER",
          authority: "COMMON_USER"
        }
      ]
    }
]