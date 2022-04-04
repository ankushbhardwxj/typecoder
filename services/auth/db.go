package main

import (
	"context"
	"log"
	"time"

	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

/* Schema */
type User struct {
	Id       primitive.ObjectID `json:"_id,omitempty"`
	Username string             `json:"username,omitempty" validate:"required"`
	Email    string             `json:"email,omitempty" validate:"required"`
	Password string             `json:"password,omitempty" validate:"required"`
}

func connectDB() *mongo.Client {
	client, err := mongo.NewClient(options.Client().ApplyURI(getMongoURI()))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}
	return client
}

var DB *mongo.Client = connectDB()

func GetCollection(client *mongo.Client, collectionName string) *mongo.Collection {
	collection := client.Database("typecoder-typing-service").Collection(collectionName)
	return collection
}

var userCollection *mongo.Collection = GetCollection(DB, "users")
var validate = validator.New()

func insertUserToDB(schemaObject User) *mongo.InsertOneResult {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	result, err := userCollection.InsertOne(ctx, schemaObject)
	if err != nil {
		panic(err)
	}
	return result
}

func getUserInfo(email string, key string) string {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	var user User
	err := userCollection.FindOne(ctx, bson.M{"email": email}).Decode(&user)
	if err != nil {
		panic(err)
	}
	if key == "Username" {
		return user.Username
	}
	return user.Password
}

func checkUserInDB(userName string) bool {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	var user User
	err := userCollection.FindOne(ctx, bson.M{"username": userName}).Decode(&user)
	if err != nil {
		return false
	}
	return true
}

func checkEmailInDB(email string) bool {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	var user User
	err := userCollection.FindOne(ctx, bson.M{"email": email}).Decode(&user)
	if err != nil {
		return false
	}
	return true
}
