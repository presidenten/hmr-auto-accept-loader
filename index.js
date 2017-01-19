const loaderUtils = require('loader-utils');

module.exports = function (source) {
  const config = loaderUtils.parseQuery(this.query);
  const filepaths = new RegExp('\'(.*\\b' + config.fileEnding.replace('.', '\\.') + '\\b.*)\'', 'g');
  const storePaths = source.match(filepaths);

  if (storePaths && storePaths.length) {
    source += '\nif (module.hot) { module.hot.accept([' + storePaths + '], () => {});} // eslint-disable-line \n';
  }

  return source;
};
