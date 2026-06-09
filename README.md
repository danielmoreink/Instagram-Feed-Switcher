# Instagram Followed Feed Redirector

Firefox WebExtension that runs only on `instagram.com` and redirects the plain Instagram home feed to the `?variant=following` feed.
For my fellow scatterbrains.

## Temporary Install

1. Open Firefox.
2. Go to `about:debugging#/runtime/this-firefox`.
3. Click `Load Temporary Add-on...`.
4. Select `manifest.json` from this folder.
5. Open `https://www.instagram.com/`.

Temporary add-ons are removed when Firefox restarts.

## Notes

- The extension does not request broad browser permissions.
- It only loads on `https://www.instagram.com/*` and `https://instagram.com/*`.
- It does not call external services, inject remote code, store data, or click arbitrary page content.
