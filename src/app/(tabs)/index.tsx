import { CarouselType, Flashcard } from "@assets/types";
import { useRef, useState } from "react";
import data from "@assets/sampledata.json";
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, View, Dimensions, StatusBar } from "react-native";
import Carousel from "react-native-reanimated-carousel";

export default function TabOneScreen() {
  const width = Dimensions.get("window").width;
  const carouselRef = useRef<CarouselType | null>(null);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>(data.flashcards);
  const [isShuffling, setIsShuffling] = useState(false);
  const handleNext = () => {
    console.log("next button pressed");
    carouselRef.current?.next();
  };

  const handlePrev = () => {
    console.log("prev button pressed");
    carouselRef.current?.prev();
  };

  const handleFlip = (index: number) => {
    setFlippedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };
  const shuffleFlashcards = () => {
    setIsShuffling(true);
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);

    setTimeout(() => {
      setFlashcards(shuffled);
      setIsShuffling(false);
      setFlippedIndices([]);
    }, 500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.separator} />
      <View style={{ flex: 1 }}>
        <Carousel
          ref={carouselRef as any}
          loop
          width={width}
          height={width / 2}
          // autoPlay={true}
          data={flashcards}
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => console.log("current index:", index)}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => handleFlip(index)}
              style={{
                flex: 1,
                borderWidth: 1,
                justifyContent: "center",
              }}
            >
              <Text style={styles.headerText}># {item.id}</Text>
              {flippedIndices.includes(index) ? (
                <View style={styles.cardBack}>
                  <Text style={styles.text}>Answer: {item.answer}</Text>
                </View>
              ) : (
                <View style={styles.cardFront}>
                  <Text style={styles.text}>Question: {item.question}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Prev" color="#841584" onPress={handlePrev} />
        <Button title="Shuffle" color="#841584" onPress={shuffleFlashcards} />
        <Button title="Next" color="#841584" onPress={handleNext} />
      </View>
      {isShuffling && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#841584" />
          <Text style={styles.loadingText}>Shuffling...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
  },
  headerText: {
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 18,
  },
  flashcard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  cardFront: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  cardBack: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8e8e8",
  },
});
