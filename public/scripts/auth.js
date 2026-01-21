import { pb } from './pb.js';

export async function requireAuth() {
  if (!pb.authStore.isValid) {
    window.location.href = '/login.html';
    return null;
  }
  return pb.authStore.model;
}

export async function signOut() {
  pb.authStore.clear();
  window.location.href = '/';
}

export function getCurrentUser() {
  return pb.authStore.model;
}

export async function initAuth() {
  if (pb.authStore.isValid) {
    try {
      await pb.collection('users').authRefresh();
    } catch (err) {
      console.error('Token refresh failed:', err);
      pb.authStore.clear();
    }
  }
}