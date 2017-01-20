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

# A word of caution
Many modules might have parents that need to do some patching for the HMR to work. This loader is not for these kind of modules, but simple ones were the parents would write a empty handler HMR handler `() => {}` anyways.
```javascript
if(module.hot) {
  module.hot.accept(['<path-to-module>'], () => {});
}
```
In the Vuex modules case this works since the exposed object of strings seldom gets updated and the complex part of the module is handled by something like [webpack-context-vuex-hmr](https://github.com/presidenten/webpack-context-vuex-hmr).
There might be a few situations were the HMR might not work because of the empty handlers and thus requires a page refresh. The correct way to avoid this would be to write a proper handler everywhere, but sometimes good enough is good enough. And thats where this loader fits in.

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

