CREATE DATABASE IF not exists independentLibrary;

USE independentLibrary;

CREATE TABLE IF NOT EXISTS users 
(	id INT PRIMARY KEY,
    name VARCHAR(30),
    email VARCHAR(30),
    address VARCHAR(50), 
    role VARCHAR(15),
    num_of_people int,
    debt int DEFAULT 0
);

CREATE TABLE IF NOT EXISTS Subscription_Num (
    id INT,
    subscription_num INT,
    PRIMARY KEY(subscription_num), 
    PRIMARY KEY(id),
    FOREIGN KEY(id) 
        REFERENCES users(id) 
);

CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30),
    author_name VARCHAR(30),
    category VARCHAR(10),
    img VARCHAR(100),
    cost INT, 
    shelf INT
);

CREATE TABLE IF NOT EXISTS lends (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subscription_id INT NOT NULL,
    book_id INT NOT NULL,
    lend_date DATE NOT NULL,
    return_date DATE,
    FOREIGN KEY(subscription_id) 
        REFERENCES users(id),
    FOREIGN KEY(book_id) 
        REFERENCES books(id)
);

INSERT INTO users (name, email, address, role, num_of_people, debt) VALUES
    ('Avi', 'avi@example.com', 'Herzl St 1, Jerusalem', 'manager', 0, 0),
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
    ('malki', 'malki140718@gmail.com', 'Sulam Yaakov 2, Jerusalem', 'subscription', 7, 0);

INSERT INTO Subscription_Num (id, password) VALUES
    (100000, 995632),
    (100001, 874612),
    (100002, 784561),
    (100003, 546237),
    (100004, 953846),
    (100005, 379512),
    (100006, 398571),
    (100007, 268953),
    (100008, 891286),
    (100009, 507108),
    (100010, 635894),
    (100011, 326941),
    (100012, 951328),
    (100013, 232876),
    (100014, 225460),
    (100015, 125894),
    (100016, 451297),
    (100017, 129834),
    (100018, 128964),
    (100019, 128964);
INSERT INTO books(name, author_name, category, img, cost, shelf) VALUES
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
    ('Tzomet HaDrorim', 'Hertzberg Chaya','adults', 'https://www.sifreiorhachaim.co.il/wp-content/uploads/2022/05/2082.jpg', 60, 15);
    
INSERT INTO lends(subscription_id, book_id, lend_date, return_date) VALUES
    (100001, 5, '2025-01-01', '2025-01-05'),
    (100002, 8, '2025-02-03', '2025-03-01'),
    (100003, 7, '2025-02-10', '2025-03-05'),
    (100000, 3, '2025-03-05', '2025-04-01'),
    (100009, 11, '2025-04-01', '2025-04-22'),
    (100010, 17, '2025-05-01', NULL),
    (100014, 12, '2025-05-06', '2025-05-10'),
    (100010, 15, '2025-05-10', NULL),
    (100013, 7, '2025-05-15', NULL);