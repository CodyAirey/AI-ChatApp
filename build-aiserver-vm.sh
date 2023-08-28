export DEBIAN_FRONTEND=noninteractive
sudo apt-get update
sudo apt-get install gcc -y
sudo apt-get install make -y
sudo apt-get install libssl-dev openssl -y
sudo apt-get install libffi-dev -y
sudo apt install zlib1g zlib1g-dev -y
wget https://www.python.org/ftp/python/3.10.0/Python-3.10.0.tgz
tar xzvf Python-3.10.0.tgz
cd Python-3.10.0
./configure
make
sudo make install
cd ..
sudo rm -rf Python-3.10.0
rm Python-3.10.0.tgz 
export PATH="$HOME/vagrant/.local/bin:$PATH"
/usr/local/bin/python3 -m pip install --upgrade pip
python3 -m pip install torch --no-cache-dir --no-warn-script-location
python3 -m pip install huggingface transformers flask gunicorn  --no-warn-script-location
cd /vagrant
python3 server_chat.py&