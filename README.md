# Instagram Followed Feed Redirector

Firefox WebExtension that runs only on `instagram.com` and redirects the plain Instagram home feed to the `?variant=following` feed.

## Temporary Install

1. Open Firefox.
2. Go to `about:debugging#/runtime/this-firefox`.
3. Click `Load Temporary Add-on...`.
4. Select `manifest.json` from this folder.
5. Open `https://www.instagram.com/`.

Temporary add-ons are removed when Firefox restarts.

## Signing For Regular Install

Regular Firefox requires add-ons to be signed by Mozilla.

1. Open https://addons.mozilla.org/developers/.
2. Sign in with a Mozilla account.
3. Choose `Submit a New Add-on`.
4. Choose `On your own` if you want a signed private/self-distributed add-on that is not listed publicly on AMO.
5. Upload `instagram-followed-feed-redirector.xpi`.
6. If asked whether source code is required, choose `No`. This add-on has no minified, obfuscated, generated, or bundled code.
7. Wait for the signing email from Mozilla.
8. Download the signed `.xpi` from the submitted version page.
9. Install that signed `.xpi` in Firefox.

## Notes

- The extension does not request broad browser permissions.
- It only loads on `https://www.instagram.com/*` and `https://instagram.com/*`.
- It does not call external services, inject remote code, store data, or click arbitrary page content.
