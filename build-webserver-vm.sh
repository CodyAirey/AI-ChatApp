apt-get update
apt-get install -y apache2

cp /vagrant/chat-app.conf /etc/apache2/sites-available/

a2ensite chat-app

a2dissite 000-default

service apache2 restart