CREATE TABLE `passenger` (
	`passenger_id` uuid DEFAULT uuid_generate_v4(),
	`email` VARCHAR(255) NOT NULL,
  	`encrypted_password` VARCHAR(255) NOT NULL,
  	`first_name` VARCHAR(255) NOT NULL,
  	`role` VARCHAR(255) NOT NULL
  	`surname` VARCHAR(255) NOT NULL,
  	PRIMARY KEY (`passenger_id`)
);