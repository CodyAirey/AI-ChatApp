Vagrant.configure("2") do |config|
  # (We have used this box previously, so reusing it here should save a
  # bit of time by using a cached copy.)
  config.vm.box = "ubuntu/focal64"

	config.vm.define "aiserver" do |aiserver|
		aiserver.vm.hostname = "aiserver"
		
		aiserver.vm.network "private_network", ip: "192.168.56.13"
		aiserver.vm.synced_folder ".", "/vagrant", owner: "vagrant", group: "vagrant", mount_options: ["dmode=775,fmode=777"]
		config.vm.provider "virtualbox" do |v|
			v.memory = 5500
			v.cpus = 2
		end
		aiserver.vm.provision "shell", path: "build-aiserver-vm.sh"
	end
	# Here is the section for defining the database server, which I have
	# named "dbserver".
	config.vm.define "dbserver" do |dbserver|
		dbserver.vm.hostname = "dbserver"
# 		# Note that the IP address is different from that of the webserver
# 		# above: it is important that no two VMs attempt to use the same
# 		# IP address on the private_network.
		dbserver.vm.network "private_network", ip: "192.168.56.12"
		dbserver.vm.synced_folder ".", "/vagrant", owner: "vagrant", group: "vagrant", mount_options: ["dmode=775,fmode=777"]
		
		dbserver.vm.provision "shell", path: "build-dbserver-vm.sh"
	end


	config.vm.define "webserver" do |webserver|
		# These are options specific to the webserver VM
		webserver.vm.hostname = "webserver"
		
		# This type of port forwarding has been discussed elsewhere in
		# labs, but recall that it means that our host computer can
		# connect to IP address 127.0.0.1 port 8080, and that network
		# request will reach our webserver VM's port 80.
		webserver.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1"
		
		# We set up a private network that our VMs will use to communicate
		# with each other. Note that I have manually specified an IP
		# address for our webserver VM to have on this internal network,
		# too. There are restrictions on what IP addresses will work, but
		# a form such as 192.168.2.x for x being 11, 12 and 13 (three VMs)
		# is likely to work.
		webserver.vm.network "private_network", ip: "192.168.56.11"

		# This following line is only necessary in the CS Labs... but that
		# may well be where markers mark your assignment.
		webserver.vm.synced_folder ".", "/vagrant", owner: "vagrant", group: "vagrant", mount_options: ["dmode=777,fmode=777"]
		
		webserver.vm.provision "build-webserver-vm", type: "shell", privileged: true do |s|
			s.path = "./build-webserver-vm.sh"
		end		
	end
end