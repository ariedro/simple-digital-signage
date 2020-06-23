const UPDATE_TIMEOUT = 1000;

const onPlay = (videoElement, socket) => {
  if (!videoElement.seeking) socket.emit("clientUpdate", { paused: false });
};

const onPause = (videoElement, socket) => {
  if (!videoElement.seeking) socket.emit("clientUpdate", { paused: true });
};

const onSeeked = (currentTime, socket) => {
  alreadyUpdated = true;
  window.setTimeout(() => (alreadyUpdated = false), UPDATE_TIMEOUT);
  socket.emit("clientUpdate", { currentTime });
};

module.exports = { onPlay, onPause, onSeeked };
