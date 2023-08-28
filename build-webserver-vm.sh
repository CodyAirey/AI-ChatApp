curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.nvm/nvm.sh
nvm install --lts
ls -lash ~
ls -lash /vagrant
cp -r /vagrant/nodejs-server ~
ls ~
cd ~/nodejs-server/
npm install mysql2 express body-parser axios
node server.js &