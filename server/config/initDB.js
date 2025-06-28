
const supabase = require('./database');

const createTables = async () => {
  try {
    console.log('Setting up Supabase database tables...');

    // Note: In Supabase, you should create these tables through the Supabase dashboard
    // or using the SQL editor. This is just for reference.
    
    const sqlQueries = [
      // Users table (extends Supabase auth.users)
      `
      CREATE TABLE IF NOT EXISTS public.users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'supervisor', 'client')),
        status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
        auth_user_id UUID REFERENCES auth.users(id),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      `,
      
      // Projects table
      `
      CREATE TABLE IF NOT EXISTS public.projects (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        client_id UUID REFERENCES public.users(id),
        supervisor_id UUID REFERENCES public.users(id),
        status VARCHAR(50) DEFAULT 'planning' CHECK (status IN ('planning', 'in_progress', 'completed', 'on_hold')),
        start_date DATE,
        end_date DATE,
        budget DECIMAL(12,2),
        progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      `,
      
      // Tasks table
      `
      CREATE TABLE IF NOT EXISTS public.tasks (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        assigned_to UUID REFERENCES public.users(id),
        status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'blocked')),
        priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
        due_date DATE,
        progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      `,
      
      // Photos table
      `
      CREATE TABLE IF NOT EXISTS public.photos (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
        task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE,
        uploaded_by UUID REFERENCES public.users(id),
        filename VARCHAR(255) NOT NULL,
        original_name VARCHAR(255) NOT NULL,
        file_path VARCHAR(500) NOT NULL,
        file_size INTEGER,
        category VARCHAR(50) DEFAULT 'progress' CHECK (category IN ('progress', 'quality', 'safety', 'materials', 'equipment')),
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      `
    ];

    // Execute queries using Supabase RPC or handle through dashboard
    console.log('Database tables should be created through Supabase dashboard');
    console.log('Please run the following SQL in your Supabase SQL editor:');
    console.log(sqlQueries.join('\n\n'));

    // Create default users (this should be done after setting up auth)
    await createDefaultUsers();

  } catch (error) {
    console.error('Error setting up database:', error);
    throw error;
  }
};

const createDefaultUsers = async () => {
  try {
    // Check if users already exist
    const { data: existingUsers } = await supabase
      .from('users')
      .select('email')
      .in('email', ['admin@construction.com', 'supervisor@construction.com', 'client@construction.com']);

    if (existingUsers && existingUsers.length > 0) {
      console.log('Default users already exist');
      return;
    }

    const defaultUsers = [
      {
        email: 'admin@construction.com',
        name: 'Admin User',
        role: 'admin',
        status: 'active'
      },
      {
        email: 'supervisor@construction.com',
        name: 'John Smith',
        role: 'supervisor',
        status: 'active'
      },
      {
        email: 'client@construction.com',
        name: 'Jane Doe',
        role: 'client',
        status: 'active'
      }
    ];

    const { error } = await supabase
      .from('users')
      .insert(defaultUsers);

    if (error) {
      console.error('Error creating default users:', error);
    } else {
      console.log('Default users created successfully');
    }

  } catch (error) {
    console.error('Error in createDefaultUsers:', error);
  }
};

module.exports = { createTables };
