INSERT INTO admin_table(email, encrypted_password, first_name, surname) 
VALUES  ('admin@gmail.com', 'eYweUU23KK321MM', 'Admin', 'Admin');
	
INSERT INTO driver (email, encrypted_password, first_name, surname, 
price_per_km, is_approved, admin_id)
VALUES  ('goce.naumovski@gmail.com', 'eUoafcakfo23OKC', 'Goce', 'Naumovski',
		20, true, (SELECT admin_id FROM admin_table WHERE first_name='Admin')),
		('stole.petkov@gmail.com', 'ads2EA421da23DD', 'Stole', 'Petkov', 
		30, true, (SELECT admin_id FROM admin_table WHERE first_name='Admin')),
		('filip.filipovski@yahoo.com', 'adw321FAWF23cc', 'Filip', 'Filipovski',
		25, true, (SELECT admin_id FROM admin_table WHERE first_name='Admin'));

		
INSERT INTO car(license_plate, model, make, car_year, driver_id) 
VALUES  ('SK-424-NMK', 'Astra', 'Opel', 2012, (SELECT driver_id  FROM driver  WHERE first_name='Goce')),
		('KP-3213-MK', 'A7', 'Audi', 2020, (SELECT driver_id  FROM driver  WHERE first_name='Stole')),
		('PP-6453-NMK', '320d', 'BMW', 2015, (SELECT driver_id  FROM driver  WHERE first_name='Filip'));	


		
INSERT INTO passenger (email, encrypted_password, first_name, surname)
VALUES  ('marko.markovic@gmail.com', 'eYweUU23KK321MM', 'Marko', 'Markovic'),
		('petar.petkov@gmail.com', 'd4kAO421OPAWF2K', 'Petar', 'Petkovski'),
		('igor.dzambazov@yahoo.com', 'opa4paKLC213L', 'Igor', 'Dzambazov');

	
INSERT INTO request (city_address, street_address, number_address,  
latitude, longitude, passenger_id, confirmed_by_driver_id, chosen_driver_id)
VALUES  ('Skopje', '8-mi Septemvri', 100, 
								41.99393959013524, 21.417377667964814,
								(SELECT passenger_id FROM passenger WHERE first_name='Marko'),
								(SELECT driver_id FROM driver WHERE first_name='Goce'),
								(SELECT driver_id FROM driver WHERE first_name='Goce')),
		('Skopje', 'Sekspirova', 1000,
								42.00507009481923, 21.393345075915562,
								(SELECT passenger_id FROM passenger WHERE first_name='Petar'),
								(SELECT driver_id FROM driver WHERE first_name='Stole'),
								(SELECT driver_id FROM driver WHERE first_name='Stole')),
		('Skopje', 'Londonska', 2000,
								41.99818153071492, 21.39870949368447,
								(SELECT passenger_id FROM passenger WHERE first_name='Igor'),
								(SELECT driver_id FROM driver WHERE first_name='Filip'),
								(SELECT driver_id FROM driver WHERE first_name='Filip'));

	
INSERT INTO drive (driver_id, request_id, car_id, grade, km_travelled, destination_latitude, destination_longitude) 
VALUES 	((SELECT driver_id FROM driver WHERE first_name='Goce'), 
		 (SELECT request_id _id FROM request  WHERE number_address=100),
		 (SELECT car_id FROM car WHERE make='Opel'), 4.5, 10.1, 41.98658487414903, 21.417779251761253),
		((SELECT driver_id FROM driver WHERE first_name='Stole'), 
		 (SELECT request_id  FROM request  WHERE number_address=1000),
		 (SELECT car_id FROM car WHERE make='Audi'), 5.0, 2.2, 41.993953125548614, 21.436189933794598),
		((SELECT driver_id FROM driver WHERE first_name='Filip'), 
		 (SELECT request_id FROM request  WHERE number_address=2000),
		 (SELECT car_id FROM car  WHERE make='BMW'), 3.0, 5.4, 41.99806749233745, 21.391557977533605);
	

INSERT INTO payment (total_sum_payed, drive_id, passenger_id)
VALUES (20*10.1, 
			(SELECT drive_id FROM drive WHERE (SELECT driver_id FROM driver WHERE first_name='Goce')=driver_id),
			(SELECT passenger_id FROM passenger WHERE first_name='Marko')),
		(25*2.2, 
			(SELECT drive_id FROM drive WHERE (SELECT driver_id FROM driver WHERE first_name='Stole')=driver_id),
			(SELECT passenger_id FROM passenger WHERE first_name='Petar')),
		(30*5.4, 
			(SELECT drive_id FROM drive WHERE (SELECT driver_id FROM driver WHERE first_name='Filip')=driver_id),
			(SELECT passenger_id FROM passenger WHERE first_name='Igor'));