curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.nvm/nvm.sh
nvm install --lts
cd /vagrant
cp -r nodejs-server ~
cd ~/nodejs-server/
ls
npm install mysql2 express body-parser axios
nohup node server.js &