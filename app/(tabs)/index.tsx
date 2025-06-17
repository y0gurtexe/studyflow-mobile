import { View, Text, StyleSheet, TouchableOpacity, Vibration } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { SFSymbol } from "react-native-sfsymbols";
import { useState, useRef, useEffect } from "react";

const HOLD_DURATION = 2000; // 2 seconds to stop recording

export default function HomeScreen() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const holdInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const startRecording = () => {
    setIsRecording(true);
    // Navigate to recording screen with black background
    router.push("/recording");
  };

  const startHold = () => {
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

  const stopHold = () => {
    if (holdInterval.current) {
      clearInterval(holdInterval.current);
      holdInterval.current = null;
    }
    setHoldProgress(0);
  };

  const stopRecording = () => {
    if (holdInterval.current) {
      clearInterval(holdInterval.current);
      holdInterval.current = null;
    }
    setHoldProgress(0);
    setIsRecording(false);
    Vibration.vibrate(50);
    // TODO: Stop recording and process
  };

  useEffect(() => {
    return () => {
      if (holdInterval.current) {
        clearInterval(holdInterval.current);
      }
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>StudyFlow</Text>
        <Text style={styles.subtitle}>Record your lectures with one tap</Text>
        
        <View style={styles.buttonContainer}>
          {!isRecording ? (
            <TouchableOpacity 
              style={styles.startButton}
              onPress={startRecording}
              activeOpacity={0.8}
            >
              <View style={styles.buttonInner}>
                <SFSymbol
                  name="record.circle"
                  weight="regular"
                  color="#1e92fe"
                  size={32}
                  resizeMode="center"
                  style={{ width: 32, height: 32, marginRight: 12 }}
                />
                <Text style={styles.buttonText}>Start Day</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.stopButtonContainer}>
              <Text style={styles.recordingText}>Recording in progress</Text>
              <TouchableOpacity 
                style={styles.stopButton}
                onPressIn={startHold}
                onPressOut={stopHold}
                activeOpacity={1}
              >
                <View style={[styles.progressBar, { width: `${holdProgress * 100}%` }]} />
                <View style={styles.stopButtonContent}>
                  <Text style={styles.stopButtonText}>Hold to stop</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    color: '#ffffff',
    fontSize: 32,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#8e8e93',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginBottom: 48,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  startButton: {
    width: '100%',
    maxWidth: 300,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(30, 146, 254, 0.1)',
    borderWidth: 1.5,
    borderColor: '#1e92fe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#1e92fe',
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
  },
  stopButtonContainer: {
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  recordingText: {
    color: '#ff453a',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 12,
  },
  stopButton: {
    width: '100%',
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 69, 58, 0.1)',
    borderWidth: 1.5,
    borderColor: '#ff453a',
    overflow: 'hidden',
  },
  progressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 69, 58, 0.2)',
  },
  stopButtonContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopButtonText: {
    color: '#ff453a',
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
  },
});
