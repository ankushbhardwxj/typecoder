package main

import (
	"crypto/sha256"
	"encoding/hex"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserSignUpData struct {
	UserName string
	Email    string
	Password string
}

func signUpHandler(c *gin.Context) {
	var json UserSignUpData
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db := connectAndCreateSchema()
	var schemaObject User
	schemaObject.Email = json.Email
	schemaObject.Password = generateDigest(json.Email, json.Password)
	schemaObject.Username = json.UserName
	err := insertSignUpInfo(db, schemaObject)
	if err != nil {
		panic(err)
	}
	c.JSON(http.StatusOK, gin.H{
		"email":    json.Email,
		"username": json.UserName,
		"password": json.Password,
	})
	return
}

func signInHandler(c *gin.Context) {

}

func generateDigest(email string, password string) string {
	h := sha256.New()
	h.Write([]byte(email + password))
	return hex.EncodeToString(h.Sum(nil))
}
