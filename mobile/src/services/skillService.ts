const API_URL = 'http://192.168.1.7:8085/api';

async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'API Error');
  }
  return response.json();
}

// ─── SKILLS ───────────────────────────────────────────

export const getAllSkills = async () => {
  const response = await fetch(`${API_URL}/skills`);
  return handleResponse(response);
};

export const searchSkills = async (query: string) => {
  const response = await fetch(
    `${API_URL}/skills/search?title=${encodeURIComponent(query)}`
  );
  return handleResponse(response);
};

export const getSkillById = async (id: number) => {
  const response = await fetch(`${API_URL}/skills/${id}`);
  return handleResponse(response);
};

export const getUsersBySkill = async (skillId: number) => {
  const response = await fetch(`${API_URL}/skills/${skillId}/users`);
  return handleResponse(response);
};

// ─── USERS ────────────────────────────────────────────

export const getUserById = async (id: string) => {
  const response = await fetch(`${API_URL}/user/${id}`);
  return handleResponse(response);
};

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/user/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
};

export const registerUser = async (user: {
  id?: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  password: string;
  type: string;
}) => {
  const response = await fetch(`${API_URL}/user/inscrire`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return handleResponse(response);
};

export const updateUser = async (
  id: string,
  user: {
    nom?: string;
    prenom?: string;
    telephone?: string;
    email?: string;
    password?: string;
    type?: string;
  }
) => {
  const response = await fetch(`${API_URL}/user/update/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return handleResponse(response);
};
