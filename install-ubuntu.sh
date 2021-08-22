#!/bin/bash

CYAN='\033[96m'
NC='\033[0m'
EXEC_NAME='/usr/sbin/mpowerpy-api.sh'
SVC_NAME='/etc/systemd/system/mpowerpy-api.service'
config_path='/etc/mpowerpy/'
config_file_name='config.json'
database_file_name='devices.json'
http_port="8000"

echo -e "${CYAN}******** MPower API Integration Installer"

read -p "Enter a path for the config file [${config_path}]: " usr_config_path

if [ ! -z "$usr_config_path" ]
then
        config_path=$usr_config_path
fi

read -p "Enter the HTTP port for the API [${http_port}]: " usr_http_port

if [ ! -z "$usr_http_port" ]; then
        http_port=$usr_http_port
fi

if [ ! -d $config_path ]; then
        echo "Creating configuration path (${config_path})"
        mkdir $config_path
fi

echo -e "${CYAN}Stopping any existing containers"
service mpowerpy-api stop > /dev/null
docker stop mpowerpy-api > /dev/null

########### Docker file
echo "Installing MPowerPy API"
echo "Building Docker Image (this may take a few minutes...)"
docker build -t mpowerpy-api . > /dev/null
echo "Creating executable for the API"

############ Executable
echo -e "Creating Executable"

if [ -f $SVC_NAME ]; then
        echo "Attempting to remove pre-existing executable"
        rm $EXEC_NAME
fi

echo "Generating new executable"
touch $EXEC_NAME
echo "#!/bin/bash" >> $EXEC_NAME
echo "" >> $EXEC_NAME
echo "sudo docker run -p ${http_port}:8000 -v ${config_path}:/etc/mpowerpy --rm --name mpowerpy-api mpowerpy-api" >> $EXEC_NAME
echo "" >> $EXEC_NAME
chmod 755 $EXEC_NAME

############ Service
echo "Creating Service"

if [ -f $SVC_NAME ]; then
        echo "Attempting to remove pre-existing service"
        rm $SVC_NAME
fi

echo "Generating new service"
touch $SVC_NAME
echo "[Unit]" >> $SVC_NAME
echo "Description=MPowerPy API" >> $SVC_NAME
echo "After=network.target" >> $SVC_NAME
echo "" >> $SVC_NAME
echo "[Service]" >> $SVC_NAME
echo "Type=simple" >> $SVC_NAME
echo "User=tim" >> $SVC_NAME
echo "ExecStart=/bin/bash ${EXEC_NAME}" >> $SVC_NAME
echo "TimoutStartSec=0" >> $SVC_NAME
echo "" >> $SVC_NAME
echo "[Install]" >> $SVC_NAME
echo "WantedBy=default.target" >> $SVC_NAME
echo "" >> $SVC_NAME

echo "Enabling automatic service start on reboot"
systemctl daemon-reload
systemctl enable mpowerpy-api

echo "Starting the service"
service mpowerpy-api start

echo -e "Installation is complete.${NC}"
