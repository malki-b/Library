CREATE DATABASE IF NOT EXISTS independentLibrary;

USE independentLibrary;

CREATE TABLE IF NOT EXISTS users 
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30),
    email VARCHAR(30),
    address VARCHAR(50), 
    role VARCHAR(15),
    numOfFamilyMembers INT,
    debt INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS subscriberNum (
    id INT PRIMARY KEY,
    subscriberNum INT UNIQUE,
    FOREIGN KEY(id) 
        REFERENCES users(id) 
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    authorName VARCHAR(30),
    category VARCHAR(10),
    img VARCHAR(100),
    cost INT, 
    shelf INT
);

CREATE TABLE IF NOT EXISTS lends (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subscriberId INT NOT NULL,
    bookId INT NOT NULL,
    lendDate DATE NOT NULL,
    returnDate DATE,
    FOREIGN KEY(subscriberId) 
        REFERENCES users(id)
        ON DELETE CASCADE,
    FOREIGN KEY(bookId) 
        REFERENCES books(id)
        ON DELETE CASCADE
);

INSERT INTO users (name, email, address, role, numOfFamilyMembers, debt) VALUES
	('Mali', 'g025714084@gmail.com', 'Sulam Yaakov 10, Jerusalem', 'manager', 3, 0),
    ('Avi', 'avi@example.com', 'Herzl St 1, Jerusalem', 'subscriber', 5, 0),
    ('Michal', 'michal@example.com', 'Yaffo St 2, Jerusalem', 'subscriber', 3, 0),
    ('David', 'david@example.com', 'Ben Yehuda St 3, Jerusalem', 'subscriber', 5, 0),
    ('Sarah', 'sara@example.com', 'Shlomo Hamelech St 4, Jerusalem', 'subscriber', 2, 0),
    ('Yossi', 'yossi@example.com', 'Bar Ilan St 5, Jerusalem', 'subscriber', 4, 50),
    ('Tamar', 'tamar@example.com', 'King George St 6, Jerusalem', 'subscriber', 6, 0),
    ('Moshe', 'moshe@example.com', 'HaGivah St 7, Jerusalem', 'subscriber', 8, 0),
    ('Rachel', 'rachel@example.com', 'Alenby St 8, Jerusalem', 'subscriber', 10, 100),
    ('Micha', 'm0583243808@gmail.com', 'Azza St 9, Jerusalem', 'subscriber', 7, 0),
    ('Chaim', 'chaim@example.com', 'Jerusalem St 10, Jerusalem', 'subscriber', 6, 0),
    ('Nechama', 'nechama@example.com', 'Rav Kook St 11, Jerusalem', 'subscriber', 2, 0),
    ('Meir', 'meir@example.com', 'Yehuda St 12, Jerusalem', 'subscriber', 8, 0),
    ('Leah', 'leah@example.com', 'Chabad St 13, Jerusalem', 'subscriber', 5, 0),
    ( 'Oren', 'oren@example.com', 'HaMaalot St 14, Jerusalem', 'subscriber', 3, 0),
    ('Roni', 'roni@example.com', 'Bialik St 15, Jerusalem', 'subscriber', 4, 10),
    ('Orit', 'orit@example.com', 'Golda Meir St 16, Jerusalem', 'subscriber', 2, 0),
    ('Eyal', 'eyal@example.com', 'Peretz St 17, Jerusalem', 'subscriber', 3, 0),
    ('Dina', 'dina@example.com', 'Golan St 18, Jerusalem', 'subscriber', 9, 0),
    ('Raz', 'raz@example.com', 'Shderot St 19, Jerusalem', 'subscriber', 10, 0),
    ('Gila', 'gila@example.com', 'Petah Tikva St 20, Jerusalem', 'subscriber', 2, 0),
    ('Ofer', 'ofer@example.com', 'King George St 21, Jerusalem', 'subscriber', 3, 0),
    ('Malki', 'malki140718@gmail.com', 'Sulam Yaakov 2, Jerusalem', 'subscriber', 7, 0);
    
INSERT INTO subscriberNum (id, subscriberNum) VALUES
    (1, 654321),
    (2, 784561),
    (3, 546237),
    (4, 953846),
    (5, 379512),
    (6, 398571),
    (7, 268953),
    (8, 891286),
    (9, 507108),
    (10, 635894),
    (11, 326941),
    (12, 951328),
    (13, 232876),
    (14, 225460),
    (15, 125894),
    (16, 451297),
    (17, 129834),
    (18, 128964),
    (19, 128324),
	(20, 995632),
    (21, 362847),
    (22, 257961),
    (23, 123456);
INSERT INTO books(name, authorName, category, img, cost, shelf) VALUES
	('Haotzar Nishar BaMishPacha', 'Jakobson Shula', 'children', '../../img/books images/HaOtzar Nishar Bamishpach 2074402-scaled.jpg', 55, 17),
    ('Lizkor Et Machar', 'Hofman Zecharia', 'adults', '../../img/books images/Lizcor Et Machar8282880.jpg', 78, 10),
    ('Olam Neche', 'Ana Batia', 'adults', '../../img/books images/Olam Neche1770-11.jpg', 28, 10),
    ('Ziyuf BeSahara', 'Eli VeGold', 'comics', '../../img/books images/Ziyuf Besahara1631334-scaled.jpg', 82, 3),
    ('Ki Mimenu', 'Klein Libi', 'adults', '../../img/books images/Ki Mimenu8282875-scaled.jpg', 87, 15),
    ('Chatzkel BaShook', 'Neinboim A', 'comics', '../../img/books images/Chatzkel Bashook8282866-1-scaled.jpg', 66, 2),
    ('Duplictim', 'Sapir Yonah', 'adults', '../../img/books images/Dupliktim2512-scaled.jpg', 82, 16),
    ('Hashavat Aveda', 'Valder Moshe', 'children', '../../img/books images/HashavatAveida2074373-scaled.jpg', 69, 7),
    ('HaKir HaRevii', 'Rand Devory', 'adults', '../../img/books images/Hakir Harevii2074385-scaled.jpg', 89, 11),
    ('Yarushalmim Vareva', 'Catz Esty', 'children', '../../img/books images/Yerushalmim Vareva2351-scaled.jpg', 28, 5),
    ('Debby, Kibalt Matana', 'Course Moran', 'adults', '../../img/books images/Debbi Kibalt Matana5721703.jpg', 30, 11),
    ('Hakol Matchil BaBaiy', 'Peleg Tirtza', 'children', '../../img/books images/Hakol Matchil Babayit1532.jpg', 74, 8),
    ('Kudiel Sod HaKeter', 'Katzen K', 'children', '../../img/books images/Kodiel Sod HaketerVAM_10642.jpg', 58, 6),
    ('Rozzy', 'Broyde Shoshi', 'children', '../../img/books images/Rozy2238-1.jpg', 65, 7),
    ('Mah Karah BaSof', 'Laiser Chani', 'children', '../../img/books images/Ma Kara Basof2230-1.jpg', 58,6),
    ('Avak VeZahav', 'Srim Nechama', 'adults', '../../img/books images/Avak Vezahav2219.jpg', 65, 16),
    ('Yihyu Yamim', 'Blumenberd Brachi', 'adults', '../../img/books images/Yiyu Yamim2115.jpg' , 70, 15),
    ('Hayom Ani', 'Ary N', 'adults', '../../img/books images/Hayom Ani2114.jpg', 65, 15),
    ('Mystery in the Strait 1', 'Zvi Aryeh Adler', 'Comics', '../../img/books images/Mistorin Bametzar.jpg', 35, 19);
    
        
INSERT INTO lends(subscriberId, bookId, lendDate, returnDate) VALUES
    (1, 5, '2025-01-01', '2025-01-05'),
    (2, 8, '2025-02-03', '2025-03-01'),
    (3, 7, '2025-02-10', '2025-03-05'),
    (3, 3, '2025-03-05', '2025-04-01'),
    (9, 11, '2025-04-01', '2025-04-22'),
    (10, 17, '2025-05-01', NULL),
    (14, 12, '2025-05-06', '2025-05-10'),
    (10, 15, '2025-05-10', NULL),
    (13, 7, '2025-05-15', NULL);
