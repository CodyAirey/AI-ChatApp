export DEBIAN_FRONTEND=noninteractive
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt-get update
sudo apt-get install python3.10-venv python3.10-distutils -y
curl https://bootstrap.pypa.io/get-pip.py | python3.10
pip install --upgrade pip
python3.10 -m pip install --ignore-installed flask huggingface transformers torch cffi pymysql
sudo cp /vagrant/server_chat.py /home/vagrant/
sudo cp /vagrant/aiflask.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl start aiflask
sudo systemctl enable aiflask
sudo systemctl status aiflask
