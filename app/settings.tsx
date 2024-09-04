import { Pressable, Text, View } from "react-native";
import clsx from "clsx";
import { Image } from "expo-image";
import UnitedKingdomFlag from "~/assets/images/flags/gb.webp";
import GermanyFlag from "~/assets/images/flags/de.webp";
import React from "react";
import { language$ } from "~/app/_layout";
import { observer } from "@legendapp/state/react";

const Settings = observer(() => {
  return (
    <View className="flex-row gap-5 top-10 left-3 absolute">
      <Text>Select Language:</Text>
      <Pressable
        className={clsx("flex-row gap-3", {
          "underline font-bold": language$.get() === "english",
        })}
        onPress={() => language$.set("english")}
      >
        <Text>English</Text>
        <Image source={UnitedKingdomFlag} className="w-10 h-6" />
      </Pressable>
      <Pressable
        className={clsx("flex-row gap-3", {
          "underline font-bold": language$.get() === "german",
        })}
        onPress={() => language$.set("german")}
      >
        <Text>German</Text>
        <Image source={GermanyFlag} className="w-10 h-6" />
      </Pressable>
    </View>
  );
});

export default Settings;
