# Installation

1. Pull this repo to the root folder (same lvl as `package.json`) folder to get `router/` folder.

2. Add this to your `all.ts`:

```js
export { storable, dropdownsStore, Toaster, Nprogress, Loader, Idk, GoTop, Modal } from '/les/';
```

2. Add this to your `base.svelte`:

```js
import '/les/index.css';
```

3. To override icons in `Icons.ts:Icons`:

```
import { LesIcons } from '/les/';

LesIcons.go_top_up = ({size, width, height, stroke, style, cls, title, attrs}={}) => svg(size, width, height, stroke, style, cls, title, attrs,`
    <path d="m4.5 15.75 7.5-7.5 7.5 7.5" />
`)
LesIcons.go_top_up = ({size, width, height, stroke, style, cls, title, attrs}={}) => svg(size, width, height, stroke, style, cls, title, attrs,`
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" />
`)
```