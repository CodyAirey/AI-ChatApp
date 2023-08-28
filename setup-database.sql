CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    message TEXT,
    time BIGINT
);

INSERT INTO messages (name, message, time)
VALUES ('Elon Musk', 'Going to Mars soon!', UNIX_TIMESTAMP());

INSERT INTO messages (name, message, time)
VALUES ('Spongebob', 'I\'m ready!', UNIX_TIMESTAMP());

INSERT INTO messages (name, message, time)
VALUES ('Harry Potter', 'Expecto Patronum!', UNIX_TIMESTAMP());

INSERT INTO messages (name, message, time)
VALUES ('Elon Musk', 'Tesla\'s latest innovations are amazing.', UNIX_TIMESTAMP());

INSERT INTO messages (name, message, time)
VALUES ('Spongebob', 'F is for friends who do stuff together...', UNIX_TIMESTAMP());