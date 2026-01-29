import PocketBase from 'https://cdn.jsdelivr.net/npm/pocketbase@0.21.5/+esm';

// For development
const isDev = window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1';

export const pb = new PocketBase(
  isDev 
    ? 'http://127.0.0.1:8090' 
    : 'http://34.63.118.19:8090' // Change in production
);

// Disable auto-cancellation
pb.autoCancellation(false);