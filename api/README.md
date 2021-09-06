# mpowerpy_controller
FastAPI service to control and view information about Ubiquiti MFi MPower switches in Python

## Project Background
I had some outdated IoT devices from Ubiquiti (the MPower Mini smart plug and MPower Pro 8 power strip). Because they've abandoned from a support and software perspective by Ubiquiti, I decided to throw together a quick Python based API to interact with the devices and pull information from them.

This project has the capability of connecting to the devices via telnet, but this method is not currently in use.  Instead, it connects via the device's web interface.

## Dependencies
This project was build using Python 3.9.
All other dependencies can be found in the /requirements.txt file.
## Hosting
Theoretically, this device can be hosted on any OS (it is Python, after all), but I have only tested it on Windows and Debian variants of Linux (Ubuntu, Mint).

### Simple Local Hosting
Hosting can be as simple as opening a command or bash prompt, navigating to the project's base directory and typing `python .\main.py`.  The default setting is to run on port 8000 and allow connections from any network (0.0.0.0).

### Hosting in Docker
This project includes a simple docker script that will allow containerization.  The docker image can be built from the command line.
```sh
docker build -t mpowerpy .
```

The image can then be run as a container by using standard docker commands (including things like port assignment).
```sh
docker run mpowerpy
```


### Usage
FastAPI generates a Swagger file, which can be located by navigating your browser to the hosted location's /docs path (e.g. http://localhost:8000/docs).
