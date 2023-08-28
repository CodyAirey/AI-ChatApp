apt-get update

# Install Apache and PHP
apt-get install -y apache2

# Install NVM and Node.js
sh /vagrant/installnvm.sh
source /vagrant/.loadbashrc
nvm install node
nvm use node
npm install mysql2 express


cd /vagrant/www
node chatapp.js &

cp /vagrant/chat-app.conf /etc/apache2/sites-available/
a2enmod proxy
a2ensite chat-app
a2dissite 000-default
service apache2 restart