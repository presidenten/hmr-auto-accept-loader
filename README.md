# hmr-auto-accept-loader

This javascript loader that adds basic hot module replacement accepts at the end of files, if they import files that end according to the configured naming convention.

```javascript
if(module.hot) {
  module.hot.accept(['file1.js', 'file2.js', 'etc...'], () => {});
}
```

When can this be of help? Imagine a Vue/Vuex project that uses [webpack-context-hmr](https://github.com/presidenten/webpack-context-hmr) or [webpack-context-vuex-hmr](https://github.com/presidenten/webpack-context-vuex-hmr) to get HMR on vuex models, but the models also export their api's like an object:
```javascript
export const api = {
  getters: {
    getter1: 'module/getters/getter1',
  },
  actions: {
    action1: 'module/actions/action1',
  },
  mutations: {
    mutation1: 'module/mutations/mutation1',
  },
};

// Normal Vuex module setup.....

export default {
    state,
    getters,
    actions,
    mutations,
};

```
that is used elsewhere to dispatch actions. Then all files using the Vuex modules api must declare the `if(module.hot)...` with each Vuex module in the array for the HMR to work.

Aint no one got time for that.

## Usage
This loader can for example be used right after eslint in webpacks preloader.
Make sure to edit the `fileEnding` query according to the projects naming convention. Here it looks for files with filenames ending with `-store.js`.
```javascript
preLoaders: [
  {
    test: /\.js$/,
    loader: 'hmr-auto-accept-loader?fileEnding=-store.js!eslint',
    include: projectRoot,
    exclude: /node_modules/,
  },
],
```

# License
MIT

