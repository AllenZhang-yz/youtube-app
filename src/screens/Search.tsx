import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  TextInput,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import Constant from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import MiniCard from '../components/MiniCard';
import { IModalStackNavigation, CustomTheme } from '../../App';
import {
  fetchSearchResultStart,
  searchResultLoadMore,
} from '../reducers/data/dataActions';
import { IRootState } from '../../App';

const SearchScreen = () => {
  const [searchValue, setSearchValue] = useState('');

  const dispatch = useDispatch();
  const miniCardData = useSelector<IRootState, any[]>(
    (state) => state.data.showSearchResult
  );
  const isFetching = useSelector<IRootState, boolean>(
    (state) => state.data.isSearchFetching
  );
  const hasMore = useSelector<IRootState, boolean>(
    (state) => state.data.pagination.hasMore
  );

  const navigation = useNavigation<IModalStackNavigation>();
  const { colors } = useTheme() as CustomTheme;

  const footer = useMemo(() => {
    if (!hasMore) {
      return (
        <View style={styles.loading}>
          <Text>No More...</Text>
        </View>
      );
    }
    if (hasMore && miniCardData.length > 0) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size={10} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      );
    }
    return null;
  }, [hasMore, miniCardData]);

  const onEndReached = useCallback(() => {
    if (!hasMore) {
      return;
    }
    dispatch(searchResultLoadMore());
  }, [hasMore]);

  return (
    <View style={styles.searchContainer}>
      <View style={{ ...styles.search, backgroundColor: colors.headerColor }}>
        <Ionicons
          name={Platform.OS === 'android' ? 'md-arrow-back' : 'ios-arrow-back'}
          size={32}
          color={colors.iconColor}
          onPress={() => navigation.goBack()}
        />
        <TextInput
          style={styles.searchInput}
          onChangeText={(text) => setSearchValue(text)}
          value={searchValue}
          onSubmitEditing={() => dispatch(fetchSearchResultStart(searchValue))}
          autoCapitalize="none"
        />
        <Ionicons
          name={Platform.OS === 'android' ? 'md-send' : 'ios-send'}
          size={32}
          color={colors.iconColor}
          onPress={() => dispatch(fetchSearchResultStart(searchValue))}
        />
      </View>
      {isFetching ? (
        <ActivityIndicator style={styles.loader} />
      ) : (
        <FlatList
          data={miniCardData}
          renderItem={({ item }) => (
            <MiniCard
              videoId={item.id.videoId}
              title={item.snippet.title}
              channel={item.snippet.channelTitle}
              publishedAt={item.snippet.publishedAt}
            />
          )}
          keyExtractor={(item) => item.id.videoId}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.2}
          ListFooterComponent={footer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    marginTop: Constant.statusBarHeight,
  },
  search: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
  },
  searchInput: {
    width: '70%',
    backgroundColor: '#e6e6e6',
  },
  loader: {
    marginTop: '50%',
  },
  loading: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  loadingText: {
    color: '#6f6f6f',
    fontSize: 10,
    marginTop: 7,
  },
});

export default SearchScreen;
