import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Card from '../components/Card';
import { IRootState } from '../../App';

const HomeScreen = () => {
  const cardData = useSelector<IRootState, any[]>(
    (state) => state.data.showSearchResult
  );
  return (
    <View style={styles.homeContainer}>
      <FlatList
        data={cardData}
        renderItem={({ item }) => (
          <Card
            videoId={item.id.videoId}
            title={item.snippet.title}
            channel={item.snippet.channelTitle}
            publishedAt={item.snippet.publishedAt}
          />
        )}
        keyExtractor={(item) => item.id.videoId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
});

export default HomeScreen;
