-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(500) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    due_date TIMESTAMP,
    estimated_hours DECIMAL(5,2),
    time_spent DECIMAL(5,2) DEFAULT 0,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on status for better query performance
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);

-- Create index on priority for better query performance
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);

-- Create index on due_date for better query performance
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);

-- Insert some sample data
INSERT INTO tasks (name, description, status, priority, due_date, estimated_hours, time_spent, started_at, progress) VALUES
    ('Complete project documentation', 'Write comprehensive documentation for the TaskMaster project including API docs, user guides, and deployment instructions', 'pending', 'high', CURRENT_TIMESTAMP + INTERVAL '7 days', 16.0, 0, NULL, 0),
    ('Set up development environment', 'Configure Docker, database, and development tools for the entire team', 'completed', 'high', CURRENT_TIMESTAMP - INTERVAL '2 days', 8.0, 8.5, CURRENT_TIMESTAMP - INTERVAL '3 days', 100),
    ('Design database schema', 'Create ERD and database design for tasks management with proper relationships and constraints', 'in_progress', 'medium', CURRENT_TIMESTAMP + INTERVAL '3 days', 12.0, 6.0, CURRENT_TIMESTAMP - INTERVAL '1 day', 50),
    ('Implement user authentication', 'Add JWT-based authentication system with role-based access control', 'pending', 'medium', CURRENT_TIMESTAMP + INTERVAL '14 days', 20.0, 0, NULL, 0),
    ('Write unit tests', 'Create comprehensive test suite for all modules including integration tests', 'pending', 'low', CURRENT_TIMESTAMP + INTERVAL '10 days', 15.0, 0, NULL, 0)
ON CONFLICT DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_tasks_updated_at 
    BEFORE UPDATE ON tasks 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
