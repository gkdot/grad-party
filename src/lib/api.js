const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new Error(
      typeof data === 'object' && data?.message
        ? data.message
        : `Request failed: ${response.status}`
    );
  }

  return data;
}

export const api = {
  admin: {
    login: (password) =>
      request('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ password }),
      }),
    logout: () =>
      request('/api/admin/logout', {
        method: 'POST',
      }),
    session: () => request('/api/admin/session'),
  },

  rsvps: {
    list: () => request('/api/rsvps'),
    create: (payload) =>
      request('/api/rsvps', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    delete: (id) =>
      request(`/api/rsvps/${id}`, {
        method: 'DELETE',
      }),
  },
};