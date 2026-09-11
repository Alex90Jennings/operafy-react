function splitMinutes(totalSeconds) {
  const seconds = Number.isFinite(totalSeconds) && totalSeconds > 0 ? Math.floor(totalSeconds) : 0;
  return [Math.floor(seconds / 60), seconds % 60];
}

// 253 -> "4:13"
export function formatTime(totalSeconds) {
  const [minutes, seconds] = splitMinutes(totalSeconds);
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

// 253 -> "PT4M13S", for <time dateTime>
export function toIsoDuration(totalSeconds) {
  const [minutes, seconds] = splitMinutes(totalSeconds);
  return `PT${minutes}M${seconds}S`;
}

// 4000 -> "1 hr 7 min"
export function formatTotalDuration(totalSeconds) {
  const minutes = Math.round(totalSeconds / 60);
  return minutes >= 60 ? `${Math.floor(minutes / 60)} hr ${minutes % 60} min` : `${minutes} min`;
}

export function pluralize(count, singular, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}
