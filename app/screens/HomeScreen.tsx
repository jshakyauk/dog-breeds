import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Collapsible from "react-native-collapsible";
import { Ionicons } from "@expo/vector-icons"; // Import icons from expo vector icons
import { getAllBreeds } from "../../services/DogService";
import { RootStackParamList } from "./index";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList>;

const HomeScreen: React.FC<HomeScreenProps> = (props) => {
  const [breeds, setBreeds] = useState<{ category: string; data: string[] }[]>(
    []
  );
  const [collapsedSections, setCollapsedSections] = useState<number[]>([]);

  useEffect(() => {
    fetchBreeds();
  }, []);

  const fetchBreeds = async () => {
    try {
      const breedsData = await getAllBreeds();
      const categories = Object.keys(breedsData);

      const formattedBreeds = categories.map((category) => ({
        category,
        data: breedsData[category],
      }));
      setBreeds(formattedBreeds);
    } catch (error) {
      // Handle error
    }
  };

  const toggleSection = (index: number) => {
    if (collapsedSections.includes(index)) {
      setCollapsedSections(collapsedSections.filter((i) => i !== index));
    } else {
      setCollapsedSections([...collapsedSections, index]);
    }
  };

  const renderIcon = (isCollapsed: boolean) => (
    <Ionicons
      name={isCollapsed ? "ios-arrow-forward" : "ios-arrow-down"}
      size={24}
      color="black"
    />
  );

  const getDetails = async (breed: string) => {
    props.navigation.push("Details", { alias: breed });
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: { category: string; data: string[] };
    index: number;
  }) => {
    const isCollapsed = collapsedSections.includes(index);

    return (
      <View style={{ padding: 10, marginBottom: 10 }}>
        <TouchableOpacity onPress={() => getDetails(item.category)}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 0.9 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 8 }}>
                {item.category}
              </Text>
            </View>
            <TouchableOpacity
              style={{ flex: 0.1 }}
              onPress={() => toggleSection(index)}
            >
              {item.data.length > 0 ? renderIcon(isCollapsed) : null}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={isCollapsed}>
          {item.data &&
            item.data.map((breed) => (
              <TouchableOpacity
                key={breed}
                onPress={() => props.navigation.push("Profile", { breed })}
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderColor: "#ccc",
                }}
              >
                <Text>{breed}</Text>
              </TouchableOpacity>
            ))}
        </Collapsible>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, alignItems: "stretch", justifyContent: "center" }}>
      <FlatList
        data={breeds}
        renderItem={renderItem}
        keyExtractor={(item) => item.category}
      />
    </View>
  );
};

export default HomeScreen;
