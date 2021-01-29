const { merge } = require("webpack-merge");

const applyPresets = (presets) => {
  const mergedPresets = [].concat(...[presets]);
  const mergedConfigs = mergedPresets.map((presetName) =>
    require(`./webpack.${presetName}`)()
  );
  return merge({}, ...mergedConfigs);
};

module.exports = applyPresets;
