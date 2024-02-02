// audioRecorder.js


function setupAudioRecorder(startButtonId, stopButtonId, audioPlayerId, playButtonId) {

  // Check for microphone permission
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        // Microphone permission granted
      })
      .catch(function(err) {
        // Microphone permission denied
        console.log('Microphone permission denied');
        return;
      });
  } else {
    // Browser doesn't support getUserMedia
    console.log('Your browser does not support audio recording');
    return;
  }


  let mediaRecorder;
  let recordedChunks = [];
  var playable = false;

  const startRecordingButton = document.getElementById(startButtonId);
  const stopRecordingButton = document.getElementById(stopButtonId);

  // if playRecordingButton, audioPlayerId are provided
  if (audioPlayerId && playButtonId) {
    const playRecordingButton = document.getElementById(playButtonId);
    var audioPlayer = document.getElementById(audioPlayerId);
    playable = true;
    playRecordingButton.addEventListener('click', playRecording);
  }


  startRecordingButton.addEventListener('click', startRecording);
  stopRecordingButton.addEventListener('click', stopRecording);


  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(recordedChunks, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      if(playable){
        audioPlayer.src = audioUrl;
        // playRecordingButton.disabled = false;
      }

      // Convert audio blob to Base64 string
      const reader = new FileReader();
      reader.onloadend = function () {
        const base64Data = reader.result.split(',')[1];
        // Trigger a custom event with the Base64-encoded audio data
        document.dispatchEvent(new CustomEvent('audioRecorded', { detail: base64Data }));
      };
      reader.readAsDataURL(audioBlob);
    };

    mediaRecorder.start();
    startRecordingButton.disabled = true;
    stopRecordingButton.disabled = false;
  }

  function stopRecording() {
    if (mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      startRecordingButton.disabled = false;
      stopRecordingButton.disabled = true;
    }
  }

  function playRecording() {
    audioPlayer.play();
  }
}
