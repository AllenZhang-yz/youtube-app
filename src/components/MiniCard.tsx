import React, { FC } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin//relativeTime';
import { IModalStackNavigation, CustomTheme } from '../../App';

interface IMiniCardProps {
  videoId: string;
  title: string;
  channel: string;
  publishedAt: Date;
}

const MiniCard: FC<IMiniCardProps> = ({
  videoId,
  title,
  channel,
  publishedAt,
}) => {
  dayjs.extend(relativeTime);
  const navigation = useNavigation<IModalStackNavigation>();
  const { colors } = useTheme() as CustomTheme;
  const textColor = colors.iconColor;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('videoPlay', { videoId, title })}
    >
      <View style={styles.miniCardContainer}>
        <Image
          source={{ uri: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` }}
          style={styles.image}
        />
        <View style={styles.info}>
          <Text
            style={{ ...styles.title, color: textColor }}
            ellipsizeMode="tail"
            numberOfLines={3}
          >
            {title}
          </Text>
          <Text style={styles.channel} ellipsizeMode="tail" numberOfLines={2}>
            {channel}
          </Text>
          <Text style={styles.publishedAt}>
            Published:{dayjs(publishedAt).fromNow()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  miniCardContainer: {
    flexDirection: 'row',
    margin: 10,
    marginBottom: 0,
  },
  image: {
    width: '45%',
    height: 100,
  },
  info: {
    paddingLeft: 7,
  },
  title: {
    fontSize: 17,
    width: Dimensions.get('screen').width / 2,
  },
  channel: {
    fontSize: 12,
    width: Dimensions.get('screen').width / 2,
    color: 'gray',
  },
  publishedAt: {
    fontSize: 12,
    color: 'gray',
  },
});

export default MiniCard;
