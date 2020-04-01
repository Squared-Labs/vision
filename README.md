# Vision Browser
A minimal web browser. Created using Electron.

**In its current state, Vision is very basic and full of bugs & glitches. I *DON'T* suggest using this browser for any serious use.** That being said, if you *do* decide to use it, Vision is currently much more suitable as a single-purpose utility as it does not currently support multiple tabs (and will probably not until a viable solution is found, without being too inefficient). An example of using Vision as a single-purpose utility would be for something like digital signage.

## Project Information
You can visit Vision's website [here](https://vision.saturdaynightdead.xyz). We're also looking for developers and testers, you can click [on this](https://vision.saturdaynightdead.xyz/future-testers-developers) to find out more!

## Where are the docs?
There isn't really documentation for how to use the browser, because it should really be straight forward. Although, we do have some custom links for Vision (as well as a protocol API for versions 20.04.03 and higher).

vision://about opens a window that shows information about the release and stuff. Kinda like Chrome's--Actually, we did copy the page source from Chromium's, but we modified it (of course).


Anyway, that being said, you may visit the docs folder [here](docs). For developers who want to modify Vision, you can visit [this repo](https://github.com/BeanedTaco/vision-tools) to access tools so you can rebuild the browser. API docs will be in the docs folder, as well.

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

## What happened to original v2 plans?
After additional testing and optimization, I have determined that BrowserView will not be coming to Vision. ``webView`` is already an alright engine, so we will be sticking to that. Additionally, implementing BrowserView would require a rewrite of almost all components of Vision, and that wouldn't be nice for my workflow.

## What will be included in v2?
~~I plan to include DNS-over-HTTPS, bookmarks, and proper downloads. This will take a while to implement, but it should be done sooner.~~
DNS over HTTPS hasn't been implemented into the APIv2 branch yet, nor have bookmarks been implemented. The downloads bar and manager will be implemented after APIv2's release.
