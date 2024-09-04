import { Stack } from "expo-router";
import "../global.css";
import { configureObservableSync, syncObservable } from "@legendapp/state/sync";
import { observable } from "@legendapp/state";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import React from "react";
import { Image } from "expo-image";
import { cssInterop } from "nativewind";

cssInterop(Image, { className: "style" });

configureObservableSync({
  persist: {
    plugin: ObservablePersistLocalStorage,
  },
});

export const language$ = observable<"english" | "german">("english");

syncObservable(language$, {
  persist: {
    name: "language",
  },
});

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="all-flags" options={{ title: "All flags" }} />
      <Stack.Screen name="settings" options={{ title: "Settings" }} />
    </Stack>
  );
}
