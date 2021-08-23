FROM python:3.8-slim-buster

COPY . ./app
WORKDIR ./app

RUN pip3 install -r requirements.txt

EXPOSE 8000

ENTRYPOINT uvicorn main:app --host 0.0.0.0