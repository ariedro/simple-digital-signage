const onBroadcastUpdate = (videoElement, newStatus, alreadyUpdated) => {
  if (newStatus.paused !== undefined)
    if (newStatus.paused) videoElement.pause();
    else videoElement.play();
  if (newStatus.currentTime && !alreadyUpdated)
    videoElement.currentTime = newStatus.currentTime;
};

module.exports = { onBroadcastUpdate };
