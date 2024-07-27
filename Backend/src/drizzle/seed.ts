
import { UsersTable, AuthenticationTable, SupportTicketsTable, VehicleSpecificationsTable, VehiclesTable, FleetManagementTable, BranchesTable, BookingsTable, PaymentsTable } from './schema'; // Import your schema file
import db from './db';


async function seed() {
  try {

    // Insert data into Users
    await db.insert(UsersTable).values([
      { fullName: 'Alice Smith', email: 'alice@example.com', contactPhone: '555-0100', address: '123 Elm Street', role: 'admin' },
      { fullName: 'Bob Jones', email: 'bob@example.com', contactPhone: '555-0101', address: '456 Oak Avenue', role: 'user' },
    ]);

    // Insert data into Authentication
    await db.insert(AuthenticationTable).values([
      { userId: 1, password: 'hashedpassword1' },
      { userId: 2, password: 'hashedpassword2' },
    ]);

    // Insert data into SupportTickets
    await db.insert(SupportTicketsTable).values([
      { userId: 1, subject: 'Issue with booking', description: 'Details about the issue.', status: 'pending' },
      { userId: 2, subject: 'Payment problem', description: 'Details about the payment issue.', status: 'pending' },
    ]);

    // Insert data into VehicleSpecifications
    await db.insert(VehicleSpecificationsTable).values([
      { manufacturer: 'Toyota', model: 'Camry', year: 2020, fuelType: 'Petrol', engineCapacity: '2.5L', transmission: 'Automatic', seatingCapacity: 5, color: 'Blue', features: 'Air Conditioning, GPS' },
      { manufacturer: 'Honda', model: 'Civic', year: 2019, fuelType: 'Petrol', engineCapacity: '2.0L', transmission: 'Manual', seatingCapacity: 5, color: 'Red', features: 'Air Conditioning, Bluetooth' },
    ]);


    // Insert data into Branches
    await db.insert(BranchesTable).values([
      { name: 'Downtown Branch', address: '789 Pine Street', contactPhone: '555-0102' },
      { name: 'Uptown Branch', address: '101 Maple Avenue', contactPhone: '555-0103' },
    ]);

    console.log('Data seeded successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

seed();


// Fleet Management Insert Data
const fleetManagementData = [
    {
        vehicleId: 1,
        acquisitionDate: new Date().toISOString(),
        depreciationRate: 5.0,
        currentValue: 20000,
        maintenanceCost: 1000,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        vehicleId: 2,
        acquisitionDate: new Date().toISOString(),
        depreciationRate: 5.0,
        currentValue: 18000,
        maintenanceCost: 900,
        status: 'inactive',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        vehicleId: 6,
        acquisitionDate: new Date().toISOString(),
        depreciationRate: 5.0,
        currentValue: 25000,
        maintenanceCost: 1100,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        vehicleId: 7,
        acquisitionDate: new Date().toISOString(),
        depreciationRate: 4.0,
        currentValue: 15000,
        maintenanceCost: 800,
        status: 'inactive',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        vehicleId: 8,
        acquisitionDate: new Date().toISOString(),
        depreciationRate: 6.0,
        currentValue: 22000,
        maintenanceCost: 1200,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        vehicleId: 9,
        acquisitionDate: new Date().toISOString(),
        depreciationRate: 4.5,
        currentValue: 17000,
        maintenanceCost: 950,
        status: 'inactive',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        vehicleId: 10,
        acquisitionDate: new Date().toISOString(),
        depreciationRate: 5.0,
        currentValue: 30000,
        maintenanceCost: 1300,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        vehicleId: 11,
        acquisitionDate: new Date().toISOString(),
        depreciationRate: 5.0,
        currentValue: 19000,
        maintenanceCost: 850,
        status: 'inactive',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        vehicleId: 12,
        acquisitionDate: new Date().toISOString(),
        depreciationRate: 4.5,
        currentValue: 21000,
        maintenanceCost: 1050,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        vehicleId: 13,
        acquisitionDate: new Date().toISOString(),
        depreciationRate: 5.5,
        currentValue: 16000,
        maintenanceCost: 750,
        status: 'inactive',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        vehicleId: 14,
        acquisitionDate: new Date().toISOString(),
        depreciationRate: 4.0,
        currentValue: 28000,
        maintenanceCost: 1250,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        vehicleId: 15,
        acquisitionDate: new Date().toISOString(),
        depreciationRate: 5.0,
        currentValue: 23000,
        maintenanceCost: 1150,
        status: 'inactive',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

// Insert data into Fleet Management Table
// async function insertFleetManagementData() {
//     for (const record of fleetManagementData) {
//         await db.insert(FleetManagementTable).values(record);
//     }
// }

// insertFleetManagementData()
//     .then(() => console.log('Fleet management data inserted successfully'))
//     .catch((error) => console.error('Error inserting fleet management data:', error));

