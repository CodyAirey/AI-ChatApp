curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.nvm/nvm.sh
nvm install --lts
cd /vagrant
cp -r nodejs-server /home/vagrant
cd /home/vagrant/nodejs-server/
ls
npm install mysql2 express body-parser axios
npm install -g pm2
pm2 start server.js
pm2 save
# pm2 logs server
