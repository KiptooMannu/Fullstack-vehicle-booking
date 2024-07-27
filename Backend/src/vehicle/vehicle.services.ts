import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIVehicle, TSVehicle, VehiclesTable, VehicleSpecificationsTable } from "../drizzle/schema";


interface VehicleSpecifications {
    color: string | null;
    engineCapacity: string | null;
    features: string | null;
    fuelType: string | null;
    seatingCapacity: number | null;
    manufacturer: string | null;
    model: string | null;
    transmission: string | null;
    year: number | null;
}

interface TVehicle {
    vehicleId: number;
    availability: boolean;
    rentalRate: string;
    specifications: VehicleSpecifications;
}


// Service to fetch vehicles
export const vehiclesService = async (limit?: number): Promise<Vehicle[]> => {
    const vehicles = await db.query.VehiclesTable.findMany({
        limit: limit || undefined,
        columns: {
            vehicleId: true,
            availability: true,
            rentalRate: true,
        },
        with: {
            specifications: {
                columns: {
                    color: true,
                    engineCapacity: true,
                    features: true,
                    fuelType: true,
                    seatingCapacity: true,
                    manufacturer: true,
                    model: true,
                    transmission: true,
                    year: true,
                }
            }
        }
    });

    // Ensure the return type matches the Vehicle interface
    return vehicles.map(vehicle => ({
        vehicleId: vehicle.vehicleId,
        availability: vehicle.availability ?? false,  // Default to false if null
        rentalRate: vehicle.rentalRate ?? "",        // Default to empty string if null
        specifications: {
            color: vehicle.specifications?.color ?? null,
            engineCapacity: vehicle.specifications?.engineCapacity ?? null,
            features: vehicle.specifications?.features ?? null,
            fuelType: vehicle.specifications?.fuelType ?? null,
            seatingCapacity: vehicle.specifications?.seatingCapacity ?? null,
            manufacturer: vehicle.specifications?.manufacturer ?? null,
            model: vehicle.specifications?.model ?? null,
            transmission: vehicle.specifications?.transmission ?? null,
            year: vehicle.specifications?.year ?? null,
        }
    }));
}



interface VehicleSpecifications {
    color: string | null;
    engineCapacity: string | null;
    features: string | null;
    fuelType: string | null;
    seatingCapacity: number | null;
    manufacturer: string | null;
    model: string | null;
    transmission: string | null;
    year: number | null;
}

interface Vehicle {
    availability: boolean | null;
    rentalRate: string | null;
    specifications: VehicleSpecifications;
}

export const getVehicleService = async (id: number): Promise<Vehicle | null> => {
    const result = await db.query.VehiclesTable.findFirst({
        columns: {
            availability: true,
            rentalRate: true,
        },
        where: eq(VehiclesTable.vehicleId, id),
        with: {
            specifications: {
                columns: {
                    color: true,
                    engineCapacity: true,
                    features: true,
                    fuelType: true,
                    seatingCapacity: true,
                    manufacturer: true,
                    model: true,
                    transmission: true,
                    year: true,
                }
            }
        }
    });

    if (!result) {
        return null;
    }

    return {
        availability: result.availability ?? null,
        rentalRate: result.rentalRate ?? null,
        specifications: {
            color: result.specifications.color ?? null,
            engineCapacity: result.specifications.engineCapacity ?? null,
            features: result.specifications.features ?? null,
            fuelType: result.specifications.fuelType ?? null,
            seatingCapacity: result.specifications.seatingCapacity ?? null,
            manufacturer: result.specifications.manufacturer ?? null,
            model: result.specifications.model ?? null,
            transmission: result.specifications.transmission ?? null,
            year: result.specifications.year ?? null,
        }
    };
};


// // Service to create a new vehicle
// export const createVehicleService = async (vehicle: TIVehicle): Promise<string> => {
//     await db.insert(VehiclesTable).values(vehicle);
//     return "Vehicle created successfully";
// }

// Service to update a vehicle by ID
export const updateVehicleService = async (id: number, vehicle: Partial<TIVehicle>): Promise<string> => {
    await db.update(VehiclesTable).set(vehicle).where(eq(VehiclesTable.vehicleId, id));
    return "Vehicle updated successfully";
}

// Service to delete a vehicle by ID
export const deleteVehicleService = async (id: number): Promise<string> => {
    await db.delete(VehiclesTable).where(eq(VehiclesTable.vehicleId, id));
    return "Vehicle deleted successfully";
}



// export const insertVehicleWithSpecificationsService = async (vehicle: any) => {
//   try {
//     // Start a transaction
//     await db.transaction(async (trx) => {
//       // Extract vehicle specifications and vehicle data from the combined payload
//       const vehicleSpecs = {
//         manufacturer: vehicle.manufacturer,
//         model: vehicle.model,
//         year: vehicle.year,
//         fuelType: vehicle.fuelType,
//         engineCapacity: vehicle.engineCapacity,
//         transmission: vehicle.transmission,
//         seatingCapacity: vehicle.seatingCapacity,
//         color: vehicle.color,
//         features: vehicle.features,
//       };

//       // Insert into VehicleSpecificationsTable and get the generated vehicle_id
//       const [newVehicleSpec] = await trx
//         .insert(VehicleSpecificationsTable)
//         .values(vehicleSpecs)
//         .returning();

//       // Insert into VehiclesTable using the generated vehicle_id
//       const vehicleData = {
//         vehicleSpecId: newVehicleSpec.vehicleId, // Use the generated ID
//         rentalRate: vehicle.rentalRate,
//         availability: vehicle.availability,
//       };
//       await trx.insert(VehiclesTable).values(vehicleData);

//       console.log("Vehicle and specifications inserted successfully");
//     });
//   } catch (error) {
//     console.error("Error inserting vehicle and specifications", error);
//   }
// };
export const createVehicleWithSpecifications = async (vehicleData: any) => {
    try {

        // Insert vehicle specifications into VehicleSpecificationsTable
        console.log(vehicleData);
        const createdSpec = await db.insert(VehicleSpecificationsTable).values({
            manufacturer: vehicleData.manufacturer,
            model: vehicleData.model,
            year: vehicleData.year,
            fuelType: vehicleData.fuelType,
            engineCapacity: vehicleData.engineCapacity,
            transmission: vehicleData.transmission,
            seatingCapacity: vehicleData.seatingCapacity,
            color: vehicleData.color,
            features: vehicleData.features
        }).returning();
  
        // Extract the created vehicle specification ID
        const vehicleSpecId = createdSpec[0].vehicleId;
  
        // Insert vehicle into VehiclesTable
        const createdVehicle = await db.insert(VehiclesTable).values({
            vehicleSpecId,
            rentalRate: vehicleData.rentalRate,
            availability: vehicleData.availability
        }).returning();
  
        return {
            vehicleSpec: createdSpec[0],
            vehicle: createdVehicle[0]
        };
    } catch (error) {
        console.error('Error creating vehicle with specifications:', error);
        throw new Error('Vehicle creation failed');
    }
};
