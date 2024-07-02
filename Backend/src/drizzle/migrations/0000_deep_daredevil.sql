DO $$ BEGIN
 CREATE TYPE "public"."booking_status" AS ENUM('pending', 'confirmed', 'canceled');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."payment_status" AS ENUM('pending', 'confirmed', 'canceled');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('admin', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "authentication" (
	"auth_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"password" varchar(100),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookings" (
	"booking_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"vehicle_id" integer NOT NULL,
	"branch_id" integer NOT NULL,
	"booking_date" timestamp,
	"return_date" timestamp,
	"total_amount" numeric,
	"booking_status" "booking_status" DEFAULT 'pending',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "branches" (
	"branch_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"address" varchar(100),
	"contact_phone" varchar(100),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fleet_management" (
	"fleet_id" serial PRIMARY KEY NOT NULL,
	"vehicle_id" integer NOT NULL,
	"acquisition_date" timestamp,
	"depreciation_rate" numeric,
	"current_value" numeric,
	"maintenance_cost" numeric,
	"status" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payments" (
	"payment_id" serial PRIMARY KEY NOT NULL,
	"booking_id" integer NOT NULL,
	"amount" numeric,
	"payment_status" "payment_status" DEFAULT 'pending',
	"payment_date" timestamp,
	"payment_method" varchar(100),
	"transaction_id" varchar(100),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "support_tickets" (
	"ticket_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"subject" varchar(100),
	"description" text,
	"status" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"full_name" text,
	"email" varchar(100),
	"contact_phone" varchar(100),
	"address" varchar(100),
	"role" "role" DEFAULT 'user',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vehicle_specifications" (
	"vehicle_id" serial PRIMARY KEY NOT NULL,
	"manufacturer" varchar(100),
	"model" varchar(100),
	"year" integer,
	"fuel_type" varchar(100),
	"engine_capacity" varchar(100),
	"transmission" varchar(100),
	"seating_capacity" integer,
	"color" varchar(100),
	"features" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vehicles" (
	"vehicle_id" serial PRIMARY KEY NOT NULL,
	"vehicle_spec_id" integer NOT NULL,
	"rental_rate" numeric,
	"availability" boolean,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "vehicles_vehicle_spec_id_unique" UNIQUE("vehicle_spec_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "authentication" ADD CONSTRAINT "authentication_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_vehicle_id_vehicles_vehicle_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("vehicle_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_branch_id_branches_branch_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("branch_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fleet_management" ADD CONSTRAINT "fleet_management_vehicle_id_vehicles_vehicle_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("vehicle_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_booking_id_bookings_booking_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("booking_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "support_tickets" ADD CONSTRAINT "support_tickets_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_vehicle_spec_id_vehicle_specifications_vehicle_id_fk" FOREIGN KEY ("vehicle_spec_id") REFERENCES "public"."vehicle_specifications"("vehicle_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
