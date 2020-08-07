import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import Constant from 'expo-constants';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { IModalStackNavigation, CustomTheme, IRootState } from '../../App';

const Header = () => {
  const navigation = useNavigation<IModalStackNavigation>();
  const dispatch = useDispatch();
  const currentTheme = useSelector<IRootState, boolean>((state) => state.theme);
  const { colors } = useTheme() as CustomTheme;
  const vectorIconColor = colors.iconColor;
  return (
    <View
      style={{ ...styles.headerContainer, backgroundColor: colors.headerColor }}
    >
      <StatusBar style="auto" />
      <View style={styles.logoContainer}>
        <AntDesign style={styles.logo} name="youtube" size={32} color="red" />
        <Text style={{ ...styles.logoText, color: vectorIconColor }}>
          YouTube
        </Text>
      </View>
      <View style={styles.iconsContainer}>
        <Ionicons
          name={Platform.OS === 'android' ? 'md-videocam' : 'ios-videocam'}
          size={32}
          color={vectorIconColor}
        />
        <Ionicons
          name={Platform.OS === 'android' ? 'md-search' : 'ios-search'}
          size={32}
          color={vectorIconColor}
          onPress={() => navigation.navigate('search')}
        />
        <MaterialIcons
          name="account-circle"
          size={32}
          color={vectorIconColor}
          onPress={() =>
            dispatch({ type: 'CHANGE_THEME', payload: !currentTheme })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: Constant.statusBarHeight,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 4,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginLeft: 20,
  },
  logoText: {
    fontSize: 22,
    marginLeft: 5,
    fontWeight: 'bold',
    fontFamily: 'ubuntu-condensed',
    marginBottom: 3,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 150,
  },
});

export default Header;
