Vagrant.configure("2") do |config|
	# Use an Ubuntu box for the VM
	config.vm.box = "ubuntu/focal64"
	config.vm.boot_timeout = 600
  
	# Configure provider settings for VirtualBox
	config.vm.provider "virtualbox" do |v|
	  v.memory = 8000
	  v.cpus = 2
	end
  
	# Define VM for the AI server
	config.vm.define "aiserver" do |aiserver|
	  aiserver.vm.hostname = "aiserver"
  
	  # Private network settings for AI server
	  aiserver.vm.network "private_network", ip: "192.168.56.13"
	  aiserver.vm.synced_folder ".", "/vagrant", owner: "vagrant", group: "vagrant", mount_options: ["dmode=775,fmode=777"]
  
	  # Provisioning for AI server
	  aiserver.vm.provision "shell", path: "build-aiserver-vm.sh"
	end
  
	# Define VM for the database server
	config.vm.define "dbserver" do |dbserver|
	  dbserver.vm.hostname = "dbserver"
  
	  # Private network settings for database server
	  dbserver.vm.network "private_network", ip: "192.168.56.12"
	  dbserver.vm.synced_folder ".", "/vagrant", owner: "vagrant", group: "vagrant", mount_options: ["dmode=775,fmode=777"]
  
	  # Provisioning for database server
	  dbserver.vm.provision "shell", path: "build-dbserver-vm.sh"
	end
  
	# Define VM for the web server
	config.vm.define "webserver" do |webserver|
	  webserver.vm.hostname = "webserver"
  
	  # Port forwarding for web server
	  webserver.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1"
  
	  # Private network settings for web server
	  webserver.vm.network "private_network", ip: "192.168.56.11"
  
	  # Synced folder setup (CS Labs specific)
	  webserver.vm.synced_folder ".", "/vagrant", owner: "vagrant", group: "vagrant", mount_options: ["dmode=777,fmode=777"]
  
	  # Provisioning for web server
	  webserver.vm.provision "build-webserver-vm", type: "shell", privileged: false do |s|
		s.path = "./build-webserver-vm.sh"
	  end
	end
  
	# Additional VirtualBox configuration
	config.vm.provider :virtualbox do |v|
	  v.customize ["modifyvm", :id, "--uart1", "0x3F8", "4"]
	  v.customize ["modifyvm", :id, "--uartmode1", "file", File::NULL]
	  v.customize ["modifyvm", :id, "--cableconnected1", "on"]
	end
  end
  