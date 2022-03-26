package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Login struct {
	User     string
	Password string
}

func signInHandler(c *gin.Context) {
	var json Login
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": json.User + " has logged in"})
	return
}

func signUpHandler(c *gin.Context) {

}
