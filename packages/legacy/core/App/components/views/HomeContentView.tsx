import { CredentialState } from '@aries-framework/core'
import { useCredentialByState } from '@aries-framework/react-hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View, Text } from 'react-native'
import { useTheme } from '../../contexts/theme'
import { ColorPallet } from 'theme'
import ListCredentials from '../../screens/ListCredentials'

const offset = 15

interface HomeContentViewProps {
  children?: any
}

const HomeContentView: React.FC<HomeContentViewProps> = ({ children }) => {
  const credentials = [
    ...useCredentialByState(CredentialState.CredentialReceived),
    ...useCredentialByState(CredentialState.Done),
  ]

  const credentialTitle = 'Eklenen Belgelerim'
  const { HomeTheme } = useTheme()
  const { ColorPallet } = useTheme()
  const { t } = useTranslation()
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: offset,
      paddingBottom: offset * 3,
    },

    messageContainer: {
      alignItems: 'baseline',
      justifyContent: "flex-start",
      marginTop: 30,
      marginHorizontal: offset,
      width: '90%',
    },
  })

  const displayMessage = (credentialCount: number) => {
    if (typeof credentialCount === 'undefined' && credentialCount >= 0) {
      throw new Error('Credential count cannot be undefined')
    }

    let credentialMsg

    if (credentialCount === 1) {
      credentialMsg = (
        <Text>
          {t('Home.YouHave')} <Text style={{ fontWeight: 'bold' }}>{credentialCount}</Text> {t('Home.Credential')}{' '}
          {t('Home.InYourWallet')}
        </Text>
      )
    } else if (credentialCount > 1) {
      credentialMsg = (
        <Text>
          {t('Home.YouHave')} <Text style={{ fontWeight: 'bold' }}>{credentialCount}</Text> {t('Home.Credentials')}{' '}
          {t('Home.InYourWallet')}
        </Text>
      )
    } else {
      credentialMsg = t('Home.NoCredentials')
    }

    return (
      <>
        { credentialCount === 0 && (
          <View style={[styles.messageContainer]}>
            <Text adjustsFontSizeToFit style={[HomeTheme.welcomeHeader, { marginTop: 10, marginBottom: 25, marginLeft: 0, alignSelf: 'baseline', }]}>
              {t('Home.Welcome')}
            </Text>
            <View style={{height: 2, width: "100%", backgroundColor: ColorPallet.grayscale.veryLightGrey }} />
          </View>
        )}
        <View style={[styles.messageContainer]}>
          <Text style={[HomeTheme.credentialMsg, { marginTop: offset, textAlign: 'center' }]}>{credentialMsg}</Text>
        </View>
      </>
    )
  }

  return (
    
    <View>
      <View style={[styles.messageContainer]}>
            <Text adjustsFontSizeToFit style={[HomeTheme.welcomeHeader, { marginTop: 10, marginBottom: 25, marginLeft: 0, alignSelf: 'baseline', }]}>
              {t('Home.Welcome')}
            </Text>
            <View style={{height: 2, width: "100%", backgroundColor: ColorPallet.grayscale.veryLightGrey }} />
      </View>
      <View style={[styles.container]}>
          <Text style={[HomeTheme.credentialMsg, { marginTop: offset, marginBottom: 10, fontWeight: 'bold', textAlign: 'left'}]}>
            {t('Home.AddedCredentials')}
          </Text>
          <ListCredentials/>
        </View>
    </View>
  )
}

export default HomeContentView
