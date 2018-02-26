# InstaFlash
---
## Linux/GNU Ubuntu 16.04.3 LTS (Xenial Xerus) amd64 (64-bit|x64)
---
### Install NodeJS & Yarnpkg
```
# Install curl & build-essential
sudo apt-get curl=7.47* &&\
sudo apt-get install -y build-essential &&\
# Install NodeJS
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash - &&\
sudo apt-get install -y nodejs &&\
# Install Yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - &&\
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list &&\
sudo apt-get update && sudo apt-get install yarn &&\
```
---
### Configure GIT
```
cp ./.gitconfig $HOME/
```
---
### Install NPM packages
```
yarn install
```
---
### Start development
```
yarn start
```
---
### Build
```
yarn run build
```
---
### Testing
```
yarn test
```
##### Testing in Karma
```
yarn run karma start
```
---
### TypeScript lint
```
yarn run tslint -p ./src
```
