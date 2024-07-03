
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
