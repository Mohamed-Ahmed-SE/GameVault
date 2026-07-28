/**
 * Premium Obsidian & Crimson Bottom Tab Navigator
 */

import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Search, Library, Bookmark, User } from 'lucide-react-native';
import { MainTabParamList } from './types';
import { HomeScreen } from '@/screens/Home/HomeScreen';
import { SearchScreen } from '@/screens/Search/SearchScreen';
import { LibraryScreen } from '@/screens/Library/LibraryScreen';
import { WishlistScreen } from '@/screens/Library/WishlistScreen';
import { ProfileScreen } from '@/screens/Profile/ProfileScreen';
import { colors, typography, borderRadius } from '@/theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent.glow,
        tabBarInactiveTintColor: colors.text.muted,
        tabBarStyle: {
          backgroundColor: '#0D0B12',
          borderTopColor: colors.border.subtle,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 76 : 66,
          paddingBottom: Platform.OS === 'ios' ? 18 : 10,
          paddingTop: 10,
          elevation: 12,
        },
        tabBarLabelStyle: {
          ...typography.caption,
          fontSize: 10,
          fontWeight: '700',
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconWrapper : null}>
              <Home size={focused ? 22 : 20} color={color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconWrapper : null}>
              <Search size={focused ? 22 : 20} color={color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarLabel: 'Library',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconWrapper : null}>
              <Library size={focused ? 22 : 20} color={color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarLabel: 'Wishlist',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconWrapper : null}>
              <Bookmark size={focused ? 22 : 20} color={color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconWrapper : null}>
              <User size={focused ? 22 : 20} color={color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  activeIconWrapper: {
    paddingHorizontal: 12,
    paddingVertical: 2,
    backgroundColor: colors.accent.darkSubtle,
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    borderColor: 'rgba(255, 46, 77, 0.3)',
  },
});
