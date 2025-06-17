import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Vibration, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SFSymbol } from 'react-native-sfsymbols';

const HOLD_DURATION = 2000; // 2 seconds to stop recording

const RecordingScreen = () => {
  const router = useRouter();
  const [holdProgress, setHoldProgress] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);
  const holdInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start the recording timer
  const startTimer = () => {
    timerInterval.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  // Handle hold to stop recording
  const handleHoldStart = () => {
    if (holdInterval.current) clearInterval(holdInterval.current);
    
    const startTime = Date.now();
    setHoldProgress(0);
    
    holdInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / HOLD_DURATION, 1);
      setHoldProgress(progress);
      
      if (progress >= 1) {
        stopRecording();
      }
    }, 10);
  };

  const handleHoldEnd = () => {
    if (holdInterval.current) {
      clearInterval(holdInterval.current);
      holdInterval.current = null;
    }
    setHoldProgress(0);
  };

  // Stop recording and navigate to history
  const stopRecording = () => {
    // Clear intervals
    if (holdInterval.current) clearInterval(holdInterval.current);
    if (timerInterval.current) clearInterval(timerInterval.current);
    
    // Vibrate for feedback
    Vibration.vibrate(50);
    
    // Navigate to history
    router.push({
      pathname: '/(tabs)/history',
      params: { showRecordingEnded: 'true' }
    });
  };

  // Start recording on mount
  useEffect(() => {
    startTimer();
    
    // Clean up intervals on unmount
    return () => {
      if (holdInterval.current) clearInterval(holdInterval.current);
      if (timerInterval.current) clearInterval(timerInterval.current);
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Timer Display */}
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(recordingTime)}</Text>
        <View style={styles.recordingIndicator}>
          <View style={styles.recordingDot} />
          <Text style={styles.recordingText}>RECORDING</Text>
        </View>
      </View>
      
      {/* Stop Button */}
      <View style={styles.buttonContainer}>
        <Text style={styles.instructionText}>
          Hold to stop recording
        </Text>
        
        <TouchableOpacity
          style={styles.stopButton}
          activeOpacity={1}
          onPressIn={handleHoldStart}
          onPressOut={handleHoldEnd}
        >
          <View style={[styles.progressBar, { width: `${holdProgress * 100}%` }]} />
          <View style={styles.stopButtonContent}>
            <SFSymbol
              name="stop.circle.fill"
              weight="regular"
              color="#ff453a"
              size={80}
              resizeMode="center"
              style={{ width: 80, height: 80 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'space-between',
    paddingBottom: 80,
  },
  timerContainer: {
    marginTop: 120,
    alignItems: 'center',
  },
  timerText: {
    color: '#FFFFFF',
    fontSize: 64,
    fontFamily: 'Inter-Light',
    letterSpacing: 2,
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  recordingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF453A',
    marginRight: 8,
  },
  recordingText: {
    color: '#FF453A',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 1.5,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  instructionText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 40,
  },
  stopButton: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 69, 58, 0.1)',
    borderWidth: 1.5,
    borderColor: '#FF453A',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 69, 58, 0.2)',
  },
  stopButtonContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RecordingScreen;
