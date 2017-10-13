# Paket? Attack it!
[A chrome extension](https://chrome.google.com/webstore/detail/paket-attaket/cahelnnmpipkglekhnoagfjgnelmeakd) that allows Paket into the Nuget Gallery..unofficially.

A bit of fun I'm having with [the "infamous" PR on the Nuget Gallery](https://github.com/NuGet/NuGetGallery/pull/4437) that attempted to add Paket as a command tab.

# NO LONGER NEEDED!
Nuget.org now natively supports the Paket CLI, so users of this extension will only see duplicate tabs.

Happy that this is now obsolete. :)

## Build instructions

In order to build project locally you'll need to install `node` & `npm`. You can do that by using [official installer](https://nodejs.org/en/) or node version manager: [creatonix/nvm](https://github.com/creatonix/nvm).
After installation make sure `npm` is globally available (set on `$PATH`) by running `npm -v`.

1. Clone project
2. Install required dev dependencies: `npm install`
3. Start live compilation: `npm run watch`
4. Go to Google Chrome, open `chrome://extensions/`
5. Turn on :white_check_mark: `Developer mode`
6. Hit <kbd>Load unpacked extension...</kbd> and navigate to project's `dist` directory
7. Make changes & have fun :wink:

If you want to use manual compilation change step 3. with `npm run build` and execute it again after you saved your changes.

## FAQ

### How did this come about?
I'd been looking for an excuse to build a basic Chrome extension. I saw the PR and thought, "hmmm...."

As for how the original PR issue came about, maybe by the time this is published they'll have figured that out. :)

### Are PRs accepted?
YUP.

### Are you just trying to be a jerk?
I'm really not, I promise. If this isn't received kindly I'll just take it down. It was an excuse to explore Chrome extensions.

### Are you affiliated with Nuget, Paket, or Microsoft in any way?
Nope. I'm jut a guy who wanted to code a quick and dirty Chrome extension.
