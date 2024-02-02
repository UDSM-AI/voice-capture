# Voice Capture

Exploring different ways of capturing audio data

## Voice Recording: From a Web Browser

This project provides a simple HTML and JavaScript setup for recording voice audio through a web browser using the Web Audio API and WebRTC. It includes a customizable audio recorder that allows you to capture, play, and submit recorded audio data.

### Usage

1. Place the `index.html` and `audioRecorder.js` files in your project directory.

The `setupAudioRecorder` function in `audioRecorder.js` allows for customization by accepting the following parameters:

- `startButtonId`: The ID of the button to start recording.
- `stopButtonId`: The ID of the button to stop recording.
- `audioPlayerId`: (Optional) The ID of the audio player element for playback.
- `playButtonId`: (Optional) The ID of the button to play the recorded audio.

Example usage:

```html
<!-- Prepare your hidden file input field in your form -->
<input type="hidden" id="audioData" name="audioData" value="">

<!-- Add the audioRecorder.js file -->
<script src="path/to/audioRecorder.js"></script>
```

Then

```js
  setupAudioRecorder("startRecording", "stopRecording", "audioPlayer", "playRecording");

    /* add this event listener */
    // Listen for the custom event and update the hidden input field
    document.addEventListener('audioRecorded', (event) => {
        const audioDataInput = document.getElementById('audioData');
        audioDataInput.value = event.detail;
    });

    //now you can submit the form 🎉

```
