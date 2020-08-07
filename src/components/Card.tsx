import React, { FC } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin//relativeTime';
import { IModalStackNavigation, CustomTheme } from '../../App';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface ICardProps {
  videoId: string;
  title: string;
  channel: string;
  publishedAt: Date;
}

const Card: FC<ICardProps> = ({ videoId, title, channel, publishedAt }) => {
  dayjs.extend(relativeTime);
  const navigation = useNavigation<IModalStackNavigation>();
  const { colors } = useTheme() as CustomTheme;
  const textColor = colors.iconColor;
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => navigation.navigate('videoPlay', { videoId, title })}
    >
      <View style={styles.cardContainer}>
        <Image
          source={{ uri: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` }}
          style={styles.image}
        />
        <View style={styles.infoContainer}>
          <MaterialIcons
            name="account-circle"
            size={40}
            color={colors.iconColor}
          />
          <View style={styles.info}>
            <Text
              style={{ ...styles.title, color: textColor }}
              ellipsizeMode="tail"
              numberOfLines={2}
            >
              {title}
            </Text>
            <View style={styles.subInfo}>
              <Text
                style={styles.channel}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {channel}
              </Text>
              <Text style={styles.publishedDate}>
                Published:{dayjs(publishedAt).fromNow()}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
  infoContainer: {
    flexDirection: 'row',
    margin: 5,
  },
  info: {
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    width: Dimensions.get('screen').width - 70,
  },
  subInfo: {
    flexDirection: 'row',
  },
  channel: {
    marginRight: 20,
    width: 140,
    color: 'gray',
  },
  publishedDate: {
    color: 'gray',
  },
});

export default Card;
