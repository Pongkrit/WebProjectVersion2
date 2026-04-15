CREATE TABLE `Product`(
	ProductID 	CHAR(5),
    P_name 		VARCHAR(100)	NOT NULL,
    P_size 		INT				NOT NULL,
    P_description TEXT(1500),
    P_image		VARCHAR(200),
    P_price		INT				NOT NULL,
    P_quantity	INT				NOT NULL,
    P_material	CHAR(1)			NOT NULL,
    P_status	CHAR(1)			NOT NULL,
    P_overall	TEXT(750),
    P_color		VARCHAR(20)		NOT NULL,
    CONSTRAINT PK_ProductID PRIMARY KEY (ProductID)
);

CREATE TABLE `Account`(
	EmpID		CHAR(7),
    A_contact	CHAR(11)		NOT NULL,
    A_gender	CHAR(1)			NOT NULL,
    A_role		VARCHAR(100)	NOT NULL,
    A_fname		VARCHAR(100)	NOT NULL,
    A_lname		VARCHAR(100)	NOT NULL,
    A_image		VARCHAR(200)	NOT NULL,
    A_status	VARCHAR(7)		NOT NULL,
    A_email		VARCHAR(100)	NOT NULL,
    A_address	VARCHAR(200)	NOT NULL,
    CONSTRAINT PK_Account PRIMARY KEY (EmpID)
);

CREATE TABLE `Product_Management`(
	PM_id		INT,
	ProductID 	CHAR(5),
    EmpID		CHAR(7),
    `Date`		DATETIME		NOT NULL,
    `Action`	VARCHAR(200)	NOT NULL,
    CONSTRAINT PK_Product_Management PRIMARY KEY (PM_id),
	CONSTRAINT FK_Product_Management_ProductID FOREIGN KEY (ProductID)
	REFERENCES Product(ProductID),
	CONSTRAINT FK_Product_Management_EmpID FOREIGN KEY (EmpID)
	REFERENCES `Account`(EmpID) 
);

CREATE TABLE Login_Info(
	L_username	VARCHAR(107),
    L_password	VARCHAR(50)		NOT NULL,
    L_access	DATETIME		NOT NULL,
    EmpID		CHAR(7),
    CONSTRAINT PK_Login_Info PRIMARY KEY (L_username),
    CONSTRAINT FK_Login_Info FOREIGN KEY (EmpID)
    REFERENCES `Account`(EmpID)
);

CREATE TABLE `Account_Management`(
	AM_id		INT,
	P_EmpID 	CHAR(7),	-- Passive employee
    A_EmpID		CHAR(7),	-- Active employee
    `Date`		DATETIME		NOT NULL,
    `Action`	VARCHAR(200)	NOT NULL,
    CONSTRAINT PK_Account_Management PRIMARY KEY (AM_id),
	CONSTRAINT FK_Account_Management_P_EmpID FOREIGN KEY (P_EmpID)
	REFERENCES  `Account`(EmpID),
	CONSTRAINT FK_Account_Management_A_EmpID FOREIGN KEY (A_EmpID)
	REFERENCES `Account`(EmpID) 
);


-- Updated 
ALTER TABLE `Account`
MODIFY A_image VARCHAR(200);

ALTER TABLE `Product`
MODIFY P_color VARCHAR(50);



-- Note: You can insert Account Profile in A_image if you want.
INSERT INTO Account (
    EmpID, A_fname, A_lname, A_gender, A_role, A_email, A_contact, A_address, A_Status
) VALUES (
    'Emp0001', 'Engaugsorn', 'Augsornsakul', 'F', 'Manager', 'Engaugsorn.augsornsakul@gmail.com', '098-0256120', 'the Phahon Yothin Building, 400/22 Phahon Yothin Road, Sam Sen Nai Sub-district, Phaya Thai District, Bangkok.', 'enable'
);

INSERT INTO Account (
    EmpID, A_fname, A_lname, A_gender, A_role, A_email, A_contact, A_address, A_Status
) VALUES (
    'Emp0002', 'Saimai', 'Thongrod', 'F', 'Junior Admin', 'Saimai.thongrod@gmail.com', '098-0256121', '273 Samsen Road, Watsamphraya, Phra Nakhon District, Bangkok 10200', 'enable'
);

INSERT INTO Account (
    EmpID, A_fname, A_lname, A_gender, A_role, A_email, A_contact, A_address, A_Status
) VALUES (
    'Emp0003', 'Somsri', 'Rakrian', 'F', 'Junior Admin', 'Somsri.rakrian@gmail.com', '098-0256122', 'Bangkok Bank Public Company Limited, 333 Silom Road, Silom, Bangrak, Bangkok 10500 Thailand', 'disable'
);

INSERT INTO Account (
    EmpID, A_fname, A_lname, A_gender, A_role, A_email, A_contact, A_address, A_Status
) VALUES (
    'Emp0004', 'Benjamin', 'Yale', 'M', 'Senior Admin', 'Benjamin.yale@gmail.com', '098-0256123', '35 Sukhumvit Road, Klong Toey Nua Subdistrict, Wattana District Bangkok 10110, Thailand', 'disable'
);

INSERT INTO Account (
    EmpID, A_fname, A_lname, A_gender, A_role, A_email, A_contact, A_address, A_Status
) VALUES (
    'Emp0005', 'Molvara', 'Praoskaw', 'F', 'Senior Admin', 'Molvara@proskaw@gmail.com', '098-0256124', 'Head Ofc 66 Q House Asok Bldg Soi Asok Sukhumvit Rd. Khwang Khlongtoey Nuea, Khet Watthana, Bangkok 10110', 'enable'
);

INSERT INTO Account (
    EmpID, A_fname, A_lname, A_gender, A_role, A_email, A_contact, A_address, A_Status
) VALUES (
    'Emp0006', 'Rachapol', 'Worapansa', 'M', 'Junior Admin', 'Rachapol.worapansa@gmail.com', '098-0256125', 'Siam Commercial Bank, 9 Ratchadapisek Rd., Jatujak Bangkok 10900 Thailand', 'enable'
);

INSERT INTO Account (
    EmpID, A_fname, A_lname, A_gender, A_role, A_email, A_contact, A_address, A_Status
) VALUES (
    'Emp0007', 'Nonthanon', 'Chokchuay', 'M', 'Junior Admin', 'Nonthanon.chokchuay@gmail.com', '098-0256126', '1222 Rama III Road, Bang Phongphang, Yan Nawa, Bangkok 10120 Thailand', 'enable'
);

INSERT INTO Account (
    EmpID, A_fname, A_lname, A_gender, A_role, A_email, A_contact, A_address, A_Status
) VALUES (
    'Emp0008', 'Adrienna', 'Addison', 'F', 'Junior Admin', 'Adrienna.addison@gmail.com', '098-0256127', '209 KKP Tower, Sukhumvit 21 (Asoke), Khlong Toey Nua, Wattana, Bangkok 10110', 'enable'
);

INSERT INTO Account (
    EmpID, A_fname, A_lname, A_gender, A_role, A_email, A_contact, A_address, A_Status
) VALUES (
    'Emp0009', 'Alphonso', 'Polland', 'M', 'Junior Admin', 'Alphonso.polland@gmail.com', '098-0256140', 'United Overseas Bank (Thai) Public Company Limited, UOB Plaza Bangkok, 690 Sukhumvit Road, Khlong Tan, Khlong Toei, Bangkok 10110 Thailand', 'enable'
);

INSERT INTO Account (
    EmpID, A_fname, A_lname, A_gender, A_role, A_email, A_contact, A_address, A_Status
) VALUES (
    'Emp0010', 'Fahcram', 'Molterio', 'F', 'Junior Admin', 'Fahcram.molterio@gmail.com', '098-0256129', '470 Phaholyothin Road, Samsennai, Phaya Thai, Bangkok 10400, Thailand', 'enable'
);

INSERT INTO Account (
    EmpID, A_fname, A_lname, A_gender, A_role, A_email, A_contact, A_address, A_Status
) VALUES (
    'Emp0011', 'Wawwa', 'Chanikankorn', 'F', 'Junior Admin', 'Wawa.chanikankorn@gmail.com', '098-0256130', '1222 Rama III Road, Bang Phongphang, Yan Nawa, Bangkok 10120 Thailand', 'enable'
);

INSERT INTO Account_Management (AM_id, Date, Action, A_EmpID, P_EmpID) 
VALUES
(1, '2023-03-13 12:00:10', 'Delete', 'Emp0001', 'Emp0003'),
(2, '2023-03-14 12:00:10', 'Insert', 'Emp0001', 'Emp0004'),
(3, '2023-03-15 12:00:10', 'Delete', 'Emp0001', 'Emp0004'),
(4, '2023-03-16 12:00:10', 'Update', 'Emp0001', 'Emp0001'),
(5, '2023-03-17 12:00:10', 'Update', 'Emp0005', 'Emp0005'),
(6, '2023-03-18 12:00:10', 'Update', 'Emp0005', 'Emp0008'),
(7, '2023-03-19 12:00:10', 'Update', 'Emp0005', 'Emp0005'),
(8, '2023-03-20 12:00:10', 'Update', 'Emp0005', 'Emp0006'),
(9, '2023-03-21 12:00:10', 'Update', 'Emp0005', 'Emp0011'),
(10, '2023-03-22 12:00:10', 'Insert', 'Emp0002', 'Emp0009'),
(11, '2023-03-23 12:00:10', 'Insert', 'Emp0002', 'Emp0010');

INSERT INTO Login_Info (L_username, L_password, EmpID, L_access)
VALUES
('Engaugsorn0001', 	'0001',		'Emp0001', NOW()),
('Saimai0002', 		'0002', 	'Emp0002', NOW()),
('Somsri0003',		'0003',		'Emp0003', NOW()),
('Benjamin0004',	'0004',		'Emp0004', NOW()),
('Molvara0005',		'0005',		'Emp0005', NOW()),
('Rachapol0006',	'0006',		'Emp0006', NOW()),
('Nonthanon0007',	'0007',		'Emp0007', NOW()),
('Adrienna0008',	'0008',		'Emp0008', NOW()),
('Alphonso0009',	'0009',		'Emp0009', NOW()),
('Fahcram0010',		'0010',		'Emp0010', NOW()),
('Wawwa0011',		'0011',		'Emp0011', NOW());

INSERT INTO Product (
    ProductID, P_name, P_size, P_description, P_Overall, P_image, P_price, P_quantity, P_material, P_color, P_Status
) VALUES (
    'P0001', 'Rose Quartz Bracelet Feng Shui Bracelet Flower Charm (6 mm)', 6.00, 
    'Layer on some colorful energy with this genuine rose quartz bracelet! Our beaded bracelet features an elastic band and small rounded beads made from smooth, genuine rose quartz crystal...', 
    'Our bestselling rose quartz beaded bracelet can be worn solo or stacked with other magical crystal bracelets (our beaded rose quartz bracelet also comes in a matte version!) ...', 
    'https://drive.google.com/file/d/1BGXMo-W5uolPLwaOPIYTP5OGe1-Y5KRS/view?usp=drive_link', 7490.00, 100, 'Q', 'Pink', 'E'
);

INSERT INTO Product (
    ProductID, P_name, P_size, P_description, P_Overall, P_image, P_price, P_quantity, P_material, P_color, P_Status
) VALUES (
    'P0002', 'BigBigMe Burmese Jade Pearl Bracelet', 4.00, 
    'A beautiful and meaningful bracelet makes those who are separated feel connected. No matter where you are, the distance and time to be separated from someone may be difficult, but it will be sweet when you know that you have been missing each other...',
    'This bracelet is made of burmese jade and pearl. No reaction to sensitive skin, suitable for most women\'s wrists. Each bracelet has a high-quality box that can be used as a gift, as a gift to ...', 
    'https://drive.google.com/file/d/1w8z-F7XKodvrVDpmw5uq_4WmKSnNUmsS/view?usp=drive_link', 12490.00, 50, 'J', 'Green, White', 'E'
);

INSERT INTO Product (
    ProductID, P_name, P_size, P_description, P_Overall, P_image, P_price, P_quantity, P_material, P_color, P_Status
) VALUES (
    'P0003', 'Elegant Shaded Color Pearls Bracelet (golden)', 7.00, 
    'Want to embrace the feeling of being hopeful, free spirited and well traveled? Then the Rainbow Nomad styles are a great choice for you. They combine the colorful nomad vibes with the rainbow’s good fortune by adding unique freshwater pearls. Crafted in brass with 18-karat gold plating + e coating. Detailed in Glass Beadss & Cultured freshwater pearl. Finished with a lobster clasp.', 
    'Want to embrace the feeling of being hopeful, free spirited and well traveled? Then the Rainbow Nomad styles are a great choice for you. They combine the colorful nomad vibes with the rainbow’s good fortune by...', 
    'https://drive.google.com/file/d/1Tkgez-Gh1dBs7vmwX6LMeR3TLBg-YY68/view?usp=drive_link', 37190.00, 12, 'P', 'Yellow', 'E'
);

INSERT INTO Product (
    ProductID, P_name, P_size, P_description, P_Overall, P_image, P_price, P_quantity, P_material, P_color, P_Status
) VALUES (
    'P0004', 'Moonstone Labradorite Silver Crystal Bracelet (6 mm)', 6.00, 
    'Blue Moonstoneis called the "Lover\'s Stone", and it will reflect a slight light when exposed to light, like moonlight shining in the night sky. Since ancient times, this kind of ore has been used to represent the moon. Moonstone belongs to the feldspar family. Usually, albite and ice feldspar interact and interlayer each other to cause a halo effect.', 
    'Blue Moonstoneis called the "Lover\'s Stone", and it will reflect a slight light when exposed to light, like moonlight shining in the night sky. Since ancient times, this kind of ore has been used to represent the moon...', 
    'https://drive.google.com/file/d/1GpvkaqHM1aFdWvGs0mlaM4bboH_NNvqj/view?usp=drive_link', 9490.00, 38, 'M', 'White', 'E'
);

INSERT INTO Product (
    ProductID, P_name, P_size, P_description, P_Overall, P_image, P_price, P_quantity, P_material, P_color, P_Status
) VALUES (
    'P0005', 'Gemma Moonstone bracelet Flora charm (7 mm)', 7.00, 
    '"Hand knotted bracelets tend to relax with wear, so when in between sizes, we recommend sizing down. To find your size, we recommend measuring a bracelet you already love and wear."', 
    '"Hand knotted bracelets tend to relax with wear, so when in between sizes, we recommend sizing down. To find your size, we recommend measuring a bracelet you already love and wear."', 
    'https://drive.google.com/file/d/1ukzWPBQenc42KYkQCG8qh-BSb2YggWRK/view?usp=drive_link', 8330.00, 25, 'M', 'Green, White', 'E'
);

INSERT INTO Product (
    ProductID, P_name, P_size, P_description, P_Overall, P_image, P_price, P_quantity, P_material, P_color, P_Status
) VALUES (
    'P0006', 'Liudan Bracelet Pink Quartz Crystal Bracelet (5 mm)', 5.00, 
    'Rose Quartz is the stone of love and has a calming and positive vibration. Rose Quartz magnifies the heart and attracts love in all aspects of life including self-love, existing relationships, or future relationships. It promotes inner healing and peace....', 
    'Rose Quartz is the stone of love and has a calming and positive vibration. Rose Quartz magnifies the heart and attracts love in all aspects of life including self-love, existing relationships, or future relationships. It promotes inner healing and peace.', 
    'https://drive.google.com/file/d/17zvx-QmxMnGi7h3L0p9_t72_uR-3TRjP/view?usp=drive_link', 2770.00, 100, 'Q', 'Pink', 'E'
);

INSERT INTO Product (
    ProductID, P_name, P_size, P_description, P_Overall, P_image, P_price, P_quantity, P_material, P_color, P_Status
) VALUES (
    'P0007', 'Rose Quartz Bracelet with Leaf charm (5 mm)', 5.00, 
    'We Are Manufacturer and exporter of semi precious and precious stone , we have large variety of stone, cut and polished by excellent artisan and work force.', 
    'We Are Manufacturer and exporter of semi precious and precious stone , we have large variety of stone, cut and polished by excellent artisan and work force.', 
    'https://drive.google.com/file/d/1ctikVth5BuufWg1XnUnwj7enHTVCJ0OP/view?usp=drive_link', 3990.00, 120, 'Q', 'Pink', 'E'
);

INSERT INTO Product (
    ProductID, P_name, P_size, P_description, P_Overall, P_image, P_price, P_quantity, P_material, P_color, P_Status
) VALUES (
    'P0008', 'Strawberry Quartz Cat Eye Stone With Natural Crystal (6 MM)', 6.00, 
    'Pink cat\'s eye stone enhances love luck. It is a very popular love crystal. It can increase your own attractiveness and make people around you pay more attention to your charm.', 
    'Pink cat\'s eye stone enhances love luck. It is a very popular love crystal. It can increase your own attractiveness and make people around you pay more attention to your charm.', 
    'https://drive.google.com/file/d/12DRVDQKsKj2bT2wWg6W0eOeggcL0zcLK/view?usp=drive_link', 6490.00, 70, 'Q', 'Pink', 'E'
);

INSERT INTO Product (
    ProductID, P_name, P_size, P_description, P_Overall, P_image, P_price, P_quantity, P_material, P_color, P_Status
) VALUES (
    'P0010', 'Queen Conch with Rose Quartz Bracelet (5 MM)', 5.00, 
    'Rose Quartz open the heart to all types of love. It helps to raise your self esteem, restores confidence & balance emotions, it is also one of the best cryatals to use for positive self Affirmations.', 
    'Rose Quartz open the heart to all types of love. It helps to raise your self esteem, restores confidence & balance emotions, it is also one of the best cryatals to use for positive self Affirmations.', 
    'https://drive.google.com/file/d/1Clo4TtUqWUHYjuG3MjbCtwpjpLvmVP9z/view?usp=drive_link', 3670.00, 50, 'Q', 'Pink', 'D'
);

INSERT INTO Product (
    ProductID, P_name, P_size, P_description, P_Overall, P_image, P_price, P_quantity, P_material, P_color, P_Status
) VALUES (
    'P0011', 'Madagascar Rose Quartz, Kunzite (5 MM)', 5.00, 
    'LOVE, SELF LOVE, POSITIVITY CRYSTAL GEMSTONE CUSTOM BRACELETS | GEMSTONES: Madagascar Rose Quartz, Kunzite, Crackled Quartz in 14k Plated Rose Gold Hardware', 
    'LOVE, SELF LOVE, POSITIVITY CRYSTAL GEMSTONE CUSTOM BRACELETS | GEMSTONES: Madagascar Rose Quartz, Kunzite, Crackled Quartz in 14k Plated Rose Gold Hardware', 
    'https://drive.google.com/file/d/1XzX0XudwUKE5kxaJhFbPfAIfprclJTEb/view?usp=drive_link', 2999.00, 100, 'Q', 'Pink', 'E'
);

UPDATE Account
SET A_image = 
  CASE 
    WHEN EmpID = 'Emp0001' THEN 'https://drive.google.com/file/d/1Q32m4zk4Vpk52nGFMrTNYHKvjqHpDNVg/view?usp=sharing'
    WHEN EmpID = 'Emp0002' THEN 'https://drive.google.com/file/d/1awV2r944Qw1kT355Xo-GoIFTMZFCMfTS/view?usp=sharing'
    WHEN EmpID = 'Emp0003' THEN 'https://drive.google.com/file/d/1dmrE8yk7fboUU7z-SzznODxOrwtoq9I9/view?usp=sharing'
    WHEN EmpID = 'Emp0004' THEN 'https://drive.google.com/file/d/1DRVkw6yJOix5CYU1ngNcqzP60xnEzNmP/view?usp=sharing'
    WHEN EmpID = 'Emp0005' THEN 'https://drive.google.com/file/d/1NSrZsfECw3vzzmo90SL4frXFaztstv5e/view?usp=sharing'
    WHEN EmpID = 'Emp0006' THEN 'https://drive.google.com/file/d/1AlhnMsZFar3Cr6FaoIQl_AnVm5JgTarD/view?usp=sharing'
    WHEN EmpID = 'Emp0007' THEN 'https://drive.google.com/file/d/11tLTDvh5PEfFTYAIy2tewVPYSRXcWO_i/view?usp=sharing'
    WHEN EmpID = 'Emp0008' THEN 'https://drive.google.com/file/d/1EhV9Y-kEkZwMbCstZt7qB32fj6WZk6Oc/view?usp=sharing'
    WHEN EmpID = 'Emp0009' THEN 'https://drive.google.com/file/d/12qePehA2WEAFlPlAhD_kHNWGlxcWHV0Z/view?usp=sharing'
    WHEN EmpID = 'Emp0010' THEN 'https://drive.google.com/file/d/1q9gq_DPKY6YN451NpmgWYc6MIBHmHodH/view?usp=sharing'
    WHEN EmpID = 'Emp0011' THEN 'https://drive.google.com/file/d/1GY7GkyF_U1Ulw1LZWnNOvXo0G1TfAm2f/view?usp=sharing'
    ELSE A_image 
  END
WHERE EmpID IN ('Emp0001', 'Emp0002', 'Emp0003', 'Emp0004', 'Emp0005', 'Emp0006', 'Emp0007', 'Emp0008', 'Emp0009', 'Emp0010', 'Emp0011');
