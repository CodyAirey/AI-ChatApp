export DEBIAN_FRONTEND=noninteractive
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt-get update
sudo apt-get install python3.10-venv python3.10-distutils -y
curl https://bootstrap.pypa.io/get-pip.py | python3.10
pip install --upgrade pip
python3.10 -m pip install --ignore-installed flask huggingface transformers torch
sudo cp /vagrant/startup.sh /etc/init.d/startup.sh
sudo chmod +x /etc/init.d/startup.sh
sudo update-rc.d startup.sh defaults
sudo /etc/init.d/startup.sh start

# sudo apt-get install gcc -y
# sudo apt-get install make -y
# sudo apt-get install libssl-dev openssl -y
# sudo apt-get install libffi-dev -y
# sudo apt install zlib1g zlib1g-dev -y
# sudo apt-get install -y tmux
# wget https://www.python.org/ftp/python/3.10.0/Python-3.10.0.tgz
# tar xzvf Python-3.10.0.tgz
# cd Python-3.10.0
# ./configure
# make
# sudo make install
# cd ..
# sudo rm -rf Python-3.10.0
# rm Python-3.10.0.tgz 