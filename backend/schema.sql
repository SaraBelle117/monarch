DROP TABLE IF EXISTS lesson_requests;
DROP TABLE IF EXISTS lessons;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'teacher', 'admin') DEFAULT 'student',
    picture VARCHAR(255) DEFAULT NULL,
    bio TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE instruments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO instruments (name) VALUES
('Piano'), ('Guitar'), ('Voice'), ('Violin'), ('Drums'), ('Bass'), ('Ukulele'), ('Cello'), ('Flute'), ('Saxophone');

CREATE TABLE lessons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    studentId INT NOT NULL,
    teacherId INT,
    instrument VARCHAR(50) NOT NULL,
    campus ENUM('Fremont', 'Cupertino', 'Palo Alto') NOT NULL,
    scheduledAt DATETIME,
    status ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',
    notes TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (studentId) REFERENCES users(id),
    FOREIGN KEY (teacherId) REFERENCES users(id)
);

CREATE TABLE lesson_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    studentId INT NOT NULL,
    instrument VARCHAR(50) NOT NULL,
    campus ENUM('Fremont', 'Cupertino', 'Palo Alto') NOT NULL,
    preferredTime VARCHAR(100),
    reason TEXT,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE
);