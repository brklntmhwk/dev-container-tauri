# https://github.com/microsoft/vscode-dev-containers/blob/v0.245.2/containers/rust-postgres/.devcontainer/Dockerfile
# https://hub.docker.com/_/microsoft-devcontainers-rust

# [Choice] Debian OS version (use bullseye on local arm64/Apple Silicon): buster, bullseye
# Used to be mcr.microsoft.com/vscode/devcontainers/rust:1-${VARIANT} (* removed /vscode)
ARG VARIANT="bullseye"
FROM mcr.microsoft.com/devcontainers/rust:1-${VARIANT}

ARG USERNAME=vscode
ARG USER_ID=1000
ARG USER_GID=$USER_ID

# Add a non-root user "vscode" if it doesn't exist
RUN [ $(getent group $USERNAME) ] || groupadd -g $USER_GID $USERNAME \
# RUN groupadd -g $USER_GID $USERNAME || echo "Group already exists" \
    && useradd -s /bin/bash -u $USER_ID -g $USER_GID -m $USERNAME || echo "User already exists." \
    && apt-get update \
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Install Node.js (Must-have to use Vite and corepack)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - &&\
    apt-get install -y nodejs


# Include lld linker to improve build times either by using environment variable
# RUSTFLAGS="-C link-arg=-fuse-ld=lld" or with Cargo's configuration file (i.e see .cargo/config.toml).
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    clang \
    lld \
    libwebkit2gtk-4.0-dev \
    build-essential \
    curl \
    wget \
    make \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev \
    && apt-get autoremove -y && apt-get clean -y

# Install Yarn (Must-have to manage frontend packages)
# Only are yarn and pnpm managed by corepack by default.
# To take npm under control of it, explicitly added "npm" below and designated a specific yarn version as "packageManager" in package.json.
# Ref: https://nodejs.org/api/corepack.html
RUN corepack enable npm yarn

# Install tauri-cli (Must-have to do cargo tauri dev, etc..)
# It took you ages... and yarn create tauri-app automatically installs @tauri-app/cli that could be used instead of tauri-cli so you don't have to install tauri-cli here.
# RUN cargo install tauri-cli

USER $USERNAME
