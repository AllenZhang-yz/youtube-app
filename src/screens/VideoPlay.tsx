import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { AntDesign } from '@expo/vector-icons';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import Constant from 'expo-constants';
import { ModalStackParamList, IModalStackNavigation } from '../../App';

const VideoPlay = () => {
  const route = useRoute<RouteProp<ModalStackParamList, 'videoPlay'>>();
  const navigation = useNavigation<IModalStackNavigation>();
  const { videoId, title } = route.params;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.back}
        activeOpacity={0.8}
      >
        <AntDesign
          name={Platform.OS === 'android' ? 'arrowleft' : 'left'}
          size={30}
          color="#fff"
        />
      </TouchableOpacity>

      <View style={styles.webViewContainer}>
        <WebView
          source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
          domStorageEnabled={true}
        />
      </View>
      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
        {title}
      </Text>
      <View style={{ borderBottomWidth: 1 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constant.statusBarHeight,
  },
  back: {
    position: 'absolute',
    zIndex: 10,
    color: '#fff',
    top: 10,
    left: 10,
    opacity: 1,
  },
  webViewContainer: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 20,
    width: Dimensions.get('screen').width - 50,
    margin: 9,
  },
});

export default VideoPlay;
