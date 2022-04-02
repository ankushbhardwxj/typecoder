package main

import (
	"fmt"

	"github.com/go-pg/pg/v10"
	"github.com/go-pg/pg/v10/orm"
)

/* Schema */
type User struct {
	Id       int64  `pg:"id,pk"`
	Username string `pg:",unique,notnull"`
	Email    string `pg:",notnull"`
	Password string `pg:",notnull"`
}

func connectAndCreateSchema() *pg.DB {
	db := pg.Connect(&pg.Options{User: "ankush", Database: "typecoder", Password: "iamnotankush"})
	//defer db.Close()
	// check if table is already present
	models := []interface{}{(*User)(nil)}
	for _, model := range models {
		err := db.Model(model).CreateTable(&orm.CreateTableOptions{IfNotExists: true})
		if err != nil {
			panic(err)
		}
	}
	return db
}

func insertSignUpInfo(db *pg.DB, user User) {
	_, err := db.Model(&user).Insert()
	if err != nil {
		panic(err)
	}
}

func getUserInfo(db *pg.DB, email string, column string) string {
	var user User
	fmt.Println(column)
	err := db.Model(&user).Column(column).Where("email = ?", email).Select()
	fmt.Print(user)
	if err != nil {
		panic(err)
	}
	if column == "username" {
		return user.Username
	}
	return user.Password
}
