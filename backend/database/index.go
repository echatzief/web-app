package database

import (
	"fmt"
	"log"
	"os"

	"webapp-backend/models"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func Connect() *gorm.DB {

	// Try to load the .env file
	err := godotenv.Load("../.env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Setup the database details
	dbName := os.Getenv("DB_NAME")
	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASS")
	dbHost := os.Getenv("DB_HOST")

	// Connect to the database
	conn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local", dbUser, dbPass, dbHost, "3306", dbName)
	db, err := gorm.Open(mysql.Open(conn), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	// Create the database schema if the migration option is enabled
	if os.Getenv("DB_MIGRATE") == "true" {
		Migrate(db)
	}

	return db
}

func Migrate(db *gorm.DB) {
	db.Migrator().CreateTable(&models.User{})
	db.Migrator().CreateTable(&models.Metric{})
}
