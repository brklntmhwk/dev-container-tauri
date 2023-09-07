# Tauri example app

This is an example app of Tauri. Starting from ```create tauri-app```, some Tauri features have been topped. You can refer to the features section below.

The tech stack is selected based on my preference.
**React + Tailwind CSS + TypeScript**

## Features

The above-mentioned features are the followings:

### Database

tauri-plugin-sql
tauri-plugin-store

### Window state restoration

tauri-plugin-window-state

## How it works

### tauri.conf.json
- When a new feature added to allowlist, it'll automatically be done so to Cargo.toml too
  - e.g. If you add ``` "dialog": { "all": true }```, then it'll be reflected in Cargo.toml as ```dialog-all```
  - It's not until this step that you can use that feature
  - https://tauri.app/v1/references/configuration-files/
