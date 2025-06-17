import { Tabs } from "expo-router";
import { COLORS } from "@/constants/theme";
import { StyleSheet, Platform } from "react-native";
import { SFSymbol } from "react-native-sfsymbols";

const TabBarIcon = ({ name, focused }: { name: string; focused: boolean }) => {
  return (
    <SFSymbol
      name={name}
      weight={focused ? 'semibold' : 'regular'}
      scale={focused ? 'medium' : 'default'}
      color={focused ? '#1e92fe' : '#8e8e93'}
      size={24}
      resizeMode="center"
      style={{ width: 24, height: 24 }}
    />
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1e92fe',
        tabBarInactiveTintColor: '#8e8e93',
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopWidth: 0.5,
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
          height: 83,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Inter-Medium',
          marginTop: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="house" focused={focused} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="history" 
        options={{
          title: 'History',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="clock" focused={focused} />
          ),
        }} 
      />
    </Tabs>
  );
}
