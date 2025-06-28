
const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth methods
  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // User methods
  async getUsers() {
    return this.request('/users');
  }

  async getUserProfile() {
    return this.request('/users/profile');
  }

  async updateUser(id, userData) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Project methods
  async getProjects() {
    return this.request('/projects');
  }

  async createProject(projectData) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  }

  async updateProjectProgress(id, progress) {
    return this.request(`/projects/${id}/progress`, {
      method: 'PUT',
      body: JSON.stringify({ progress }),
    });
  }

  // Task methods
  async getProjectTasks(projectId) {
    return this.request(`/tasks/project/${projectId}`);
  }

  async createTask(taskData) {
    return this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  async updateTaskStatus(id, status, progress) {
    return this.request(`/tasks/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, progress }),
    });
  }

  // Photo methods
  async uploadPhotos(formData) {
    return this.request('/photos/upload', {
      method: 'POST',
      headers: {}, // Remove Content-Type to let browser set it for FormData
      body: formData,
    });
  }

  async getProjectPhotos(projectId) {
    return this.request(`/photos/project/${projectId}`);
  }

  async getPhotos(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(`/photos${queryParams ? `?${queryParams}` : ''}`);
  }

  async deletePhoto(id) {
    return this.request(`/photos/${id}`, {
      method: 'DELETE',
    });
  }
}

export default new ApiService();
