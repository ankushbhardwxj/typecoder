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

type UserSignInData struct {
	Email    string
	Password string
}

func signUpHandler(c *gin.Context) {
	var json UserSignUpData
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var schemaObject User
	schemaObject.Email = json.Email
	schemaObject.Password = generateDigest(json.Email, json.Password)
	schemaObject.Username = json.UserName
	result := insertUserToDB(schemaObject)
	c.JSON(http.StatusOK, gin.H{
		"result": result,
	})
	return
}

func signInHandler(c *gin.Context) {
	var json UserSignInData
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	storedDigest := getUserInfo(json.Email, "Password")
	digest := generateDigest(json.Email, json.Password)
	if storedDigest != digest {
		c.JSON(http.StatusForbidden, gin.H{"error": "User cannot be authorized"})
	} else {
		c.JSON(http.StatusOK, gin.H{"message": "User sign in successful"})
	}
}

func getUserName(c *gin.Context) {
	var json UserSignInData
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	userName := getUserInfo(json.Email, "Username")
	c.JSON(http.StatusOK, gin.H{"UserName": userName})
}

func sendOTPHandler(c *gin.Context) {

}

func verifyOTPHandler(c *gin.Context) {

}

func generateDigest(email string, password string) string {
	h := sha256.New()
	h.Write([]byte(email + password))
	return hex.EncodeToString(h.Sum(nil))
}
