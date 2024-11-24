# WebCyphr

WebCyphr-a web extension that safeguards your browsing by detecting potential threats and phishing websites while offering a unique password generator for enhanced security.

<p align="center">
  <img src="icon.png", width="400", height="400", title="webCyphr"/>
</p>
<p align="center">
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#required-tools">Required Tools</a>
  <br>
  <br>

  <div align="center">
  <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/RubberPirate/WebCyphr">
  <img alt="GitHub license" src="https://img.shields.io/github/license/RubberPirate/WebCyphr">
  <a href="https://github.com/RubberPirate/WebCyphr/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/RubberPirate/WebCyphr"></a>
  <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/RubberPirate/WebCyphr">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/RubberPirate/WebCyphr">
</div>

# 🔒 Features of SecureMe Browser Extension
  
- 🛡️ Real-Time Threat Monitoring: Actively scans and blocks harmful or phishing websites while browsing.
- 🚫 Website Blacklisting: Prevents access to a predefined list of malicious and phishing URLs.
- 🔍 Secure Link Verifier: Allows manual input of URLs to check for potential threats using Google Safe Browsing API.
- 🔑 Strong Password Generator: Generates customizable strong passwords with options for length, uppercase, lowercase, numbers, and special characters.
- ⚡ Interactive Warning Pages: Displays an aesthetic, user-friendly, animated warning page when visiting blocked sites.
- 💡 User Bypass Instructions: Provides subtle guidance on how to disable real-time scanning, ensuring informed user decisions.
- 🎨 Mouse-Interactive Animated Background: Includes a visually engaging particle animation for warning pages, responsive to cursor movements.
- 🌐 Always-On Protection: Continuous monitoring and blocking enabled by default, ensuring safety across all sessions.
- 🛠️ Customizable Tools: Accessible tools for secure browsing directly from the extension popup menu.
- 🧩 Modern UI Design: Clean, dark-themed user interface for an intuitive user experience.


# Installation

1.Clone the repo to get a local copy of the files. git clone https://github.com/RubberPirate/pirate-ducky.git or Download the repo

2.Plug the device using a converter/cable into a USB port while holding the Boot button. It will show up as a removable media device named RPI-RP2.

3.Copy the .uf2 file from pirate-ducky/CircuitPython (cloned files)
pico.uf2 - Raspberry Pi Pico
pico-w.uf2 - Raspberry Pi Pico W

4.Paste it to the root of the Pico (RPI-RP2). The device will reboot and after a second or so, it will reconnect as CIRCUITPY.

# Usage

# Setup Mode

To edit the payload, enter setup mode by connecting the pin 1 (GP0) to pin 3 (GND), this will stop the pirate-ducky from injecting the payload in your own machine.
The easiest way to do so is by using a jumper wire between those pins as seen bellow.
