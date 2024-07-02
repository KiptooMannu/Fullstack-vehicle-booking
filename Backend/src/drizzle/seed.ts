import { Client } from 'pg';
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

    // // Insert data into Vehicles
    // await db.insert(VehiclesTable).values([
    //   { vehicleSpecId: 1, rentalRate: 50.00, availability: true },
    //   { vehicleSpecId: 2, rentalRate: 45.00, availability: true },
    // ]);

    // // Insert data into FleetManagement
    // await db.insert(FleetManagementTable).values([
    //   { vehicleId: 1, acquisitionDate: new Date(), depreciationRate: 0.1, currentValue: 25000.00, maintenanceCost: 500.00, status: 'active' },
    //   { vehicleId: 2, acquisitionDate: new Date(), depreciationRate: 0.1, currentValue: 20000.00, maintenanceCost: 300.00, status: 'active' },
    // ]);

    // Insert data into Branches
    await db.insert(BranchesTable).values([
      { name: 'Downtown Branch', address: '789 Pine Street', contactPhone: '555-0102' },
      { name: 'Uptown Branch', address: '101 Maple Avenue', contactPhone: '555-0103' },
    ]);

    // // Insert data into Bookings
    // await db.insert(BookingsTable).values([
    //   { userId: 1, vehicleId: 1, branchId: 1, bookingDate: new Date(), returnDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), totalAmount: 50.00, bookingStatus: 'confirmed' },
    //   { userId: 2, vehicleId: 2, branchId: 2, bookingDate: new Date(), returnDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), totalAmount: 45.00, bookingStatus: 'pending' },
    // ]);

    // // Insert data into Payments
    // await db.insert(PaymentsTable).values([
    //   { bookingId: 1, amount: 50.00, paymentStatus: 'confirmed', paymentDate: new Date(), paymentMethod: 'Credit Card', transactionId: 'txn_12345' },
    //   { bookingId: 2, amount: 45.00, paymentStatus: 'pending', paymentDate: new Date(), paymentMethod: 'PayPal', transactionId: 'txn_67890' },
    // ]);

    console.log('Data seeded successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

seed();
