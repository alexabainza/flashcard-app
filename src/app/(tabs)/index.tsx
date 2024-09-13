import { useRef } from "react";
import { Button, SafeAreaView, StyleSheet } from "react-native";
import { Text, View, Dimensions, StatusBar } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { CarouselType } from "../../assets/types";
export default function TabOneScreen() {
  const width = Dimensions.get("window").width;
  const carouselRef = useRef<CarouselType | null>(null);

  const handleNext = () => {
    console.log("next button pressed");
    carouselRef.current?.next();
  };

  const handlePrev = () => {
    console.log("prev button pressed");
    carouselRef.current?.prev();
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
          data={[...new Array(6).keys()]}
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => console.log("current index:", index)}
          renderItem={({ index }) => (
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                justifyContent: "center",
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 30 }}>{index}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Prev" color="#841584" onPress={handlePrev} />
        <Button title="Next" color="#841584" onPress={handleNext} />
      </View>
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
});
