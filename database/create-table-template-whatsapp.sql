CREATE TABLE `tbl_template_whatsapp` (
	id int NOT NULL AUTO_INCREMENT,
	title varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
	content text COLLATE utf8mb4_unicode_ci,
	meta_title varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Hello, We Are Getting Married',
	meta_description varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'We are getting married, online invitation by Padang Invitation',
	status int DEFAULT '1',
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)