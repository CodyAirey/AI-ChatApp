curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.nvm/nvm.sh
nvm install --lts

cp -r /vagrant/nodejs-server ~
cd ~/nodejs-server/
npm install mysql2 express body-parser axios
node chatapp.js &