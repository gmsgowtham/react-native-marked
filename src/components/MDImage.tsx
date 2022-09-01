import React, { memo, useEffect, useRef, useState } from 'react';
import { Image } from 'react-native';
import FastImage from 'react-native-fast-image';

interface MDImageProps {
  uri: string;
  width: number;
}

const MDImage = ({ uri, width }: MDImageProps) => {
  const [height, setHeight] = useState<number>(0);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  });

  useEffect(() => {
    Image.prefetch(uri);
    Image.getSize(uri, (_width, _height) => {
      if (isMounted.current) {
        const heightCalc = width * (_height / _width);
        setHeight(heightCalc);
      }
    });
  }, [uri, width, height, isMounted]);

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
