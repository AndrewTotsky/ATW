import React from 'react';
import renderer from 'react-test-renderer';
import ImageScreen from '../screens/ImageScreen';

// Пример теста снепшотами
test('renders correctly', async () => {
  const tree = renderer
    .create(
      <ImageScreen
        photoStore={
          {
            photos_list: [],
            loadPhotosList: () => {},
            errorLoadImages: {
              isError: false,
            },
          } as any
        }
        navigation={{setOptions: () => {}} as any}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
