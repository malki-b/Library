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

CREATE TABLE IF NOT EXISTS SubscriptionNum (
    id INT PRIMARY KEY,
    subscriptionNum INT UNIQUE,
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
    subscriptionId INT NOT NULL,
    bookId INT NOT NULL,
    lendDate DATE NOT NULL,
    returnDate DATE,
    FOREIGN KEY(subscriptionId) 
        REFERENCES users(id)
        ON DELETE CASCADE,
    FOREIGN KEY(bookId) 
        REFERENCES books(id)
        ON DELETE CASCADE
);

INSERT INTO users (name, email, address, role, numOfFamilyMembers, debt) VALUES
	('Mali', 'g025714084@gmail.com', 'Sulam Yaakov 10, Jerusalem', 'manager', 3, 0),
    ('Avi', 'avi@example.com', 'Herzl St 1, Jerusalem', 'subscription', 5, 0),
    ('Michal', 'michal@example.com', 'Yaffo St 2, Jerusalem', 'subscription', 3, 0),
    ('David', 'david@example.com', 'Ben Yehuda St 3, Jerusalem', 'subscription', 5, 0),
    ('Sarah', 'sara@example.com', 'Shlomo Hamelech St 4, Jerusalem', 'subscription', 2, 0),
    ('Yossi', 'yossi@example.com', 'Bar Ilan St 5, Jerusalem', 'subscription', 4, 50),
    ('Tamar', 'tamar@example.com', 'King George St 6, Jerusalem', 'subscription', 6, 0),
    ('Moshe', 'moshe@example.com', 'HaGivah St 7, Jerusalem', 'subscription', 8, 0),
    ('Rachel', 'rachel@example.com', 'Alenby St 8, Jerusalem', 'subscription', 10, 100),
    ('Shlomo', 'shlomo@example.com', 'Azza St 9, Jerusalem', 'subscription', 7, 0),
    ('Chaim', 'chaim@example.com', 'Jerusalem St 10, Jerusalem', 'subscription', 6, 0),
    ('Nechama', 'nechama@example.com', 'Rav Kook St 11, Jerusalem', 'subscription', 2, 0),
    ('Meir', 'meir@example.com', 'Yehuda St 12, Jerusalem', 'subscription', 8, 0),
    ('Leah', 'leah@example.com', 'Chabad St 13, Jerusalem', 'subscription', 5, 0),
    ( 'Oren', 'oren@example.com', 'HaMaalot St 14, Jerusalem', 'subscription', 3, 0),
    ('Roni', 'roni@example.com', 'Bialik St 15, Jerusalem', 'subscription', 4, 10),
    ('Orit', 'orit@example.com', 'Golda Meir St 16, Jerusalem', 'subscription', 2, 0),
    ('Eyal', 'eyal@example.com', 'Peretz St 17, Jerusalem', 'subscription', 3, 0),
    ('Dina', 'dina@example.com', 'Golan St 18, Jerusalem', 'subscription', 9, 0),
    ('Raz', 'raz@example.com', 'Shderot St 19, Jerusalem', 'subscription', 10, 0),
    ('Gila', 'gila@example.com', 'Petah Tikva St 20, Jerusalem', 'subscription', 2, 0),
    ('Ofer', 'ofer@example.com', 'King George St 21, Jerusalem', 'subscription', 3, 0),
    ('Malki', 'malki140718@gmail.com', 'Sulam Yaakov 2, Jerusalem', 'subscription', 7, 0);
    
INSERT INTO SubscriptionNum (id, subscriptionNum) VALUES
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
	('Haotzar Nishar BaMishPacha', 'Jakobson Shula', 'children', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2025/04/2074402-scaled.jpg', 55, 17),
    ('Lizkor Et Machar', 'Hofman Zecharia', 'adults', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2025/04/8282880.jpg', 78, 10),
    ('Olam Neche', 'Ana Batia', 'adults', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2021/06/1770-11.jpg', 28, 10),
    ('Ziyuf BeSahara', 'Eli VeGold', 'comics', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2025/04/1631334-scaled.jpg', 82, 3),
    ('Ki Mimenu', 'Klein Libi', 'adults', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2025/03/8282875-scaled.jpg', 87, 15),
    ('Chatzkel BaShook', 'Neinboim A', 'comics', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2025/03/8282866-1-scaled.jpg', 66, 2),
    ('Duplictim', 'Sapir Yonah', 'adults', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2025/03/2512-scaled.jpg', 82, 16),
    ('Hashavat Aveda', 'Valder Moshe', 'children', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2025/03/2074373-scaled.jpg', 69, 7),
    ('HaKir HaRevii', 'Rand Devory', 'adults', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2025/03/2074385-scaled.jpg', 89, 11),
    ('Yarushalmim Vareva', 'Catz Esty', 'children', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2024/09/2351-scaled.jpg', 28, 5),
    ('Debby, Kibalt Matana', 'Course Moran', 'adults', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2023/11/5721703.jpg', 30, 11),
    ('Hakol Matchil BaBaiy', 'Peleg Tirtza', 'children', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2024/06/1532.jpg', 74, 8),
    ('Kudiel Sod HaKeter', 'Katzen K', 'children', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2024/04/VAM_10642.jpg', 58, 6),
    ('Rozzy', 'Broyde Shoshi', 'children', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2023/09/2238-1.jpg', 65, 7),
    ('Mah Karah BaSof', 'Laiser Chani', 'children', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2023/09/2230-1.jpg', 58,6),
    ('Avak VeZahav', 'Srim Nechama', 'adults', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2023/09/2219.jpg', 65, 16),
    ('Yihyu Yamim', 'Blumenberd Brachi', 'adults', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2022/09/2115.jpg' , 70, 15),
    ('Hayom Ani', 'Ary N', 'adults', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2022/09/2114.jpg', 65, 15),
    ('War hero', 'R Lev', 'Comics', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2023/09/2227.jpg', 42, 19),
    ('The Hero from Cordoba', 'R Lev', 'Comics', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2023/09/2241-1.jpg', 42, 19),
    ('Contingency plan', 'R Lev', 'Comics', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2024/08/2342.jpg', 42, 19),
    ('Mystery in the Strait 1', 'Zvi Aryeh Adler', 'Comics', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2021/06/2940450.jpg', 35, 19),
    ('Mystery in the Strait 2', 'Zvi Aryeh Adler', 'Comics', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2021/06/2940507.jpg', 35, 19),
    ('From the depths of the sea', 'Zvi Aryeh Adler', 'Comics', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2020/11/2940307.jpg', 60, 19),
    ('Left behind', 'R Lev', 'youth', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2024/11/1090556-scaled.jpg', 16, 20),
    ('Rosie', 'Shoshi Broida', 'youth', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2023/09/2238-1.jpg', 49, 20),
    ('Spirals', 'Tami Epstein', 'youth', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2023/09/2220.jpg', 49, 20),
    ('Ice embroiderer', 'Ruthi Koenig', 'youth', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2021/06/1888-11.jpg', 50, 20),
    ('Good soul', 'Ruthi Koenig', 'youth', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2021/06/1723-11.jpg', 28, 20),
    ('Peace in the farm', 'Menucha Beckerman', 'children', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2024/04/VAM_11747.jpg', 84, 21),
    ('Dina Dee in the Garden of Unity', 'Menucha Beckerman', 'children', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2021/03/2052570.jpg', 28, 20),
    ('Dina Dee is forbidden to talk to strangers', 'Menucha Beckerman', 'children', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2020/11/2052488.jpg', 50, 20),
    ('Dina Dee is going to first grade', 'Menucha Beckerman', 'children', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2020/11/2052487.jpg', 50, 20),
    ('Dina is quite careful on the roads', 'Menucha Beckerman', 'children', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2020/11/2052485.jpg', 50, 20),
    ('Dina loves the garden very much', 'Menucha Beckerman', 'children', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2021/05/2050871.jpg', 50, 20),
    ('Shulinka 1', 'Menucha Beckerman', 'adults', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2021/05/2110417.jpg', 83, 20),
    ('Shulinka 2', 'Menucha Beckerman', 'adults', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2021/05/2110418.jpg', 83, 20),
    ('Shais children adopt Tami', 'Menucha Beckerman', 'youth', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2020/11/2050453-1.jpg', 60, 20),
    ('Shais children follow the traitor A.', 'Menucha Beckerman', 'youth', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2021/06/2050456-7.jpg', 60, 20),
    ('Shais children come to the rescue', 'Menucha Beckerman', 'youth', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2020/11/2050455-1.jpg', 60, 20),
    ('Tzomet HaDrorim', 'Hertzberg Chaya','adults', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2022/05/2082.jpg', 60, 15);
    
INSERT INTO lends(subscriptionId, bookId, lendDate, returnDate) VALUES
    (1, 5, '2025-01-01', '2025-01-05'),
    (2, 8, '2025-02-03', '2025-03-01'),
    (3, 7, '2025-02-10', '2025-03-05'),
    (3, 3, '2025-03-05', '2025-04-01'),
    (9, 11, '2025-04-01', '2025-04-22'),
    (10, 17, '2025-05-01', NULL),
    (14, 12, '2025-05-06', '2025-05-10'),
    (10, 15, '2025-05-10', NULL),
    (13, 7, '2025-05-15', NULL);
    