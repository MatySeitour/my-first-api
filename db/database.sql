CREATE TABLE books(
	book_id INTEGER UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    author_id INTEGER UNSIGNED,
    title VARCHAR(100) NOT NULL,
    year INTEGER UNSIGNED NOT NULL DEFAULT 1900,
    language VARCHAR(2) NOT NULL DEFAULT "ES",
    cover_url VARCHAR(500),
    price DOUBLE(6,2) NOT NULL DEFAULT 10.0,
    sellable TINYINT(1) DEFAULT 1,
    copies INTEGER NOT NULL DEFAULT 1,
    description TEXT,
    UNIQUE KEY book_id 
     (book_id)
);

INSERT INTO books(author_id, title, year, language, price, sellable, copies)
    VALUES(1, "Batman Inicia", 2001, "EN", 20.00, 1, 200);