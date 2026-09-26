// Winter Arc Client API Service Layer
// Connects React Client to Express & MongoDB Backend
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5002/api' : '/api');

const getAuthHeaders = () => {
  const token = localStorage.getItem('winter_arc_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const api = {
  // Auth
  auth: {
    login: async (email, password) => {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return res.json();
    },
    register: async (name, email, password) => {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      return res.json();
    },
    getMe: async () => {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: getAuthHeaders()
      });
      return res.json();
    },
    forgotPassword: async (email) => {
      const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      return res.json();
    }
  },

  // Tasks
  tasks: {
    getAll: async (params = {}) => {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE_URL}/tasks${query ? `?${query}` : ''}`, {
        headers: getAuthHeaders()
      });
      return res.json();
    },
    create: async (taskData) => {
      const res = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(taskData)
      });
      return res.json();
    },
    update: async (id, updates) => {
      const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updates)
      });
      return res.json();
    },
    delete: async (id) => {
      const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return res.json();
    }
  },

  // Habits
  habits: {
    getAll: async () => {
      const res = await fetch(`${API_BASE_URL}/habits`, { headers: getAuthHeaders() });
      return res.json();
    },
    create: async (habitData) => {
      const res = await fetch(`${API_BASE_URL}/habits`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(habitData)
      });
      return res.json();
    },
    toggle: async (id) => {
      const res = await fetch(`${API_BASE_URL}/habits/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });
      return res.json();
    },
    delete: async (id) => {
      const res = await fetch(`${API_BASE_URL}/habits/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return res.json();
    }
  },

  // Goals
  goals: {
    getAll: async () => {
      const res = await fetch(`${API_BASE_URL}/goals`, { headers: getAuthHeaders() });
      return res.json();
    },
    create: async (goalData) => {
      const res = await fetch(`${API_BASE_URL}/goals`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(goalData)
      });
      return res.json();
    },
    update: async (id, updates) => {
      const res = await fetch(`${API_BASE_URL}/goals/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updates)
      });
      return res.json();
    },
    delete: async (id) => {
      const res = await fetch(`${API_BASE_URL}/goals/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return res.json();
    }
  },

  // Projects
  projects: {
    getAll: async () => {
      const res = await fetch(`${API_BASE_URL}/projects`, { headers: getAuthHeaders() });
      return res.json();
    },
    create: async (projData) => {
      const res = await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(projData)
      });
      return res.json();
    },
    update: async (id, updates) => {
      const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updates)
      });
      return res.json();
    },
    delete: async (id) => {
      const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return res.json();
    }
  },

  // Journal
  journal: {
    getAll: async (search = '') => {
      const res = await fetch(`${API_BASE_URL}/journal${search ? `?search=${encodeURIComponent(search)}` : ''}`, {
        headers: getAuthHeaders()
      });
      return res.json();
    },
    create: async (entryData) => {
      const res = await fetch(`${API_BASE_URL}/journal`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(entryData)
      });
      return res.json();
    },
    delete: async (id) => {
      const res = await fetch(`${API_BASE_URL}/journal/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return res.json();
    }
  },

  // DSA
  dsa: {
    get: async () => {
      const res = await fetch(`${API_BASE_URL}/dsa`, { headers: getAuthHeaders() });
      return res.json();
    },
    logProblem: async (problemData) => {
      const res = await fetch(`${API_BASE_URL}/dsa/problem`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(problemData)
      });
      return res.json();
    }
  },

  // AI Roadmap
  ai: {
    getRoadmap: async () => {
      const res = await fetch(`${API_BASE_URL}/ai`, { headers: getAuthHeaders() });
      return res.json();
    },
    updateTopic: async (id, status) => {
      const res = await fetch(`${API_BASE_URL}/ai/topic/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
      });
      return res.json();
    }
  },

  // Uploads
  uploads: {
    getAll: async (type = 'All') => {
      const res = await fetch(`${API_BASE_URL}/uploads${type !== 'All' ? `?type=${encodeURIComponent(type)}` : ''}`, {
        headers: getAuthHeaders()
      });
      return res.json();
    },
    create: async (uploadData) => {
      const res = await fetch(`${API_BASE_URL}/uploads`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(uploadData)
      });
      return res.json();
    },
    delete: async (id) => {
      const res = await fetch(`${API_BASE_URL}/uploads/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return res.json();
    }
  }
};
