package main

import (
	"webapp-backend/api"
	"webapp-backend/database"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()
	db := database.Connect()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))
	api.User(app, db)
	api.Metric(app, db)

	app.Listen("0.0.0.0:8080")
}
