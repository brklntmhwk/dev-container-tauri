# Dev Container for Tauri

This is a playground for Tauri app development. You can leverage the hot loading feature of Tauri dev display inside the Docker container.

## Prerequisites

- You have installed:

  - Docker Desktop
  - VSCode

on your local machine.

- You have added the following VSCode extensions:
  - Dev Containers
  - Docker

## How to use

1. Run your Docker Desktop
2. Create the docker image and run the container

- Select the menu "Dev Containers: Reopen in Container". (on Windows, press Ctrl + Shift + p or F1 to open the dropdown menu)
- You could also select "Reopen in Container" in a pop-up toaster that appears at the bottom right on VSCode when opening
  - ![Dev Containers pop-up toaster](screenshots/dev-container-toaster.jpg)

3. Create your Tauri app template

- Execute the command:

```
yarn create tauri-app
```

- Follow the prompts and choose your preferences
  - In this example, chose the followings:
    - Project name: tauri-react-app
    - Choose which language to use for your frontend: TypeScript / JavaScript
    - Choose your package manager: yarn
    - Choose your UI template: React
    - Choose your UI flavor: TypeScript

4. Move to the project directory

```
cd ${--Project name here--}
```

5. Add dependencies in package.json to the project

```
yarn
```

6. Open a dev browser

- Execute the command:

```
yarn tauri dev
```

- Open localhost:6080 (the port number is defined in devcontainer.json)
  - http://localhost:6080/
- Connect to noVNC with the password set in devcontainer.json
  - ![noVNC Connect](screenshots/novnc.png)
- Now all done!
  - ![noVNC after connection](screenshots/novnc-dev.jpg)
