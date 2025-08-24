# Installation

1. Pull this repo to the root folder (same lvl as `package.json`) folder to get `router/` folder.

2. Add this to your `all.js`:

```js
// LES
export { storable } from '/les/storable.js';
export { Toaster } from '/les/toaster/toaster.js';
export { default as Nprogress } from '/les/Nprogress.svelte';
export { default as Loader } from '/les/Loader.svelte';
export { default as Idk } from '/les/Idk.svelte';
```

2. Add this to your `base.svelte`:

```js
// LES
import '/les/toaster/toaster.css';
```