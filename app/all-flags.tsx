import { Platform, Pressable, Text, View } from "react-native";
import { flagLength, flags, getRandomFlags } from "~/app/flags";
import React from "react";
import { language$ } from "~/app/_layout";
import { observer } from "@legendapp/state/react";
import { Image } from "expo-image";
import clsx from "clsx";
import { cssInterop } from "nativewind";

cssInterop(Image, { className: "style" });

const AllFlags = observer(() => {
  const [state, setState] = React.useState({
    count: 0,
    chosenFlags: getRandomFlags(flags, 4),
    flagIndex: Math.floor(Math.random() * 4),
  });

  React.useEffect(() => {
    if (Platform.OS === "web") {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "1") {
          handleButtonClick(0);
        } else if (event.key === "2") {
          handleButtonClick(1);
        } else if (event.key === "3") {
          handleButtonClick(2);
        } else if (event.key === "4") {
          handleButtonClick(3);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [state.count]);

  const handleButtonClick = (index: number) => {
    const correct = state.flagIndex === index;
    setState((prevState) => {
      const newCount = correct ? prevState.count + 1 : 0;

      // Update count immediately
      return {
        count: newCount,
        chosenFlags: getRandomFlags(flags, 4),
        flagIndex: Math.floor(Math.random() * 4),
      };
    });
  };

  const progress = Math.min((state.count / flagLength) * 100, 100);

  return (
    <View className="flex flex-col gap-10 w-full h-screen items-center justify-center">
      <Text>{state.count}</Text>
      <View className="w-72 bg-gray-200 rounded-full h-4 overflow-hidden">
        <View
          className="bg-blue-600 h-4 rounded-full"
          style={{ width: `${progress}%` }}
        ></View>
      </View>
      <Image
        source={state.chosenFlags[state.flagIndex].path}
        className="w-full shadow-2xl rounded h-32"
        contentFit="contain"
        alt={
          language$.get() === "english"
            ? `flag of ${state.chosenFlags[state.flagIndex].name}`
            : `Flagge von ${state.chosenFlags[state.flagIndex].germanName}`
        }
      />
      <View className="gap-4 flex-row">
        <View className="flex flex-wrap justify-center gap-4">
          {state.chosenFlags.map((flag, index) => {
            if (index % 2 === 0) {
              return (
                <Pressable
                  key={index}
                  onPress={() => handleButtonClick(index)}
                  className={clsx(
                    "bg-slate-200 w-36 rounded shadow-2xl h-20 flex justify-center items-center",
                  )}
                >
                  <Text className="text-center">
                    {index + 1}{" "}
                    {language$.get() === "english"
                      ? flag.name
                      : flag.germanName}
                  </Text>
                </Pressable>
              );
            }
          })}
        </View>
        <View className="flex flex-wrap justify-center gap-4">
          {state.chosenFlags.map((flag, index) => {
            if (index % 2 === 1) {
              return (
                <Pressable
                  key={index}
                  onPress={() => handleButtonClick(index)}
                  className={clsx(
                    "bg-slate-200 w-36 rounded shadow-2xl h-20 flex justify-center items-center",
                  )}
                >
                  <Text className="text-center">
                    {index + 1}{" "}
                    {language$.get() === "english"
                      ? flag.name
                      : flag.germanName}
                  </Text>
                </Pressable>
              );
            }
          })}
        </View>
      </View>
    </View>
  );
});

export default AllFlags;
