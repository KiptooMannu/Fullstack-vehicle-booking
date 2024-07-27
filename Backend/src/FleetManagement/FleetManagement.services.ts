import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIFleetManagement, TSFleetManagement, FleetManagementTable, VehiclesTable } from "../drizzle/schema";

// Service to fetch fleet management records
export const fleetManagementService = async (limit?: number): Promise<TSFleetManagement[] | null> => {
    if (limit) {
        return await db.query.FleetManagementTable.findMany({
            limit: limit
        });
    }
    return await db.query.FleetManagementTable.findMany();
}

// Service to fetch a single fleet management record by ID
export const getFleetManagementService = async (id: number): Promise<TSFleetManagement | undefined> => {
    return await db.query.FleetManagementTable.findFirst({
        where: eq(FleetManagementTable.fleetId, id)
    });
}

// Service to create a new fleet management record
export const createFleetManagementService = async (fleet: TIFleetManagement): Promise<string> => {
    await db.insert(FleetManagementTable).values(fleet);
    return "Fleet management record created successfully";
}

// Service to update a fleet management record by ID
export const updateFleetManagementService = async (id: number, fleet: Partial<TIFleetManagement>): Promise<string> => {
    await db.update(FleetManagementTable).set(fleet).where(eq(FleetManagementTable.fleetId, id));
    return "Fleet management record updated successfully";
}

// Service to delete a fleet management record by ID
export const deleteFleetManagementService = async (id: number): Promise<string> => {
    await db.delete(FleetManagementTable).where(eq(FleetManagementTable.fleetId, id));
    return "Fleet management record deleted successfully";
}
