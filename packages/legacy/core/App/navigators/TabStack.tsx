import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, useWindowDimensions, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesomeIcon from '@react-native-vector-icons/fontawesome';

import { AttachTourStep } from '../components/tour/AttachTourStep'
import { useConfiguration } from '../contexts/configuration'
import { useNetwork } from '../contexts/network'
import { useTheme } from '../contexts/theme'
import { Screens, Stacks, TabStackParams, TabStacks } from '../types/navigators'
import { testIdWithKey } from '../utils/testable'

import CredentialStack from './CredentialStack'
import HomeStack from './HomeStack'

const TabStack: React.FC = () => {
  const { useCustomNotifications } = useConfiguration()
  const { total } = useCustomNotifications()
  const { t } = useTranslation()
  const Tab = createBottomTabNavigator<TabStackParams>()
  const { assertConnectedNetwork } = useNetwork()
  const { ColorPallet, TabTheme } = useTheme()
  const { fontScale } = useWindowDimensions()

  const showLabels = fontScale * TabTheme.tabBarTextStyle.fontSize < 16

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <Tab.Navigator
        screenOptions={{
          unmountOnBlur: true,
          tabBarStyle: {
            ...TabTheme.tabBarStyle,
          },
          tabBarActiveTintColor: TabTheme.tabBarActiveTintColor,
          tabBarInactiveTintColor: TabTheme.tabBarInactiveTintColor,
          header: () => null,
        }}
      >
        <Tab.Screen
          name={TabStacks.HomeStack}
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={{ ...TabTheme.tabBarContainerStyle, justifyContent: showLabels ? 'flex-end' : 'center' }}>
                <Icon name={focused ? 'home-outline' : 'home-outline'} color={color} size={30} />
                {showLabels && (
                  <Text
                    style={{
                      ...TabTheme.tabBarTextStyle,
                      color: focused ? TabTheme.tabBarActiveTintColor : TabTheme.tabBarInactiveTintColor,
                    }}
                  >
                    {t('TabStack.Home')}
                  </Text>
                )}
                {focused && <View style={{position: "absolute", height: 3, bottom: -0.5, backgroundColor: TabTheme.tabBarActiveTintColor, width: '40%', borderRadius: 50, }} />}
              </View>
            ),
            tabBarShowLabel: false,
            tabBarBadge: total || undefined,
            tabBarBadgeStyle: { backgroundColor: ColorPallet.semantic.success },
            tabBarAccessibilityLabel: `${t('TabStack.Home')} (${
              total === 1 ? t('Home.OneNotification') : t('Home.CountNotifications', { count: total || 0 })
            })`,
            tabBarTestID: testIdWithKey(t('TabStack.Home')),
          }}
        />
        
        <Tab.Screen
          name={TabStacks.CredentialStack}
          component={CredentialStack}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <AttachTourStep index={2}>
                <View style={{ ...TabTheme.tabBarContainerStyle, justifyContent: showLabels ? 'flex-end' : 'center' }}>
                  <Icon name={focused ? 'id-card' : 'id-card'} color={color} size={30} />
                  {showLabels && (
                    <Text
                      style={{
                        ...TabTheme.tabBarTextStyle,
                        color: focused ? TabTheme.tabBarActiveTintColor : TabTheme.tabBarInactiveTintColor,
                      }}
                    >
                      {t('TabStack.Credentials')}
                    </Text>
                  )}
                  {focused && <View style={{position: "absolute", height: 3, bottom: -0.5, backgroundColor: TabTheme.tabBarActiveTintColor, width: '40%', borderRadius: 50, }} />}
                </View>
              </AttachTourStep>
            ),
            tabBarShowLabel: false,
            tabBarAccessibilityLabel: t('TabStack.Credentials'),
            tabBarTestID: testIdWithKey(t('TabStack.Credentials')),
          }}
        />
        <Tab.Screen
          name={TabStacks.ConnectStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  position: 'relative',
                  flex: 1,
                  width: 90,
                }}
              >
                <AttachTourStep index={0} fill>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: -5,
                      width: 90,
                      minHeight: 90,
                      flexGrow: 1,
                      margin: 'auto',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}
                  >
                    <View style={{ ...TabTheme.focusTabIconStyle }}>
                      <Icon
                        name="qrcode-scan"
                        color={TabTheme.tabBarButtonIconStyle.color}
                        size={32}
                        style={{ paddingLeft: 0.5, paddingTop: 0.5 }}
                      />
                    </View>
                    <Text
                      style={{
                        ...TabTheme.tabBarTextStyle,
                        color: focused ? TabTheme.tabBarActiveTintColor : TabTheme.tabBarInactiveTintColor,
                        marginTop: 5,
                      }}
                    >
                    
                    </Text>
                  </View>
                </AttachTourStep>
              </View>
            ),
            tabBarShowLabel: false,
            tabBarAccessibilityLabel: t('TabStack.Scan'),
            tabBarTestID: testIdWithKey(t('TabStack.Scan')),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault()
              if (!assertConnectedNetwork()) {
                return
              }
              navigation.navigate(Stacks.ConnectStack, { screen: Screens.Scan })
            },
          })}
        >
          {() => <View />}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  )
}

export default TabStack
