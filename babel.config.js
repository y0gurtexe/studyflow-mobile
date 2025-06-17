module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // This line is important!
      "react-native-reanimated/plugin",
    ],
  };
};
