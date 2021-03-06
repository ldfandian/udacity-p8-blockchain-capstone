FROM node:10.15.3

# Configure to reduce warnings and limitations as instruction from official VSCode Remote-Containers.
# See https://code.visualstudio.com/docs/remote/containers-advanced#_reducing-dockerfile-build-warnings.
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
    && apt-get -y install --no-install-recommends apt-utils

# Verify git, process tools, lsb-release (common in install instructions for CLIs) installed.
RUN apt-get -y install git iproute2 procps lsb-release vim build-essential python3

# set python3 as the default python
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3 1

# install dependency for bitcoin dev env
RUN npm install -g node-gyp
RUN npm install -g ganache-cli
RUN npm install -g secp256k1
RUN npm install -g --unsafe-perm truffle@5.1.43

# Clean up
RUN apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Revert workaround at top layer.
ENV DEBIAN_FRONTEND=dialog

# Expose service ports.
EXPOSE 8000
EXPOSE 8545
