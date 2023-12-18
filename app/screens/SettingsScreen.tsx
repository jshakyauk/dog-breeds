import * as React from "react";
import { View, Text, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "./index";

type SettingsScreenProps = NativeStackScreenProps<RootStackParamList>;

const SettingsScreen: React.FC<SettingsScreenProps> = (props) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Settings Screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => props.navigation.push("Profile")}
      />
    </View>
  );
};

export default SettingsScreen;
