DROP EXTENSION IF EXISTS "uuid-ossp" cascade;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS payment;
DROP TABLE IF EXISTS drive;
DROP TABLE IF EXISTS request;
DROP TABLE IF EXISTS passenger;
DROP TABLE IF EXISTS car;
DROP TABLE IF EXISTS driver;
DROP TABLE IF EXISTS admin_table;


CREATE TABLE admin_table (
  	admin_id uuid DEFAULT uuid_generate_v4(),
  	email VARCHAR(255) NOT NULL,
  	encrypted_password VARCHAR(255) NOT NULL,
  	first_name VARCHAR(255) NOT NULL,
  	surname VARCHAR(255) NOT NULL,
  	PRIMARY KEY (admin_id)
);

CREATE TABLE driver(
	driver_id uuid DEFAULT uuid_generate_v4(),
	email VARCHAR(255) NOT NULL,
  	encrypted_password VARCHAR(255) NOT NULL,
  	first_name VARCHAR(255) NOT NULL,
  	surname VARCHAR(255) NOT NULL,
  	profile_picture BYTEA NULL,
  	price_per_km float NULL,
  	status VARCHAR(255) NOT NULL DEFAULT 'Available',
  	is_approved BOOLEAN NOT NULL DEFAULT 'false',
  	driver_level VARCHAR(255) NOT NULL DEFAULT 'Beginner',
  	num_grades INT NOT NULL DEFAULT 0,
  	grade FLOAT,
  	admin_id uuid,
  	PRIMARY KEY(driver_id),
	CONSTRAINT FK_admin FOREIGN KEY(admin_id) REFERENCES admin_table(admin_id)
);

CREATE TABLE car(
	car_id uuid DEFAULT uuid_generate_v4(),
	license_plate VARCHAR(16) NOT NULL,
	make VARCHAR(255) NOT NULL,
	car_year INT NOT NULL,
	model VARCHAR(255) NOT NULL,
	driver_id uuid NOT NULL,
	PRIMARY KEY (car_id),
	CONSTRAINT FK_driver FOREIGN KEY(driver_id) REFERENCES driver(driver_id)
);

CREATE TABLE passenger(
	passenger_id uuid DEFAULT uuid_generate_v4(),
	email VARCHAR(255) NOT NULL,
  	encrypted_password VARCHAR(255) NOT NULL,
  	first_name VARCHAR(255) NOT NULL,
  	surname VARCHAR(255) NOT NULL,
  	PRIMARY KEY(passenger_id)
);

CREATE TABLE request(
	request_id uuid DEFAULT uuid_generate_v4(),
	status VARCHAR(255) NOT NULL DEFAULT 'Created',
	city_address VARCHAR(255) NULL,
	street_address VARCHAR(255) NULL,
	number_address INT NULL,
	latitude FLOAT NOT NULL,
	longitude FLOAT NOT NULL,	
	passenger_id uuid NOT NULL,
	chosen_driver_id uuid,
	confirmed_by_driver_id uuid,
	PRIMARY KEY (request_id),
	CONSTRAINT FK_chosen_driver FOREIGN KEY(chosen_driver_id) REFERENCES driver(driver_id),
	CONSTRAINT FK_confirmed_by_driver FOREIGN KEY(confirmed_by_driver_id) REFERENCES driver(driver_id),
	CONSTRAINT FK_passenger FOREIGN KEY(passenger_id) REFERENCES passenger(passenger_id)
);

CREATE TABLE drive(
	drive_id uuid DEFAULT uuid_generate_v4(),
	grade FLOAT NULL,
	km_travelled FLOAT NOT NULL DEFAULT 0.0,
	start_time TIMESTAMP NULL,
	end_time TIMESTAMP NULL,
	status VARCHAR(255) DEFAULT 'Started',
	destination_latitude FLOAT,
	destination_longitude FLOAT,
	driver_id uuid NOT NULL,
	request_id uuid NOT NULL,
	car_id uuid NOT NULL,
	PRIMARY KEY(drive_id),
	CONSTRAINT FK_car FOREIGN KEY(car_id) REFERENCES car(car_id),
	CONSTRAINT FK_request FOREIGN KEY(request_id) REFERENCES request(request_id),
	CONSTRAINT FK_driver FOREIGN KEY(driver_id) REFERENCES driver(driver_id)
);

CREATE TABLE payment(
	payment_id uuid DEFAULT uuid_generate_v4(),
	total_sum_payed FLOAT NOT NULL,
	drive_id uuid NOT NULL,
	passenger_id uuid NOT NULL,
	PRIMARY KEY(payment_id),
	CONSTRAINT FK_drive FOREIGN KEY(drive_id) REFERENCES drive(drive_id),
	CONSTRAINT FK_passenger FOREIGN KEY(passenger_id) REFERENCES passenger(passenger_id)
);

ALTER TABLE payment
ADD COLUMN driver_tip FLOAT NOT NULL DEFAULT 0.0;

