import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialCabData = [
  {
    id: "CAB-001",
    vehicleNumber: "XYZ 1234",
    type: "Sedan",
    brand: "Toyota",
    capacity: 4,
    status: "Available",
    isEV: true,
  },
  {
    id: "CAB-002",
    vehicleNumber: "ABC 5678",
    type: "Sedan",
    brand: "Honda",
    capacity: 4,
    status: "OnTrip",
    isEV: false,
  },
  {
    id: "CAB-003",
    vehicleNumber: "LMN 9101",
    type: "Sedan",
    brand: "Ford",
    capacity: 4,
    status: "Maintenance",
    isEV: false,
  },
  {
    id: "CAB-004",
    vehicleNumber: "PQR 2345",
    type: "Sedan",
    brand: "Chevrolet",
    capacity: 4,
    status: "Available",
    isEV: false,
  },
  {
    id: "CAB-005",
    vehicleNumber: "STU 6789",
    type: "Sedan",
    brand: "Hyundai",
    capacity: 5,
    status: "Available",
    isEV: false,
  },
  {
    id: "CAB-006",
    vehicleNumber: "VWX 0123",
    type: "Sedan",
    brand: "Nissan",
    capacity: 4,
    status: "OnTrip",
    isEV: false,
  },
  {
    id: "CAB-007",
    vehicleNumber: "YZA 4567",
    type: "Sedan",
    brand: "Kia",
    capacity: 4,
    status: "Available",
    isEV: false,
  },
  {
    id: "CAB-008",
    vehicleNumber: "BCD 8901",
    type: "Sedan",
    brand: "Mazda",
    capacity: 4,
    status: "Maintenance",
    isEV: false,
  },
  {
    id: "CAB-009",
    vehicleNumber: "EFG 2345",
    type: "Sedan",
    brand: "Volkswagen",
    capacity: 4,
    status: "Available",
    isEV: false,
  },
  {
    id: "CAB-010",
    vehicleNumber: "HIJ 6789",
    type: "Sedan",
    brand: "Subaru",
    capacity: 4,
    status: "OnTrip",
    isEV: false,
  },
  {
    id: "CAB-011",
    vehicleNumber: "EV 0001",
    type: "Sedan",
    brand: "Tesla",
    capacity: 4,
    status: "Available",
    isEV: true,
  },
  {
    id: "CAB-012",
    vehicleNumber: "VAN 777",
    type: "Minivan",
    brand: "Ford",
    capacity: 12,
    status: "Maintenance",
    isEV: false,
  },
  {
    id: "CAB-013",
    vehicleNumber: "BAT 01",
    type: "Sedan",
    brand: "Mercedes",
    capacity: 3,
    status: "OnTrip",
    isEV: false,
  },
  {
    id: "CAB-014",
    vehicleNumber: "SUV 999",
    type: "SUV",
    brand: "Chevrolet",
    capacity: 7,
    status: "Available",
    isEV: false,
  },
  {
    id: "CAB-015",
    vehicleNumber: "WW 1984",
    type: "Sedan",
    brand: "Audi",
    capacity: 4,
    status: "Available",
    isEV: false,
  }
];

async function main() {
  console.log("Fetching drivers...");
  const drivers = await prisma.staffMember.findMany({
    where: {
      department: "Transport",
      designation: {
        contains: "Driver",
        mode: "insensitive"
      }
    }
  });
  
  if (drivers.length === 0) {
    console.log("No drivers found. Creating mock drivers...");
    const d1 = await prisma.staffMember.create({
      data: {
        id: `EMP-${Date.now()}-1`,
        employeeCode: "DRV-001",
        firstName: "John",
        lastName: "Doe",
        department: "Transport",
        designation: "Driver",
        shift: "Morning",
        phone: "1234567890",
        joiningDate: new Date(),
        status: "Active"
      }
    });
    const d2 = await prisma.staffMember.create({
      data: {
        id: `EMP-${Date.now()}-2`,
        employeeCode: "DRV-002",
        firstName: "Jane",
        lastName: "Smith",
        department: "Transport",
        designation: "Driver",
        shift: "Evening",
        phone: "0987654321",
        joiningDate: new Date(),
        status: "Active"
      }
    });
    drivers.push(d1, d2);
  } else {
    console.log(`Found ${drivers.length} drivers.`);
  }

  console.log("Seeding vehicles...");
  for (let i = 0; i < initialCabData.length; i++) {
    const cab = initialCabData[i];
    
    // Assign drivers alternately
    const assignedDriver = drivers[i % drivers.length];
    
    await prisma.vehicle.upsert({
      where: { id: cab.id },
      update: {},
      create: {
        id: cab.id,
        vehicleNumber: cab.vehicleNumber,
        type: cab.type as any,
        brand: cab.brand,
        capacity: cab.capacity,
        status: cab.status as any,
        isEV: cab.isEV,
        driverId: assignedDriver.id
      }
    });
  }
  
  console.log("Seeding complete.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
