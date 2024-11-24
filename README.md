# WebCyphr

WebCyphr-a web extension that safeguards your browsing by detecting potential threats and phishing websites while offering a unique password generator for enhanced security.

<p align="center">
  <img src="/ascii.png", width="600", height="400", title="webCyphr"/>
</p>

<p align="center"> 
![Logo](images/finall icon bg.png) A Hackable, Fully Featured, Rice Friendly Neovim Configuration ![Logo](images/finall icon bg.png)</p>

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

# Features

- 🎨 Colorscheme generated with [pywal](https://github.com/dylanaraps/pywal)
- 💭 Intellisense, Completion, and Linting with [coc.nvim](https://github.com/neoclide/coc.nvim)
- 🏷️ Tag management with [vista.vim](https://github.com/liuchengxu/vista.vim)
- 🔀 Git integration with [vim-fugitive](https://github.com/tpope/vim-fugitive), [vim-gitgutter](https://github.com/airblade/vim-gitgutter) and [lazygit](https://github.com/jesseduffield/lazygit)
- ✈️ Informative statusline and tabline with [vim-airline](https://github.com/vim-airline/vim-airline)
- ✂️ Code snippets powered by [UltiSnips](https://github.com/sirver/UltiSnips)
- 💡 Intelligent suggestions with [vim-tabnine](https://github.com/zxqfl/tabnine-vim)
- 📁 Simple file browsing with [NERDTree](https://github.com/scrooloose/nerdtree)
- 📜 Dynamic homepage with [vim-startify](https://github.com/mhinz/vim-startify)
- 🔎 Distraction free writing with [Goyo](https://github.com/junegunn/goyo.vim)
- 🔧 Easily configfurable to suit your needs
- ⌨️ Common sense keybinds, so you can get right to work
- 🧰 Assorted editing enhancements with

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
