import React, { memo, useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';

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
    <Image
      source={{ uri }}
      style={[
        styles.image,
        {
          width: width,
          height: height,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    flex: 1,
  },
});

export default memo(MDImage);
