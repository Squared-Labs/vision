# Vision Browser
A minimal web browser. Created using Electron.

**In its current state, Vision is very basic and full of bugs & glitches. I *DON'T* suggest using this browser for any serious use.** That being said, if you *do* decide to use it, Vision is currently much more suitable as a single-purpose utility as it does not currently support multiple tabs (and will probably not until a viable solution is found, without being too inefficient). An example of using Vision as a single-purpose utility would be for something like digital signage.

## Version numbers
Each release of Vision uses *two* version identifiers/numbers.

**DATE-TIME VERSION ID/NUMBER**
Example: 20.02.01
Format: yy.mm.vr

*yy represents the two-digit, mm represents the two-digit month, and vr represents the version revision (more digits can be added for this one!)*

**SEMANTIC VERSIONING**
Example: 1.0.0

*Learn more about semantic versioning [here](https://semver.org/).*

## Why are all base v1.x releases listed as "pre-release"?
Base v1 is very minimal and unstable. It uses the Electron ``webview`` tag, which is based on Chromium's ``webview``. As the latter is undergoing large architectural changes, many bugs are present in webview. Electron has implemented ``BrowserView``, but as it is hosted in the main process (as opposed to the rendering process), I cannot currently use this method since I can't currently figure out how to use Electron remotes *for the life of me*. Thus, I have deemed base v1.x releases as *unstable and not meant for production use*.
