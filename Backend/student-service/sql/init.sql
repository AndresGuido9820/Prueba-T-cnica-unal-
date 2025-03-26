DO $$ 
BEGIN
   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'students') THEN
      CREATE DATABASE students;
   END IF;
END $$;


CREATE TABLE IF NOT EXISTS student (
   id TEXT PRIMARY KEY CHECK (LENGTH(id) > 0), -- La cédula como ID
   first_name TEXT NOT NULL,
   last_name TEXT NOT NULL,
   document_department TEXT,
   document_place TEXT,
   gender TEXT NOT NULL,
   ethnicity TEXT,
   personal_email TEXT UNIQUE NOT NULL,
   institutional_email TEXT UNIQUE NOT NULL,
   mobile_phone TEXT,
   landline_phone TEXT,
   birth_date TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   nationality TEXT NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_updated_at ON student;

CREATE TRIGGER trigger_updated_at
BEFORE UPDATE ON student
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();


