package main

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
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
	db := connectAndCreateSchema()
	var schemaObject User
	schemaObject.Email = json.Email
	schemaObject.Password = generateDigest(json.Email, json.Password)
	schemaObject.Username = json.UserName
	insertSignUpInfo(db, schemaObject)
	c.JSON(http.StatusOK, gin.H{
		"email":    json.Email,
		"username": json.UserName,
		"password": json.Password,
	})
	return
}

func signInHandler(c *gin.Context) {
	var json UserSignInData
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db := connectAndCreateSchema()
	storedDigest := getUserInfo(db, json.Email, "password")
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
	db := connectAndCreateSchema()
	userName := getUserInfo(db, json.Email, "username")
	fmt.Print(userName)
	c.JSON(http.StatusOK, gin.H{"userName": userName})
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
