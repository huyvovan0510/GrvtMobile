import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface SearchBarProps {
  onSearch: (text: string) => void;
  onInputFocus?: () => void;
}

const SearchBar = ({ onSearch, onInputFocus }: SearchBarProps) => {
  const inputRef = useRef<any>();
  const [showClearIcon, setShowClearIcon] = useState(false);
  const shadowOpacity = useSharedValue(0);

  const onClear = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.clear();
      setShowClearIcon(false);
      onSearch && onSearch("");
    }
  };

  const onChangeText = (text: string) => {
    if (text.length > 0 && !showClearIcon) {
      setShowClearIcon(true);
    } else if (text.length <= 0 && showClearIcon) {
      setShowClearIcon(false);
    }
    //
    onSearch && onSearch(text);
  };

  const onFocus = () => {
    if (typeof onInputFocus === "function") {
      onInputFocus?.();
    }
    shadowOpacity.value = 0.25;
  };

  const onBlur = () => {
    shadowOpacity.value = 0;
  };

  const inputStyle = useAnimatedStyle(() => {
    return {
      shadowOpacity: withTiming(shadowOpacity.value, { duration: 300 }),
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.searchContainer, inputStyle]}>
        <Ionicons name="search" color={"#4a454f"} size={18} />
        <TextInput
          ref={inputRef}
          placeholder="Search..."
          placeholderTextColor={"#4a454f"}
          style={styles.searchInput}
          multiline={false}
          autoCorrect={false}
          returnKeyType={"search"}
          onChangeText={onChangeText}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        {showClearIcon && (
          <Animated.View exiting={FadeOut} entering={FadeIn}>
            <Pressable onPress={onClear}>
              <Ionicons
                name="close-circle-outline"
                color={"#4a454f"}
                size={20}
              />
            </Pressable>
          </Animated.View>
        )}
      </Animated.View>
    </View>
  );
};

export default SearchBar;
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#eee8f4",

    height: 45,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRadius: 20,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowRadius: 5,

    elevation: 5,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 8,
  },
  container: {
    backgroundColor: "#242937",
    paddingBottom: 12,
  },
});
