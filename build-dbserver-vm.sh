apt-get update

export MYSQL_PWD='insecure_mysqlroot_pw'

echo "mysql-server mysql-server/root_password password $MYSQL_PWD" | debconf-set-selections 
echo "mysql-server mysql-server/root_password_again password $MYSQL_PWD" | debconf-set-selections

apt-get -y install mysql-server

service mysql start

echo "CREATE DATABASE fvision;" | mysql

# Then create a database user "webuser" with the given password.
echo "CREATE USER 'webuser'@'%' IDENTIFIED BY 'insecure_db_pw';" | mysql

# Grant all permissions to the database user "webuser" regarding
# the "fvision" database that we just created, above.
echo "GRANT ALL PRIVILEGES ON fvision.* TO 'webuser'@'%'" | mysql

# Set the MYSQL_PWD shell variable that the mysql command will
# try to use as the database password ...
export MYSQL_PWD='insecure_db_pw'

cat /vagrant/setup-database.sql | mysql -u webuser fvision

sed -i'' -e '/bind-address/s/127.0.0.1/0.0.0.0/' /etc/mysql/mysql.conf.d/mysqld.cnf

service mysql restart
