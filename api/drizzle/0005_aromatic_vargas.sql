CREATE TABLE "coffee_shop_photos" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "coffee_shop_photos_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"coffee_shop_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"url" varchar(500) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "coffee_shop_photos_url_unique" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE "coffee_shop_comments" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "coffee_shop_comments_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"coffee_shop_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"url_photo" varchar(500) NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "coffee_shop_comments_url_photo_unique" UNIQUE("url_photo")
);
--> statement-breakpoint
CREATE TABLE "ratings" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "ratings_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"coffee_shop_id" integer NOT NULL,
	"score" numeric(3, 1) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "ratings_user_id_coffee_shop_id_unique" UNIQUE("user_id","coffee_shop_id")
);
--> statement-breakpoint
CREATE TABLE "twc_events" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "twc_events_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"coffee_shop_id" integer NOT NULL,
	"event_date" date NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "twc_events_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"username" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "want_to_try" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "want_to_try_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer,
	"coffee_shop_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "want_to_try_user_id_coffee_shop_id_unique" UNIQUE("user_id","coffee_shop_id")
);
--> statement-breakpoint
CREATE TABLE "zip_codes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "zip_codes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"zip" varchar(10) NOT NULL,
	"city" varchar(100) NOT NULL,
	"state" varchar(2) NOT NULL,
	CONSTRAINT "zip_codes_zip_unique" UNIQUE("zip")
);
--> statement-breakpoint
ALTER TABLE "coffee_shops" ADD COLUMN "google_id" varchar(315);--> statement-breakpoint
ALTER TABLE "coffee_shops" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "coffee_shops" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "coffee_shops" ADD COLUMN "coordinates" "point" NOT NULL;--> statement-breakpoint
ALTER TABLE "coffee_shops" ADD COLUMN "street_address" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "coffee_shops" ADD COLUMN "zip_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "coffee_shop_photos" ADD CONSTRAINT "coffee_shop_photos_coffee_shop_id_coffee_shops_id_fk" FOREIGN KEY ("coffee_shop_id") REFERENCES "public"."coffee_shops"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "coffee_shop_photos" ADD CONSTRAINT "coffee_shop_photos_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "coffee_shop_comments" ADD CONSTRAINT "coffee_shop_comments_coffee_shop_id_coffee_shops_id_fk" FOREIGN KEY ("coffee_shop_id") REFERENCES "public"."coffee_shops"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "coffee_shop_comments" ADD CONSTRAINT "coffee_shop_comments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_coffee_shop_id_coffee_shops_id_fk" FOREIGN KEY ("coffee_shop_id") REFERENCES "public"."coffee_shops"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "twc_events" ADD CONSTRAINT "twc_events_coffee_shop_id_coffee_shops_id_fk" FOREIGN KEY ("coffee_shop_id") REFERENCES "public"."coffee_shops"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "want_to_try" ADD CONSTRAINT "want_to_try_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "want_to_try" ADD CONSTRAINT "want_to_try_coffee_shop_id_coffee_shops_id_fk" FOREIGN KEY ("coffee_shop_id") REFERENCES "public"."coffee_shops"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "coffee_shops" ADD CONSTRAINT "coffee_shops_zip_id_zip_codes_id_fk" FOREIGN KEY ("zip_id") REFERENCES "public"."zip_codes"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "coffee_shops" DROP COLUMN "address";--> statement-breakpoint
ALTER TABLE "coffee_shops" DROP COLUMN "rating";--> statement-breakpoint
ALTER TABLE "coffee_shops" ADD CONSTRAINT "coffee_shops_google_id_unique" UNIQUE("google_id");--> statement-breakpoint
ALTER TABLE "coffee_shops" ADD CONSTRAINT "coffee_shops_coordinates_street_address_zip_id_unique" UNIQUE("coordinates","street_address","zip_id");