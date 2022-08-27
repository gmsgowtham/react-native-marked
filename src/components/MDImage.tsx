import React, { memo, useEffect, useState } from 'react';
import { Image } from 'react-native';
import FastImage from 'react-native-fast-image';

interface MDImageProps {
  uri: string;
  width: number;
}

const MDImage = ({ uri, width }: MDImageProps) => {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    Image.prefetch(uri);
    Image.getSize(uri, (iWidth, iHeight) => {
      const heightCalc = width * (iHeight / iWidth);
      setHeight(heightCalc);
    });
  }, [uri, width, height]);

  if (height < 1) {
    return null;
  }

  return (
    <FastImage
      fallback
      source={{ uri }}
      style={[
        {
          width: width,
          height: height,
        },
      ]}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};

export default memo(MDImage);
