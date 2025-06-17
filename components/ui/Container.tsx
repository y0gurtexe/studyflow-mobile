import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { glassStyle, glassDarkStyle } from '../../constants/theme';

type ContainerVariant = 'glass' | 'glass-dark' | 'default';

// Extend ViewStyle to include backdropFilter for web
interface ExtendedViewStyle extends ViewStyle {
  backdropFilter?: string;
}

interface ContainerProps extends ViewProps {
  children: React.ReactNode;
  variant?: ContainerVariant;
  style?: ViewStyle;
}

const Container: React.FC<ContainerProps> = ({
  children,
  variant = 'default',
  style,
  ...rest
}) => {
  const getContainerStyle = (): ExtendedViewStyle => {
    const baseStyle: ExtendedViewStyle = {
      borderRadius: 12, // Using direct value instead of SIZES.radius to avoid type issues
      overflow: 'hidden',
    };

    const variantStyles: Record<ContainerVariant, ExtendedViewStyle> = {
      glass: {
        ...glassStyle,
      },
      'glass-dark': {
        ...glassDarkStyle,
      },
      default: {
        backgroundColor: 'transparent',
      },
    };

    return { ...baseStyle, ...variantStyles[variant] };
  };

  return (
    <View style={[getContainerStyle(), style]} {...rest}>
      {children}
    </View>
  );
};

export default Container;
