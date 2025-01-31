const appointments  = [
  {
    date: new Date("2024-10-25"),
    time: "15:00",
    userId: 1,
    id: 1,
    status: "active",
    user: {
      id: 1,
      name: "Juan Pérez",
      birthdate: new Date("1969-12-31"),
      nDni: 12345678,
      email: "juan.perez@example.com",
      phone: 1112345678
    }
  },

  {
    date: new Date("2024-10-26"),
    time: "10:30",
    userId: 2,
    id: 2,
    status: "active",
    user: {
      id: 2,
      name: "Ana García",
      birthdate: new Date("1975-05-10"),
      nDni: 87654321,
      email: "ana.garcia@example.com",
      phone: 2223456789
    }
  },

    {
    date: new Date("2024-10-27"),
    time: "11:00",
    userId: 3,
    id: 3,
    status: "active",
    user: {
      id: 3,
      name: "Carlos Díaz",
      birthdate: new Date("1980-02-20"),
      nDni: 23456789,
      email: "carlos.diaz@example.com",
      phone: 3334567890
    }
  },

  {
    date: new Date("2024-10-28"),
    time: "14:00",
    userId: 4,
    id: 4,
    status: "active",
    user: {
      id: 4,
      name: "María López",
      birthdate: new Date("1985-07-15"),
      nDni: 34567890,
      email: "maria.lopez@example.com",
      phone: 4445678901
    }
  },

{
    date: new Date("2024-10-29"),
    time: "16:00",
    userId: 5,
    id: 5,
    status: "active",
    user: {
      id: 5,
      name: "Sofía Gómez",
      birthdate: new Date("1990-11-25"),
      nDni: 45678901,
      email: "sofia.gomez@example.com",
      phone: 5556789012
    }
  }
];

export default appointments ;