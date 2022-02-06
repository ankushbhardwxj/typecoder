package main

import (
	//"github.com/gin-gonic/gin"
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v4"
)

func main() {
	url := "postgres://localhost:5432"
	conn, err := pgx.Connect(context.Background(), url)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close(context.Background())
}
