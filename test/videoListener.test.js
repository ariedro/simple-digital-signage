const { onPlay, onPause, onSeeked } = require("../frontend/videoListener");

let defaultVideoElement;
let defaultSocket;

describe("Video Listener", () => {
  beforeEach(() => {
    videoElement = { seeking: false };
    socket = { emit: jest.fn() };
  });
  describe("onPlay", () => {
    test("should execute succesfully", () =>
      expect(() => onPlay(videoElement, socket)).not.toThrow(Error));
    test("should emit a message to the socket", () => {
      onPlay(videoElement, socket);
      expect(socket.emit).toHaveBeenCalledTimes(1);
    });
    test("should emit a clientUpdate message and proper status to the socket", () => {
      onPlay(videoElement, socket);
      expect(socket.emit).toHaveBeenCalledWith("clientUpdate", {
        paused: false,
      });
    });
    test("should not emit a message if the videoElement was seeking", () => {
      const seekingVideoelement = Object.assign(videoElement, {
        seeking: true,
      });
      onPlay(seekingVideoelement, socket);
      expect(socket.emit).toHaveBeenCalledTimes(0);
    });
  });
  describe("onPause", () => {
    test("should execute succesfully", () =>
      expect(() => onPause(videoElement, socket)).not.toThrow(Error));
    test("should emit a message to the socket", () => {
      onPause(videoElement, socket);
      expect(socket.emit).toHaveBeenCalledTimes(1);
    });
    test("should emit a clientUpdate message and proper status to the socket", () => {
      onPause(videoElement, socket);
      expect(socket.emit).toHaveBeenCalledWith("clientUpdate", {
        paused: true,
      });
    });
    test("should not emit a message if the videoElement was seeking", () => {
      const seekingVideoelement = Object.assign(videoElement, {
        seeking: true,
      });
      onPause(seekingVideoelement, socket);
      expect(socket.emit).toHaveBeenCalledTimes(0);
    });
  });
  describe("onSeeked", () => {
    const TIMESTAMP = 1000;
    test("should execute succesfully", () =>
      expect(() => onSeeked(videoElement, socket)).not.toThrow(Error));
    test("should emit a message to the socket", () => {
      onSeeked(TIMESTAMP, socket);
      expect(socket.emit).toHaveBeenCalledTimes(1);
    });
    test("should emit a clientUpdate message and proper status to the socket", () => {
      onSeeked(TIMESTAMP, socket);
      expect(socket.emit).toHaveBeenCalledWith("clientUpdate", {
        currentTime: TIMESTAMP,
      });
    });
  });
});
