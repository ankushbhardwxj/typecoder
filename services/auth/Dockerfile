FROM golang:alpine

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download && go mod verify

RUN apk update && apk add postgresql

COPY . .
RUN go build 

CMD go run .
