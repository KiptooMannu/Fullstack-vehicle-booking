import { Hono } from "hono";
import { listFleetManagement, getFleetManagement, createFleetManagement, updateFleetManagement, deleteFleetManagement } from "./FleetManagement.controller";

export const fleetManagementRouter = new Hono();

// GET all fleet management records - /api/fleet-management
fleetManagementRouter.get("/fleet-management", listFleetManagement);

// GET a single fleet management record by ID - /api/fleet-management/:id
fleetManagementRouter.get("/fleet-management/:id", getFleetManagement);

// POST create a new fleet management record - /api/fleet-management
fleetManagementRouter.post("/fleet-management", createFleetManagement);

// PUT update a fleet management record by ID - /api/fleet-management/:id
fleetManagementRouter.put("/fleet-management/:id", updateFleetManagement);

// DELETE a fleet management record by ID - /api/fleet-management/:id
fleetManagementRouter.delete("/fleet-management/:id", deleteFleetManagement);
