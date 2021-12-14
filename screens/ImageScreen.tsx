import {toJS} from 'mobx';
import {observer, inject} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {IPhoto, IPhotoStore} from '../store/store';

interface INavigation extends NavigationScreenProp<{}> {
  setOptions: ({}) => {};
}

interface IProps {
  photoStore: IPhotoStore;
  navigation: INavigation;
}

const ONE_COLUMN = 1;
const TWO_COLUMN = 2;

const ImageScreen = (props: IProps) => {
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => props.navigation.navigate('Auth')}
          title="Login"
        />
      ),
    });
  }, [props.navigation]);

  const [columnCount, setColumnCount] = useState(ONE_COLUMN);

  useEffect(() => {
    props.photoStore.loadPhotosList();
  }, []);
  const photos_list = toJS(props.photoStore.photos_list);
  const errorLoadImages = props.photoStore.errorLoadImages;

  const renderImage = ({item}: {item: IPhoto}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('ViewInfo', {photoInfo: item})
        }>
        <Image
          source={{uri: item.url}}
          key={item.url}
          style={[
            {
              width:
                columnCount === TWO_COLUMN
                  ? Dimensions.get('screen').width / 2.1
                  : undefined,
            },
            styles.image,
          ]}
        />
      </TouchableOpacity>
    );
  };

  if (!photos_list.length) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          {errorLoadImages.isError ? errorLoadImages.text : 'Loading...'}
        </Text>
        {errorLoadImages.isError && (
          <Button
            title="Load again"
            onPress={() => props.photoStore.loadPhotosList()}></Button>
        )}
      </View>
    );
  }
  return (
    <SafeAreaView>
      <TextInput
        style={styles.search}
        placeholder="Search (не реализовывал поиск)"></TextInput>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 50,
          zIndex: 1,
        }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setColumnCount(ONE_COLUMN)}>
          <Text style={styles.centerText}>Одна колонка</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setColumnCount(TWO_COLUMN)}>
          <Text style={styles.centerText}>Две колонки</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={photos_list}
        renderItem={renderImage}
        keyExtractor={item => item.url}
        key={columnCount}
        numColumns={columnCount}></FlatList>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 2,
    padding: 5,
    backgroundColor: '#52a0ff',
    borderRadius: 4,
    flex: 1,
  },
  search: {
    borderWidth: 1,
    margin: 5,
    height: 30,
    padding: 0,
    paddingLeft: 10,
    borderRadius: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 20,
  },
  centerText: {
    textAlign: 'center',
  },
  image: {
    height: 200,
    margin: 2,
    alignItems: 'center',
  },
});

export default inject('photoStore')(observer(ImageScreen));
