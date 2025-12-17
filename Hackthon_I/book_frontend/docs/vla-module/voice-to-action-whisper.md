---
sidebar_position: 1
title: "Voice-to-Action with OpenAI Whisper"
---

# Voice-to-Action with OpenAI Whisper

## Introduction

In this chapter, we'll explore how to convert voice commands into text using OpenAI's Whisper API, which forms the foundation of the Vision-Language-Action (VLA) pipeline. This is the first step in enabling natural language interaction with humanoid robots.

## Understanding Speech Recognition in Robotics

Speech recognition is a critical component in human-robot interaction. It allows users to communicate with robots using natural language, making the technology more accessible and intuitive. OpenAI's Whisper model provides state-of-the-art speech recognition capabilities with high accuracy across multiple languages.

## Setting Up OpenAI Whisper API

Before we begin, you'll need an OpenAI API key. If you don't have one, sign up at [OpenAI](https://platform.openai.com/signup) to get your API key.

### Installation and Dependencies

First, let's install the required Python packages:

```bash
pip install openai pydub pyaudio
```

### Basic Whisper Integration

Here's a simple example of how to use OpenAI's Whisper API to transcribe audio:

```python
import openai
from openai import OpenAI
import os
import io
from pydub import AudioSegment
from pydub.playback import play

# Initialize the OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def transcribe_audio(audio_file_path):
    """
    Transcribe audio using OpenAI's Whisper API
    """
    with open(audio_file_path, "rb") as audio_file:
        transcription = client.audio.transcriptions.create(
            model="whisper-1",
            file=audio_file
        )
    return transcription.text

# Example usage
# audio_path = "path/to/your/audio/file.wav"
# result = transcribe_audio(audio_path)
# print(f"Transcribed text: {result}")
```

## Audio Processing Techniques

For optimal Whisper performance, it's important to prepare your audio files properly. Here are some techniques:

### Audio Format Conversion

Whisper works best with specific audio formats. Here's how to convert audio files:

```python
from pydub import AudioSegment

def convert_audio_for_whisper(input_path, output_path="converted_audio.wav"):
    """
    Convert audio to format optimal for Whisper API
    """
    # Load audio file
    audio = AudioSegment.from_file(input_path)

    # Convert to mono, 16kHz sample rate
    audio = audio.set_channels(1)  # Mono
    audio = audio.set_frame_rate(16000)  # 16kHz

    # Export as WAV
    audio.export(output_path, format="wav")
    return output_path

# Example usage
# converted_path = convert_audio_for_whisper("input.mp3")
# result = transcribe_audio(converted_path)
```

### Real-time Audio Capture

For live voice commands, you can capture audio directly from a microphone:

```python
import pyaudio
import wave
import tempfile
import os

def record_audio(duration=5, sample_rate=16000, chunk_size=1024):
    """
    Record audio from microphone for specified duration
    """
    # Audio parameters
    format = pyaudio.paInt16
    channels = 1

    # Initialize PyAudio
    p = pyaudio.PyAudio()

    # Start recording
    stream = p.open(format=format,
                    channels=channels,
                    rate=sample_rate,
                    input=True,
                    frames_per_buffer=chunk_size)

    print(f"Recording for {duration} seconds...")
    frames = []

    for _ in range(0, int(sample_rate / chunk_size * duration)):
        data = stream.read(chunk_size)
        frames.append(data)

    print("Recording finished.")

    # Stop and close stream
    stream.stop_stream()
    stream.close()
    p.terminate()

    # Save to temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as temp_file:
        wf = wave.open(temp_file.name, 'wb')
        wf.setnchannels(channels)
        wf.setsampwidth(p.get_sample_size(format))
        wf.setframerate(sample_rate)
        wf.writeframes(b''.join(frames))
        wf.close()

    return temp_file.name

# Example usage
# audio_file = record_audio(duration=5)
# result = transcribe_audio(audio_file)
# print(f"Spoken command: {result}")
#
# # Clean up temporary file
# os.unlink(audio_file)
```

## Practical Example: Voice Command Processor

Let's create a complete voice command processor that integrates all the concepts:

```python
import openai
from openai import OpenAI
import os
import pyaudio
import wave
import tempfile
from pydub import AudioSegment
import time

class VoiceCommandProcessor:
    def __init__(self, api_key=None):
        """
        Initialize the voice command processor
        """
        self.client = OpenAI(api_key=api_key or os.getenv("OPENAI_API_KEY"))
        self.sample_rate = 16000
        self.channels = 1

    def convert_audio_for_whisper(self, input_path, output_path=None):
        """
        Convert audio to format optimal for Whisper API
        """
        if output_path is None:
            output_path = input_path.replace('.wav', '_converted.wav')

        audio = AudioSegment.from_file(input_path)
        audio = audio.set_channels(1)  # Mono
        audio = audio.set_frame_rate(16000)  # 16kHz

        audio.export(output_path, format="wav")
        return output_path

    def record_audio(self, duration=5, chunk_size=1024):
        """
        Record audio from microphone for specified duration
        """
        format = pyaudio.paInt16

        p = pyaudio.PyAudio()

        stream = p.open(format=format,
                        channels=self.channels,
                        rate=self.sample_rate,
                        input=True,
                        frames_per_buffer=chunk_size)

        print(f"Listening for {duration} seconds...")
        frames = []

        for _ in range(0, int(self.sample_rate / chunk_size * duration)):
            data = stream.read(chunk_size)
            frames.append(data)

        print("Processing audio...")

        stream.stop_stream()
        stream.close()
        p.terminate()

        # Save to temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as temp_file:
            wf = wave.open(temp_file.name, 'wb')
            wf.setnchannels(self.channels)
            wf.setsampwidth(p.get_sample_size(format))
            wf.setframerate(self.sample_rate)
            wf.writeframes(b''.join(frames))
            wf.close()

        return temp_file.name

    def transcribe_audio(self, audio_file_path):
        """
        Transcribe audio using OpenAI's Whisper API
        """
        converted_path = self.convert_audio_for_whisper(audio_file_path)

        with open(converted_path, "rb") as audio_file:
            transcription = self.client.audio.transcriptions.create(
                model="whisper-1",
                file=audio_file
            )

        # Clean up temporary converted file
        os.unlink(converted_path)

        return transcription.text

    def process_voice_command(self, duration=5):
        """
        Complete process: record -> convert -> transcribe
        """
        # Record audio
        audio_file = self.record_audio(duration)

        try:
            # Transcribe
            result = self.transcribe_audio(audio_file)
            print(f"Voice command: {result}")
            return result
        finally:
            # Clean up temporary file
            os.unlink(audio_file)

# Example usage
if __name__ == "__main__":
    # Initialize processor
    processor = VoiceCommandProcessor()

    # Process a voice command
    command = processor.process_voice_command(duration=5)
    print(f"Final command: {command}")
```

## Troubleshooting Common Issues

### Audio Quality Problems
- **Background noise**: Use a quiet environment or noise-canceling microphones
- **Low volume**: Ensure proper microphone gain settings
- **Distorted audio**: Check for clipping and adjust input levels

### API Connection Issues
- **Rate limits**: OpenAI has rate limits; implement exponential backoff if needed
- **Authentication**: Verify your API key is correct and has sufficient quota
- **Network timeouts**: Increase timeout values for longer audio files

### Whisper Performance Tips
- Keep audio files under 25MB for best performance
- Use WAV format when possible for highest quality
- Pre-convert audio to 16kHz mono for optimal results

## Summary

In this chapter, we've covered the fundamentals of voice-to-action processing using OpenAI Whisper. We've learned how to:
- Set up and use the OpenAI Whisper API
- Process audio files for optimal transcription quality
- Capture real-time audio from microphones
- Build a complete voice command processor

This forms the foundation of the VLA pipeline, converting natural language into text that can be processed by cognitive planning systems. In the next chapter, we'll explore how to convert these text commands into robotic actions using LLMs.