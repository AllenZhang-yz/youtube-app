import React, { FC, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import MiniCard from '../components/MiniCard';
import { fetchTrendingStart } from '../reducers/data/dataActions';
import { IRootState } from '../../App';

interface ILittleCardProps {
  name: string;
  fetchTrendingData: (name: string) => void;
}

const LittleCard: FC<ILittleCardProps> = ({ name, fetchTrendingData }) => {
  return (
    <TouchableOpacity onPress={() => fetchTrendingData(name)}>
      <View style={styles.littleCardContainer}>
        <Text style={styles.littleCardText}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Explore = () => {
  const names = [
    'Gaming',
    'Trending',
    'Music',
    'News',
    'Sports',
    'Movies',
    'Fashion',
    'TV',
  ];
  const dispatch = useDispatch();
  const trendingVideos = useSelector<IRootState, any[]>(
    (state) => state.data.trendingVideos
  );
  const isFetching = useSelector<IRootState, boolean>(
    (state) => state.data.isTrendingFetching
  );
  useEffect(() => {
    dispatch(fetchTrendingStart('Gaming'));
  }, []);

  return (
    <View style={styles.container}>
      {names.map((name, index) => (
        <LittleCard
          key={index}
          name={name}
          fetchTrendingData={() => dispatch(fetchTrendingStart(name))}
        />
      ))}
      <View>
        <Text style={styles.trending}>Trending Videos</Text>

        {isFetching ? (
          <ActivityIndicator style={styles.loader} />
        ) : (
          <FlatList
            data={trendingVideos}
            renderItem={({ item }) => (
              <MiniCard
                videoId={item.id.videoId}
                title={item.snippet.title}
                channel={item.snippet.channelTitle}
                publishedAt={item.snippet.publishedAt}
              />
            )}
            keyExtractor={(item) => item.id.videoId}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  littleCardContainer: {
    backgroundColor: 'red',
    width: 180,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    marginTop: 10,
  },
  littleCardText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 22,
  },
  trending: {
    margin: 8,
    fontSize: 22,
    borderBottomWidth: 1,
    textAlign: 'center',
  },
  loader: {
    marginTop: '40%',
  },
});

export default Explore;
