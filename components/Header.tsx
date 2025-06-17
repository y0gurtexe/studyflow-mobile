import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '../constants/theme';
// Button is used in the component, so we'll keep the import

interface HeaderProps {
  title?: string;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  showLogo?: boolean;
  style?: ViewStyle;
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  leftComponent,
  rightComponent,
  showLogo = false,
  style,
  transparent = false,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + SIZES.padding / 2 },
        transparent && { backgroundColor: 'transparent' },
        !transparent && styles.glassHeader,
        style,
      ]}
    >
      <View style={styles.content}>
        <View style={styles.sideComponent}>
          {leftComponent || <View style={styles.placeholder} />}
        </View>
        
        <View style={styles.titleContainer}>
          {showLogo ? (
            <Text style={styles.logoText}>StudyFlow</Text>
          ) : (
            <Text style={styles.titleText} numberOfLines={1}>
              {title}
            </Text>
          )}
        </View>
        
        <View style={styles.sideComponent}>
          {rightComponent || <View style={styles.placeholder} />}
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    width: '100%',
    paddingBottom: SIZES.padding / 2,
    paddingHorizontal: SIZES.padding,
    zIndex: 100,
  } as ViewStyle,
  glassHeader: {
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    backdropFilter: 'blur(10px)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  } as ViewStyle,
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  } as ViewStyle,
  sideComponent: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  logoText: {
    ...FONTS.h3,
    color: COLORS.white,
    fontWeight: '700',
    letterSpacing: 1,
  } as TextStyle,
  titleText: {
    ...FONTS.h3,
    color: COLORS.white,
    fontWeight: '600',
  } as TextStyle,
  placeholder: {
    width: 24,
    height: 24,
  } as ViewStyle,
};

export default Header;
