/*
  # Streaming Platform Schema

  1. New Tables
    - `users` - Store user information and wallet addresses
    - `content` - Store movie/show metadata and streaming sources
    - `purchases` - Track content purchases
    - `watch_history` - Track user viewing history
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_login timestamptz
);

-- Create content table
CREATE TABLE IF NOT EXISTS content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  poster_url text,
  stream_url text NOT NULL,
  content_type text NOT NULL CHECK (content_type IN ('movie', 'tv')),
  price numeric NOT NULL DEFAULT 25,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create purchases table
CREATE TABLE IF NOT EXISTS purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  content_id uuid REFERENCES content(id) NOT NULL,
  transaction_hash text NOT NULL,
  amount numeric NOT NULL,
  purchased_at timestamptz DEFAULT now(),
  UNIQUE(user_id, content_id)
);

-- Create watch history table
CREATE TABLE IF NOT EXISTS watch_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  content_id uuid REFERENCES content(id) NOT NULL,
  watched_at timestamptz DEFAULT now(),
  progress numeric DEFAULT 0
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE watch_history ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Anyone can read content" ON content
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Users can read own purchases" ON purchases
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create purchases" ON purchases
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can read own watch history" ON watch_history
  FOR ALL TO authenticated
  USING (user_id = auth.uid());