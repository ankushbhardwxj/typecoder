package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

/*

Routes:
/api/v1/signIn : verify user name, password and sign in
/api/v1/signUp : signs up an user
/api/v1/sendOtp : send an otp to email
/api/v1/verifyOtp : verify the otp to email
/api/v1/googleOAuth : authentication using gmail

*/

func main() {
	r := gin.Default()
	r.Use(gin.Logger())
	r.Use(cors.Default())
	v1 := r.Group("/api/v1")
	{
		v1.POST("/signin", signInHandler)
		v1.POST("/signup", signUpHandler)
		v1.POST("/getUsername", getUserName)
		//v1.POST("/checkUsernameTaken", checkUsernameTaken)
		// v1.GET("/googleOAuth", hello)
		// v1.GET("/googleOAuth/redirect", hello)
	}
	r.Run(":8001")
}
