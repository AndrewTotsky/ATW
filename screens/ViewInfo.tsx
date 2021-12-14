import React, {useState} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {NavigationRoute, NavigationScreenProp} from 'react-navigation';
import {IPhoto} from '../store/store';
import ImageView from 'react-native-image-viewing';

interface IProps {
  photoInfo: IPhoto;
  route: NavigationRoute<{photoInfo: IPhoto}>;
  navigation: NavigationScreenProp<{}>;
}

const ViewInfo = (props: IProps) => {
  const photoInfo = props.route.params?.photoInfo;

  const [visible, setIsVisible] = useState(false);

  return (
    <SafeAreaView>
      {!photoInfo ? (
        <Text>Информация не найдена</Text>
      ) : (
        <>
          <ImageView
            images={[{uri: photoInfo.url}]}
            imageIndex={0}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
          />
          <TouchableOpacity onPress={() => setIsVisible(true)}>
            <Image
              source={{uri: photoInfo.url}}
              key={photoInfo.url}
              style={{
                width: '100%',
                height: 200,
              }}
            />
          </TouchableOpacity>

          <Text>ID: {photoInfo.id}</Text>
          <Text>Автор: {photoInfo.author}</Text>
        </>
      )}
    </SafeAreaView>
  );
};

export default ViewInfo;
