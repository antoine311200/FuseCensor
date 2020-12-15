<h1 align="center">Fuse Censor Extension</h1>

<div align="center">
  <img src="extension/resources/fuse_censor_64.png">
</div>

## Introduction

**Fuse Censor** emerged in the context of the Coding Weeks as as project using machine learning and more explicitly Natural Language Processing with Sentiment Analysis. After being through some brainstorming we have come up with the basic idea of a multi-browser extension analysing the body of a page replacing or censoring all explicitly negative contents. 
#
## Description
![version](https://img.shields.io/badge/version-1.0.0-blue)
![development](https://img.shields.io/badge/development-in%20progress-orange)
![maintenance](https://img.shields.io/badge/maintained-yes-brightgreen.svg)
![launched](https://img.shields.io/badge/launched-no-red.svg)


![trello](https://img.shields.io/badge/trello-red?logo=trello)
![trello](https://img.shields.io/badge/vsc-blue?logo=visual-studio-code)
<!-- ![rating](https://img.shields.io/badge/rating-★★★★★-yellow) -->
<b>Fuse Censor</b> is an extension that provides an efficient way to censor swear words and negative contents based on sentiment analysis through Naturla Langage Processing.
#
## Options


![javascript](https://img.shields.io/badge/language-javascript-yellow)
![python](https://img.shields.io/badge/language-python-blue)
![javascript](https://img.shields.io/badge/language-html-green)
![javascript](https://img.shields.io/badge/language-css-red)

![API](https://img.shields.io/badge/API-TensorFlow-orange)
![API](https://img.shields.io/badge/API-Chrome%20extension-orange)

Here you can see how the project has been structured.
<div align="center">
  <img src="extension/structure.png">
</div>

#
## Install

First, you will have to download the gitlab project of the extension. (You will notice that the core folder using Python is not mandatory as it is the core of the AI model trained to analyse sentences, it is saved into the gitlab project for educational reasons to show our work using NLP and for the user to improve the code if he wants to)

```
$ git clone https://gitlab-cw2.centralesupelec.fr/fabien.charlier/swear-analyzer.git
```

In case of future updates and release, simply run this line of command:

```
$ git pull
```

From now on, the installation will be very easy but may differ depending on your browser. 

Here is how it works for Chrome, Mozilla and Edge browser.


<br>
<br>

### Edge browser

First, type in your search bar the following:
> edge://extensions

Then toggle the Developper mode, load the compressed element and select the extension folder:

<div align="center">
  <img src="images/tuto_edge.png">
</div>
Here you go! Have fun!


<br>
<br>

### Chrome browser

Type in the search bar
> chrome://extensions/

Then toggle the Developper mode, load the compressed element and select the extension folder:

<div align="center">
  <img src="images/tuto_chrome.png">
</div>
Here you go! Have fun!


<br>
<br>

### Mozilla browser

This one is a bit tricky, type on the search bar
> about:debugging#/runtime/this-firefox
Then click on "Load Temporary Addon..." and open the 'manifest.json' file.
<div align="center">
  <img src="images/tuto_mozilla.png">
</div>

Here you go! Have fun!