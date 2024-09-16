import { CarouselType, Flashcard } from "@/assets/types";
import { useRef, useState } from "react";
import data from "@/assets/sampledata.json";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { LinearGradient } from "expo-linear-gradient";

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
    <LinearGradient colors={["#FFFFFF", "#ECE7FF"]} style={styles.container}>
      <Text style={styles.heading}>Flash Cards</Text>
      <View style={styles.separator} />
      <View style={{ flex: 1 }}>
        <Carousel
          ref={carouselRef as any}
          loop
          width={width - 50}
          height={width * 1.15}
          autoPlay={true}
          data={flashcards}
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => console.log("current index:", index)}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => handleFlip(index)}
              style={styles.card}
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
        <TouchableOpacity onPress={handlePrev} style={styles.button}>
          <FontAwesome name="chevron-left" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={shuffleFlashcards} style={styles.button}>
          <FontAwesome6 name="shuffle" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={styles.button}>
          <FontAwesome name="chevron-right" size={30} color="white" />
        </TouchableOpacity>
      </View>
      {isShuffling && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#841584" />
          <Text style={styles.loadingText}>Shuffling...</Text>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: "flex",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#151722",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#3F3D94",
    marginBottom: 10,
    textTransform: "uppercase",
    top: "6%",
  },
  text: {
    textAlign: "center",
    fontSize: 35,
    color: "#3F3D94",
    paddingHorizontal: "10%",
  },
  headerText: {
    fontSize: 24,
    textAlign: "center",
    paddingVertical: 17,
    backgroundColor: "#3F3D94",
    color: "white",
    // fontWeight: "bold",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  button: {
    width: 100,
    height: 60,
    borderRadius: 25,
    display: "flex",
    backgroundColor: "#3F3D94",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "0.5%",
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
    color: "white",
  },
  cardBack: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  card: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    // backgroundColor: "#443D61",
    backgroundColor: "#FFFFFF",
    color: "white",
    borderColor: "#000000",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
