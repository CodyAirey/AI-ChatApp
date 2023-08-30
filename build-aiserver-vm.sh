export DEBIAN_FRONTEND=noninteractive
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt-get update
sudo apt-get install vnstat
vnstat > vnstat.log
sudo apt-get install python3.10-venv python3.10-distutils -y
curl https://bootstrap.pypa.io/get-pip.py | python3.10
pip install --upgrade pip
python3.10 -m pip install --ignore-installed flask huggingface transformers torch pymysql
sudo cp /vagrant/server_chat.py /home/vagrant/
sudo cp /vagrant/aiserver.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl start aiserver
sudo systemctl enable aiserver
sudo systemctl status aiserver
