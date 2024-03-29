FROM python:3.8-slim

#RUN apt update && apt install -y python3 python3-pip && apt clean

COPY . ./app
WORKDIR ./app

RUN pip3 install -r requirements.txt

EXPOSE 8000

ENTRYPOINT uvicorn main:app --host 0.0.0.0