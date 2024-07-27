import { Hono } from "hono";
import { listFleetManagement, getFleetManagement, createFleetManagement, updateFleetManagement, deleteFleetManagement } from "./FleetManagement.controller";
import { adminOrUserRoleAuth, adminRoleAuth } from "../middlewear/bearAuth";
import { fleetManagementSchema } from "../validators";
import { zValidator } from "@hono/zod-validator";

export const fleetManagementRouter = new Hono();

// GET all fleet management records - /api/fleet-management
fleetManagementRouter.get("/fleet-management",adminOrUserRoleAuth , listFleetManagement);

// GET a single fleet management record by ID - /api/fleet-management/:id
fleetManagementRouter.get("/fleet-management/:id",adminRoleAuth,getFleetManagement);

// POST create a new fleet management record - /api/fleet-management
fleetManagementRouter.post("/fleet-management",zValidator("json", fleetManagementSchema),adminRoleAuth,createFleetManagement);

// PUT update a fleet management record by ID - /api/fleet-management/:id
fleetManagementRouter.put("/fleet-management/:id",adminRoleAuth ,updateFleetManagement);

// DELETE a fleet management record by ID - /api/fleet-management/:id
fleetManagementRouter.delete("/fleet-management/:id",adminRoleAuth ,deleteFleetManagement);
