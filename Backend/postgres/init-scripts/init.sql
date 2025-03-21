-- Crear la tabla de estudiantes
CREATE TABLE IF NOT EXISTS student (
    id TEXT PRIMARY KEY CHECK (LENGTH(id) > 0), 
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

-- Crear la función para actualizar 'updated_at'
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear el trigger asociado a la tabla 'student'
DROP TRIGGER IF EXISTS trigger_updated_at ON student;

CREATE TRIGGER trigger_updated_at
BEFORE UPDATE ON student
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Crear la tabla de cursos
CREATE TABLE IF NOT EXISTS course (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla de inscripciones
CREATE TABLE IF NOT EXISTS enrollment (
    id SERIAL PRIMARY KEY,
    student_id TEXT NOT NULL REFERENCES student(id),
    course_id INT NOT NULL REFERENCES course(id),
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
