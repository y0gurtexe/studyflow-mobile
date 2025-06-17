import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle, GestureResponderEvent } from 'react-native';
import { COLORS, FONTS, SIZES, glassStyle, glassDarkStyle } from '../../constants/theme';

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass' | 'glass-dark';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: SIZES.radius,
      paddingHorizontal: SIZES.padding,
      ...(size === 'small' && {
        height: 36,
        paddingHorizontal: SIZES.padding / 1.5,
      }),
      ...(size === 'medium' && {
        height: 48,
      }),
      ...(size === 'large' && {
        height: 56,
        paddingHorizontal: SIZES.padding * 1.5,
      }),
    };

    const variantStyles: Record<string, ViewStyle> = {
      primary: {
        backgroundColor: disabled ? `${COLORS.primary}80` : COLORS.primary,
      },
      secondary: {
        backgroundColor: disabled ? `${COLORS.secondary}80` : COLORS.secondary,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLORS.primary,
      },
      ghost: {
        backgroundColor: 'transparent',
      },
      glass: {
        ...glassStyle,
      },
      'glass-dark': {
        ...glassDarkStyle,
      },
    };

    return { ...baseStyle, ...variantStyles[variant] };
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      ...FONTS.body3,
      fontWeight: '600',
      textAlign: 'center',
    };

    const variantTextStyles: Record<string, TextStyle> = {
      primary: {
        color: COLORS.white,
      },
      secondary: {
        color: COLORS.white,
      },
      outline: {
        color: disabled ? `${COLORS.primary}80` : COLORS.primary,
      },
      ghost: {
        color: disabled ? `${COLORS.primary}80` : COLORS.primary,
      },
      glass: {
        color: COLORS.white,
      },
      'glass-dark': {
        color: COLORS.white,
      },
    };

    return { ...baseStyle, ...variantTextStyles[variant] };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' || variant === 'secondary' || variant === 'glass' || variant === 'glass-dark' 
            ? COLORS.white 
            : COLORS.primary
          } 
        />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text style={[getTextStyle(), textStyle, { marginLeft: icon ? 8 : 0 }]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
