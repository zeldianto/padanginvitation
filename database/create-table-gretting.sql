CREATE TABLE tbl_gretting (
    id INT PRIMARY KEY AUTO_INCREMENT,
    slug VARCHAR(100),
    name VARCHAR(100),
    message TEXT,
    status INT,
    created_at TIMESTAMP DEFAULT CURRNT_TIMEESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (slug) REFERENCES tbl_order(slug) ON DELETE CASCADE ON UPDATE CASCADE
);
