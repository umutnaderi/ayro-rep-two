import { CredentialState } from '@aries-framework/core'
import { useCredentialByState } from '@aries-framework/react-hooks'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, View, ScrollView, Text } from 'react-native'
import {useSharedValue} from 'react-native-reanimated'

import CredentialCard from '../components/misc/CredentialCard'
import { useConfiguration } from '../contexts/configuration'
import { useTheme } from '../contexts/theme'
import { CredentialStackParams, Screens } from '../types/navigators'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ListCredentials: React.FC = () => {
  const { t } = useTranslation()
  const { HomeTheme } = useTheme()
  const { credentialListOptions: CredentialListOptions, credentialEmptyList: CredentialEmptyList } = useConfiguration()
  const credentials = [
    ...useCredentialByState(CredentialState.CredentialReceived),
    ...useCredentialByState(CredentialState.Done),
  ]
  const navigation = useNavigation<StackNavigationProp<CredentialStackParams>>()
  const { ColorPallet } = useTheme()

  return (
    <ScrollView
      style={{ backgroundColor: ColorPallet.brand.primaryBackground }}
      // Add content container style (optional)
      contentContainerStyle={{ position: 'relative',  }} // Adjust padding as needed
    >
      {credentials.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()).map(
        (credential, index) => (
          <View
            key={credential.id} // Ensure unique key for each credential
            style={{
              position: 'relative',
              zIndex: credentials.length + index,
              top: 90,
              marginHorizontal: 0,
              marginTop: -80,
              marginBottom: index === credentials.length - 1 ? 90 : 0,
              width: '100%',
            }}
          >
            <CredentialCard
              credential={credential}
              onPress={() => navigation.navigate(Screens.CredentialDetails, { credential })}
            />
          </View>
        )
      )}
      {credentials.length === 0 && 
      
        <View style={{
              flexDirection: "row",
              alignItems: "baseline",
              height: 200,
              backgroundColor: ColorPallet.brand.primaryBackground,
              borderRadius: 40,
              borderWidth: 3,
              borderColor: ColorPallet.grayscale.veryLightGrey,
        }}>
            <Icon name='wallet-outline' color={ColorPallet.brand.primary} size={90} style={{marginLeft: 20, marginTop: 50, }} />
            <Text style={[HomeTheme.credentialMsg , { position: 'absolute', marginTop: 90, marginBottom: 55, marginLeft: 120, alignSelf: 'baseline', fontWeight:"500"}]}>{t('Credentials.EmptyList')}</Text>
            
           <CredentialListOptions />
        </View>
        
        }
      
    </ScrollView>
  )
}

export default ListCredentials
