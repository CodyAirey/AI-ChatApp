curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.nvm/nvm.sh
nvm install --lts
cd /vagrant
cp -r nodejs-server /home/vagrant
cd /home/vagrant/nodejs-server/
npm install mysql2 express body-parser axios
sudo cp /vagrant/nodejs-server/node_chat_server.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl start node_chat_server
sudo systemctl enable node_chat_server
sudo systemctl status node_chat_server