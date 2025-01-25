let recognition = null;
let isRecognizing = false;

const components = {}; // Store references to DotNet helpers for each component by their ComponentId

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true; // Keep listening until stopped
    recognition.interimResults = true; // Show interim results while speaking
    recognition.lang = 'en-US'; // Language of recognition
} else {
    console.log('Speech recognition not supported in this browser');
}

let finalTranscript = ''; // Stores the finalized speech
let interimTranscript = ''; // Stores the ongoing speech

// Register the DotNetObjectReference for each component
window.registerSpeechComponent = function (componentId, dotNetHelper) {
    components[componentId] = dotNetHelper;
};

// Deregister when a component is disposed
window.deregisterSpeechComponent = function (componentId) {
    delete components[componentId];
};

// Start recognition
function startRecognition(componentId) {
    if (isRecognizing || !recognition) {
        return; // Exit if recognition is already active
    }

    isRecognizing = true;
    recognition.start(); // Start speech recognition
}

// Stop recognition
function stopRecognition(componentId) {
    if (!isRecognizing || !recognition) {
        return; // Exit if recognition is not active
    }

    recognition.stop(); // Stop speech recognition
    isRecognizing = false;
}

// Handle recognition results
recognition.onresult = function (event) {
    interimTranscript = ''; // Reset interim results each time

    // Process both final and interim results
    for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
            finalTranscript += result[0].transcript; // Append final result to the final transcript
        } else {
            interimTranscript += result[0].transcript; // Add interim result to ongoing speech
        }
    }

    // Send both final and interim results to Blazor for the specific component
    for (let componentId in components) {
        if (components.hasOwnProperty(componentId)) {
            components[componentId].invokeMethodAsync('ReceiveSpeechResult', finalTranscript, interimTranscript)
                .catch(error => console.error(error));
        }
    }
};

// Handle errors
recognition.onerror = function (event) {
    console.error('Speech recognition error', event.error);
};
