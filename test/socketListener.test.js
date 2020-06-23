const { onBroadcastUpdate } = require("../frontend/socketListener");

const TIMESTAMP = 1000;
let defaultVideoElement;
let defaultSocket;

describe("Socket Listener", () => {
  beforeEach(() => {
    videoElement = {
      currentTime: TIMESTAMP,
      play: jest.fn(),
      pause: jest.fn(),
    };
    newStatus = {};
    alreadyUpdated = false;
  });
  describe("onBroadcastUpdate", () => {
    test("should execute succesfully", () =>
      expect(() =>
        onBroadcastUpdate(videoElement, newStatus, alreadyUpdated)
      ).not.toThrow(Error));
    test("should play if update is not paused", () => {
      newStatus.paused = false;
      onBroadcastUpdate(videoElement, newStatus, alreadyUpdated);
      expect(videoElement.play).toHaveBeenCalledTimes(1);
    });
    test("should pause if update is paused", () => {
      newStatus.paused = true;
      onBroadcastUpdate(videoElement, newStatus, alreadyUpdated);
      expect(videoElement.pause).toHaveBeenCalledTimes(1);
    });
    test("should not play or pause if the update is not about that", () => {
      onBroadcastUpdate(videoElement, newStatus, alreadyUpdated);
      expect(videoElement.play).toHaveBeenCalledTimes(0);
      expect(videoElement.pause).toHaveBeenCalledTimes(0);
    });
    test("should set status currentTime", () => {
      newStatus.currentTime = TIMESTAMP + 1;
      onBroadcastUpdate(videoElement, newStatus, alreadyUpdated);
      expect(videoElement.currentTime).toBe(TIMESTAMP + 1);
    });
    test("should not set status currentTime if the video element already updated", () => {
      newStatus.currentTime = TIMESTAMP + 1;
      alreadyUpdated = true;
      onBroadcastUpdate(videoElement, newStatus, alreadyUpdated);
      expect(videoElement.currentTime).not.toBe(TIMESTAMP + 1);
    });
  });
});
