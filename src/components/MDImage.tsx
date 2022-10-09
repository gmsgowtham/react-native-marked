import React, { memo, useEffect } from 'react';
import { Image } from 'react-native';
import FitImage from 'react-native-fit-image';

interface MDImageProps {
  uri: string;
  alt?: string;
}

const MDImage = ({ uri, alt = '' }: MDImageProps) => {
  useEffect(() => {
    Image.prefetch(uri);
  }, [uri]);

  return (
    <FitImage
      accessibilityRole="image"
      accessibilityLabel={alt}
      source={{ uri }}
      resizeMode="cover"
    />
  );
};

export default memo(MDImage);
