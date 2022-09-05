import React, { memo, useEffect } from 'react';
import { Image } from 'react-native';
import FitImage from 'react-native-fit-image';

interface MDImageProps {
  uri: string;
}

const MDImage = ({ uri }: MDImageProps) => {
  useEffect(() => {
    Image.prefetch(uri);
  }, [uri]);

  return <FitImage source={{ uri }} resizeMode="cover" />;
};

export default memo(MDImage);
