export function generateId() {
  let id = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (let i = 0; i < 12; i++) {
    id += characters.charAt(Math.floor(Math.random() * 36));
  }
  return id;
}

export default generateId;
