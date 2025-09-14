/*
Expects this in `app.html`:
```html
<script>
    const Platform = new function() {
        this.IS_MOBILE_DEVICE = %IS_MOBILE_DEVICE%;
        this.IS_MOBILE_ANDROID = %IS_MOBILE_ANDROID%;
        this.IS_DESKTOP_DEVICE = !IS_MOBILE_DEVICE;
        this.IS_MOBILE_IOS = !IS_MOBILE_ANDROID;
    }
</script>

<body class="%BODY_MODIFIERS%">
    ...
```

Usage in `hooks.server.js`:
```ts
...
import { handle_device } from '/les/';

export async function handle({ event, resolve }) {

	...

	// DEVICE HTML VARS
	const device_html_vars = handle_device(event);

	const options = {
		transformPageChunk: ({ html }) => {
			for (const [var_name, value] of device_html_vars) {
				html = html.replace(var_name, value);
			}
			return html;
		}
	}

	const response = await resolve(event, options);
	return response;
}
```

*/

export function handle_device(event) {
    const userAgent = event.request.headers.get('user-agent');

    const is_mobile_device = /mobi/i.test(userAgent);
    const is_mobile_android = userAgent.toLowerCase().indexOf('android') > -1; // https://stackoverflow.com/a/6031480/4117781

    let body_modifiers_array = [];

    if (is_mobile_device) {
        body_modifiers_array.push('_IS_MOBILE_DEVICE');
    } else {
        body_modifiers_array.push('_IS_DESKTOP_DEVICE');
    }

    if (is_mobile_device) {
        if (is_mobile_android) {
            body_modifiers_array.push('_IS_MOBILE_ANDROID');
        } else {
            body_modifiers_array.push('_IS_MOBILE_IOS');
        }
    }

    let body_modifiers = body_modifiers_array.join(' ');

    let device_html_vars = {
        '%BODY_MODIFIERS%': body_modifiers,
        '%IS_MOBILE_DEVICE%': is_mobile_device,
        '%IS_MOBILE_ANDROID%': is_mobile_android
    }

    return device_html_vars;
}