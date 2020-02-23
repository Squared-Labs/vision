# Vision Browser
A minimal web browser. Created using Electron.

**In its current state, Vision is very basic and full of bugs & glitches. I *DON'T* suggest using this browser for any serious use.** That being said, if you *do* decide to use it, Vision is currently much more suitable as a single-purpose utility as it does not currently support multiple tabs (and will probably not until a viable solution is found, without being too inefficient). An example of using Vision as a single-purpose utility would be for something like digital signage.

## Version numbers
Each release of Vision uses *two* version identifiers/numbers.

### Year-Month-Revision Version Number/ID (Y-M-R)
Example: 20.02.01

Format: yy.mm.vr

*yy represents the two-digit, mm represents the two-digit month, and vr represents the version revision (more digits can be added for this one!)*

**This version number format is the de-facto format, meaning that version numbers will normally be presented in this way (with a few exceptions).**

### Semantic Version Number/ID (semV)
Example: 1.0.0

*Learn more about semantic versioning [here](https://semver.org/).*

**This version number format is usually only used in places like package.json, as well as places where only semantic versioning is recognized.**

### How would version numbers be presented in package.json?
For versions of Vision beyond v20.02.02/semV1.0.0.2, the package.json versions are presented using the semantic version number, instead of the Y-M-R version number. 

*However*, for versions v20.02.01/semV1.0.0 and v20.02.02, the package.json versions are presented using the *Y-M-R* version number, followed by the *semantic* ___major___ version number. For example, v20.02.02's package.json version is ``v20.02.02 (base v1)``.

## Why are all base v1.x releases listed as "pre-release"?
Base v1 is very minimal and unstable. It uses the Electron ``webview`` tag, which is based on Chromium's ``webview``. As the latter is undergoing large architectural changes, many bugs are present in webview. Electron has implemented ``BrowserView``, but as it is hosted in the main process (as opposed to the rendering process), I cannot currently use this method since I can't currently figure out how to use Electron remotes *for the life of me*. Thus, I have deemed base v1.x releases as *unstable and not meant for production use*.
