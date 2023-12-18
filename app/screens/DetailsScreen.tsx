import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import ImageView from 'react-native-image-viewing'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from './index'
import { getItemDetail } from '../../services/DogService'
import { breedStore } from '../../store/BreedStore'

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList>

const DetailsScreen: React.FC<DetailsScreenProps> = (props) => {
  const { alias } = props.route.params
  const [visible, setVisible] = useState(false)
  const [initialIndex, setInitialIndex] = useState(0)

  useEffect(() => {
    fetchBreeds(alias)
  }, [alias])

  const fetchBreeds = async (breedAlias: string) => {
    try {
      const breedsData = await getItemDetail(breedAlias)
      breedStore.setBreeds(breedsData)
    } catch (error) {
      // Handle error
    }
  }

  const openImageViewbox = (index: number) => {
    setInitialIndex(index)
    setVisible(true)
  }

  const closeImageViewbox = () => {
    setVisible(false)
  }

  const renderImageItem = ({
    item,
    index,
  }: {
    item: string
    index: number
  }) => (
    <TouchableOpacity
      style={{ padding: 20 }}
      onPress={() => openImageViewbox(index)}
    >
      <Image source={{ uri: item }} style={{ width: 170, height: 170 }} />
    </TouchableOpacity>
  )

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <FlatList
        horizontal={false}
        data={breedStore.breeds}
        numColumns={2}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderImageItem}
      />
      <ImageView
        images={breedStore.breeds.map((image) => ({ uri: image }))}
        imageIndex={initialIndex}
        visible={visible}
        onRequestClose={closeImageViewbox}
      />
    </View>
  )
}

export default DetailsScreen
