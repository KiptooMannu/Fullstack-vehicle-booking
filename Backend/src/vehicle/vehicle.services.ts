import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIVehicle, TSVehicle, VehiclesTable, VehicleSpecificationsTable } from "../drizzle/schema";

// Service to fetch vehicles
export const vehiclesService = async (limit?: number): Promise<TSVehicle[] | null> => {
    if (limit) {
        return await db.query.VehiclesTable.findMany({
            limit: limit
        });
    }
    return await db.query.VehiclesTable.findMany();
}

// Service to fetch a single vehicle by ID
export const getVehicleService = async (id: number): Promise<TSVehicle | undefined> => {
    return await db.query.VehiclesTable.findFirst({
        // columns:{},
        where: eq(VehiclesTable.vehicleId, id),
        with:{

        }
        
    });
}

// Service to create a new vehicle
export const createVehicleService = async (vehicle: TIVehicle) => {
    await db.insert(VehiclesTable).values(vehicle);
    return "Vehicle created successfully";
}

// Service to update a vehicle by ID
export const updateVehicleService = async (id: number, vehicle: Partial<TIVehicle>) => {
    await db.update(VehiclesTable).set(vehicle).where(eq(VehiclesTable.vehicleId, id));
    return "Vehicle updated successfully";
}

// Service to delete a vehicle by ID
export const deleteVehicleService = async (id: number) => {
    await db.delete(VehiclesTable).where(eq(VehiclesTable.vehicleId, id));
    return "Vehicle deleted successfully";
}
