console.log("SDS v1.0");
const socket = io();

let alreadyUpdated = false;

window.onload = () => {
  const videoElement = document.getElementById("remote-video");

  videoElement.addEventListener("play", () => onPlay(videoElement, socket));
  videoElement.addEventListener("pause", () => onPause(videoElement, socket));
  videoElement.addEventListener("seeked", ({ target: { currentTime } }) =>
    onSeeked(currentTime, socket)
  );
  socket.on("broadcastUpdate", (newStatus) =>
    onBroadcastUpdate(videoElement, newStatus, alreadyUpdated)
  );
};
