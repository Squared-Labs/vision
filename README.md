# Vision Browser
A minimal web browser. Created using Electron.

**In its current state, Vision is very basic and full of bugs & glitches. I *DON'T* suggest using this browser for any serious use.** That being said, if you *do* decide to use it, Vision is currently much more suitable as a single-purpose utility as it does not currently support multiple tabs (and will probably not until a viable solution is found, without being too inefficient). An example of using Vision as a single-purpose utility would be for something like digital signage.

## Project Information
You can visit Vision's website [here](https://vision.squared.bean.codes). We're also looking for developers and testers, you can click [on this](https://vision.squared.bean.codes/careers) to find out more!

## Where are the docs?
There isn't really documentation for how to use the browser, because it should really be straight forward. Although, we do have some custom links for Vision (as well as a protocol API for versions 20.04.03 and higher).

vision://about opens a window that shows information about the release and stuff. Kinda like Chrome's--Actually, we did copy the page source from Chromium's, but we modified it (of course).

Anyway, that being said, if you're a developer (or even just some consumer) who wants to modify Vision. you can visit [this repo](https://github.com/BeanedTaco/vision-tools) to access tools so you can rebuild the browser. You can find documentation for Vision's API [here](https://vision.squared.bean.codes/docs).

## Version numbers
Each release of Vision uses *two* version identifiers/numbers.

### Year-Month-Revision Version Number/ID (Y-M-R)
Example: 20.02.01

Format: yy.mm.vr

*yy represents the two-digit, mm represents the two-digit month, and vr represents the version revision (more digits can be added for this one!)*

**This version number format is the de-facto format, meaning that version numbers will normally be presented in this way (with a few exceptions).**

### Semantic Version Number/ID (semV; README may also reference semantic versions under the name "API" or "APIv*x*")
Example: 1.0.0

*Learn more about semantic versioning [here](https://semver.org/).*

**This version number format is usually only used in places like package.json, as well as places where only semantic versioning is recognized.**

### How would version numbers be presented in package.json?
For versions v20.04.02 and beyond, the package.json versions are presented using *exclusively* the Y-M-R version number.

Then, for versions v20.02.02/APIv1.0.0.2 to v20.04.01/APIv1.2.0, the package.json versions are presented using the semantic version number, instead of the Y-M-R version number. 

*However*, for versions v20.02.01/APIv1.0.0 and v20.02.02, the package.json versions are presented using the *Y-M-R* version number, followed by the *semantic* ___major___ version number. For example, v20.02.02's package.json version is ``v20.02.02 (base v1)``.

## When is v2 being released?
Version 2 of Vision is set to be released in late January 2021, but this is not a final date.
