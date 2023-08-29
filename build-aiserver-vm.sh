export DEBIAN_FRONTEND=noninteractive
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt-get update
sudo apt-get install python3.10-venv python3.10-distutils -y
curl https://bootstrap.pypa.io/get-pip.py | python3.10
pip install --upgrade pip
python3.10 -m pip install --ignore-installed flask huggingface transformers torch gunicorn
sudo cp /vagrant/startup.sh /etc/init.d/startup.sh
sudo chmod +x /etc/init.d/startup.sh
/etc/init.d/startup.sh
