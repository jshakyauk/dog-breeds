import * as React from "react";
import { View, Text, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "./index";

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList>;

const ProfileScreen: React.FC<ProfileScreenProps> = (props) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile Screen</Text>
      <Button
        title="Go to Settings"
        onPress={() => props.navigation.push("Settings")}
      />
    </View>
  );
};

export default ProfileScreen;
