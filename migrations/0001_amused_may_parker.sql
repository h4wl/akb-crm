CREATE TABLE "accounts_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"route_id" integer NOT NULL,
	"account_name" text NOT NULL,
	"account_number" text NOT NULL,
	"address" text,
	"city" text,
	"state" text,
	"zip_code" text,
	CONSTRAINT "accounts_table_account_number_unique" UNIQUE("account_number")
);
--> statement-breakpoint
CREATE TABLE "routes_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"route_name" text NOT NULL,
	"description" text NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users_table" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "accounts_table" ADD CONSTRAINT "accounts_table_route_id_routes_table_id_fk" FOREIGN KEY ("route_id") REFERENCES "public"."routes_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "routes_table" ADD CONSTRAINT "routes_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;