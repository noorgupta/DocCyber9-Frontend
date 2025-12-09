// Small date formatter utility for Eminent
// Exports: formatDate(isoString) -> e.g. "Oct 17, 2025 at 3:30 PM"

export function formatDate(isoString) {
  if (!isoString) return '—';

  // Accept Date, timestamp number, or ISO string
  let d;
  if (isoString instanceof Date) d = isoString;
  else if (typeof isoString === 'number') d = new Date(isoString);
  else d = new Date(isoString);

  if (Number.isNaN(d.getTime())) return 'Invalid date';

  // Format: Mon DD, YYYY at H:MM AM/PM
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const month = months[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();

  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  return `${month} ${day}, ${year} at ${hours}:${minutes} ${ampm}`;
}

export default formatDate;
