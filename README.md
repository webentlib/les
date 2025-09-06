# Installation

1. Pull this repo to the root folder (same lvl as `package.json`) folder to get `router/` folder.

2. Add this to your `all.js`:

```js
// LES
export { storable } from './storable.ts';
export { dropdownsStore } from './dropdowns.svelte.ts';
export { Toaster } from './toaster/toaster.ts';
export { default as Nprogress } from './nprogress/Nprogress.svelte';
export { default as Loader } from './Loader.svelte';
export { default as Idk } from './Idk.svelte';
export { default as GoTop } from './GoTop.svelte';
export { default as Modal } from './Modal.svelte';
```

2. Add this to your `base.svelte`:

```js
// LES
import '/les/toaster/toaster.css';
```