curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.nvm/nvm.sh
nvm install --lts
#cp -f /vagrant/profile ~/.profile


apt-get update
# Install Apache and PHP
apt-get install -y apache2

cp /vagrant/chat-app.conf /etc/apache2/sites-available/
a2enmod proxy
a2ensite chat-app
a2dissite 000-default
service apache2 restart

cp -rf /vagrant/nodejs-server ~
cd ~/nodejs-server/
npm install mysql2 express body-parser
node chatapp.js &