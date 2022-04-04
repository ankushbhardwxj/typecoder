package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func getMongoURI() string {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	return os.Getenv("MONGOURI")
}
