import type { Issue } from './types';

export const issues: Issue[] = [
  {
    id: 'CIV-001',
    title: 'Large pothole on Main St',
    description: 'A very large and dangerous pothole has formed on Main Street, just past the intersection with Oak Avenue. It has already caused a flat tire for one vehicle.',
    category: 'Roads & Potholes',
    status: 'In Progress',
    location: { lat: 34.0522, lng: -118.2437 },
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://picsum.photos/seed/CIV-001/800/600',
    history: [
      {
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Reported',
        notes: 'Issue submitted by citizen.',
      },
      {
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'In Progress',
        notes: 'Assigned to Public Works crew #3. Scheduled for inspection.',
      },
    ],
  },
  {
    id: 'CIV-002',
    title: 'Streetlight out at Elm & 2nd',
    description: 'The streetlight on the northwest corner of Elm Street and 2nd Avenue is completely out. It\'s very dark and feels unsafe at night.',
    category: 'Streetlights',
    status: 'Reported',
    location: { lat: 34.058, lng: -118.251 },
    submittedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    history: [
      {
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        status: 'Reported',
        notes: 'Issue submitted by citizen. Awaiting department assignment.',
      },
    ],
  },
  {
    id: 'CIV-003',
    title: 'Overflowing trash can at City Park',
    description: 'The main trash can near the playground at City Park is overflowing. Garbage is starting to spill onto the ground.',
    category: 'Waste Management',
    status: 'Resolved',
    location: { lat: 34.045, lng: -118.24 },
    submittedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    resolvedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://picsum.photos/seed/CIV-003/800/600',
    history: [
      {
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Reported',
        notes: 'Issue submitted by citizen.',
      },
      {
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000 + 3600000).toISOString(),
        status: 'In Progress',
        notes: 'Sanitation crew dispatched.',
      },
      {
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Resolved',
        notes: 'Trash receptacle has been emptied. Area cleaned.',
      },
    ],
  },
  {
    id: 'CIV-004',
    title: 'Traffic light stuck on red',
    description: 'The northbound traffic light at the intersection of Pine and 5th is stuck on red, causing major backups.',
    category: 'Traffic Signals',
    status: 'Reported',
    location: { lat: 34.06, lng: -118.23 },
    submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    history: [
      {
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        status: 'Reported',
        notes: 'Urgent issue reported. Awaiting traffic control dispatch.',
      },
    ],
  },
  {
    id: 'CIV-005',
    title: 'Fallen tree branch blocking sidewalk',
    description: 'A large tree branch has fallen from a city tree and is completely blocking the sidewalk on Cedar Lane.',
    category: 'Parks & Rec',
    status: 'In Progress',
    location: { lat: 34.048, lng: -118.255 },
    submittedAt: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://picsum.photos/seed/CIV-005/800/600',
    history: [
      {
        timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Reported',
        notes: 'Issue submitted by citizen.',
      },
       {
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'In Progress',
        notes: 'Parks department crew scheduled for removal.',
      },
    ],
  },
];
