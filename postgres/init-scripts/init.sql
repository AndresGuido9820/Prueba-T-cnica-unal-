CREATE TABLE IF NOT EXISTS Student (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    dateOfBirth TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear función para actualizar el campo updatedAt
CREATE OR REPLACE FUNCTION update_updatedAt_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updatedAt = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger para actualizar el campo updatedAt en cada UPDATE
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON Student
FOR EACH ROW
EXECUTE FUNCTION update_updatedAt_column();


CREATE TABLE Course (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    capacity INT DEFAULT 30,
    createdat TIMESTAMP DEFAULT NOW(),
    updatedat TIMESTAMP DEFAULT NOW()
);

CREATE TABLE enrollment (
    id SERIAL PRIMARY KEY,
    studentid INT NOT NULL,
    courseid INT NOT NULL,
    enrolledat TIMESTAMP DEFAULT NOW(),
    updatedat TIMESTAMP DEFAULT NOW(),
    UNIQUE (studentid, courseid)
);

CREATE TABLE courseenrollmentcount (
    id SERIAL PRIMARY KEY,
    courseid INT UNIQUE NOT NULL,
    count INT DEFAULT 0,
    capacity INT DEFAULT 30,
    updatedat TIMESTAMP DEFAULT NOW()
);

