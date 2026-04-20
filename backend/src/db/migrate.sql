-- Add status column to bookings if it doesn't exist (for databases created before this column was added)
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS status ENUM('pending','confirmed','cancelled') NOT NULL DEFAULT 'pending'
  AFTER preferred_time;
