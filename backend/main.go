package main

import (
	"webapp-backend/api"
	"webapp-backend/database"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()
	db := database.Connect()

	api.User(app, db)
	api.Metric(app, db)

	app.Listen(":3000")
}
