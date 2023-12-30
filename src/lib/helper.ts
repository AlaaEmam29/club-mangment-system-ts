const formatDate = (date: string): Date => new Date(date);
const MB_BYTES = 1000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export { formatDate, MB_BYTES, ACCEPTED_IMAGE_TYPES };
