-- Initialization script for Neon PostgreSQL Database
-- This script creates the sample table and inserts test data
-- Run this from PowerShell: psql <connection_string> -f scripts/init-db.sql

-- Create sample table (if not exists)
CREATE TABLE IF NOT EXISTS playing_with_neon(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  value REAL
);

-- Insert sample data (only if table is empty)
INSERT INTO playing_with_neon(name, value)
  SELECT LEFT(md5(i::TEXT), 10), random() 
  FROM generate_series(1, 10) s(i)
  WHERE NOT EXISTS (SELECT 1 FROM playing_with_neon);

-- Display the results
SELECT 
  'playing_with_neon' as table_name,
  COUNT(*) as row_count 
FROM playing_with_neon;

-- Show sample data
SELECT * FROM playing_with_neon LIMIT 5;

-- Display table structure
\d playing_with_neon
