import { Text, View } from "react-native";
import { Link } from "expo-router";
import { flagLength } from "~/app/flags";
import Feather from "@expo/vector-icons/Feather";

export default function Index() {
  return (
    <View
      className="flex-1 justify-center items-center relative"
      aria-label="Home page"
    >
      <Link href="/settings" className="absolute top-5 right-5">
        <Feather name="settings" size={24} />
      </Link>
      <Text>Select a game you want to play:</Text>
      <Link href={`/all-flags`} asChild>
        <Text>All flags ({flagLength})</Text>
      </Link>
    </View>
  );
}
