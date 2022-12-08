---
title: "./init_blog.sh"
date: 2022-12-04T18:45:22+03:00
draft: false
---

I'll post some actual content here in the near future, but in the meantime I'm posting this to show some things I learned while making this website and showcase the CSS that turns Markdown into HTML in this section of the website.

It was pretty hard to get this site working. First I had to build a sufficiently good-looking website from the ground up and write responsive CSS. After like two pages of HTML it was already too complex due to ⚠️ **_code reuse_** ⚠️.

So after a bit of searching for static site generators I picked Hugo due to its powerful templating abilities. I'm probably missing something as I am not familiar with Go which Hugo is written in but documentation for templating was hard to find, which made it difficult to code some details. So learning Hugo took time, and then learning about the unwanted defaults of different devices and workarounds for them took maybe even longer.

Getting code blocks with a horizontal scroll bar like

```text
t                                                                                                                            t
h                                                                                                                            h
e                                                                                                                            e
s                                                                                                                            s
e                                                                                                                            e
```

to work seems easy with `overflow-x: auto`, but iOS makes this simple job difficult by requiring an obscure CSS reset to have consistent font sizes across every `<span>` in the code block.

Here is the fix for anyone that might come across this blog post in the future:

```css
html {
  /* https://kilianvalkhof.com/2022/css-html/your-css-reset-needs-text-size-adjust-probably/ */
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
}
```

Took hours to figure that one out.

Also, iOS likes to make fullscreen hamburger menus a hard thing by limiting you to two similarly bad actions at the time of button click.

1. Make the background (which is fully covered by the menu) scrollable which you don't really want as it is bad UX to let a user affect something they don't see and they might lose track of where they last were on the page while in the menu.
2. Put user at the top of the page. This is also not optimal because if the user were already many paragraphs into a post and used the menu, they'd now have to scroll all the way down, getting distracted in the process.

As always, there is a workaround:

```css
html.no-scroll {
  /* position:fixed is needed due to a bug in mobile safari. height:100vh; overflow:hidden; also kind of works but it's buggy, this works better.*/
  position: fixed;
}
```

```js
var recordedTopScroll = 0;
let hamMenu = document.getElementById("mobile-hamburger-menu");
let hamButton = document.getElementById("mobile-hamburger-menu-button");
let mobileNavBar = document.getElementById("mobile-navbar");
hamButton.onclick = function () {
  if (!hamButton.classList.contains("active")) {
    recordedTopScroll = document.documentElement.scrollTop;
  }

  hamButton.classList.toggle("active");
  hamMenu.classList.toggle("active");

  setTimeout(function () {
    if (hamButton.classList.contains("active")) {
      document.body.classList.add("no-scroll");
    }
  }, 600);

  if (!hamButton.classList.contains("active")) {
    document.body.classList.remove("no-scroll");
    document.documentElement.scrollTop = recordedTopScroll;
  }
};
```

The CSS is to stop scroll on the `<html>` element and the JS sets the class on the page after 600ms which is the time it takes to animate the menu sliding down in my website. The menu hides the visual changes setting `position: fixed;` brings. It also records the amount of scroll from the top. The `no-scroll` class puts the page at the top as a side effect which is how (2) happens. When the user exits the menu, the `no-scroll` class is removed and the scroll value is quickly recovered back to its original value. By the time the menu starts sliding up, the scroll has long been set to its original value, and the user doesn't see any of the magic happening behind the scenes.

Sadly, this approach also has a small downside: In both the old and new Safari layouts, setting the body to `position: fixed;` uncollapses the address bar. This is not a big deal but it would be better if the browser layout didn't change.

Anyways, now that technical problems like these have been sorted out let's move onto some fun stuff.

As you have seen above, Hugo has code highlighting capabilities for many different languages:

```bf
>+++++++++[<++++++++>-]<.>+++++++[<++++>-]<+.+++++++..+++.>>>++++++++[<++++>-]
<.>>>++++++++++[<+++++++++>-]<---.<<<<.+++.------.--------.>>+.>++++++++++.
```

\
I also wrote a small bit of styling for `<figure>` + Hugo's shortcodes allow for inserting `<figure>`s into markdown so posts can have things like:
{{<figure alt="Website Logo" class="writeup-image" src="/images/can_logo.svg" caption="Website Logo">}}

Other than that a lot of styling is provided by Hugo out-of-the-box:  
_Italic_  
**Bold**  
**_Both_**

All of these should be strong enough of a foundation for technical writeups and general posting, but Hugo makes it pretty easy to add new styling if needed---just have to watch out for browsers doing unexpected things.
