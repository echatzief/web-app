package api

import (
	"webapp-backend/controllers"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func User(app *fiber.App, db *gorm.DB) {
	c := &controllers.UserController{
		DB: db,
	}
	r := app.Group("/users")
	r.Post("/", c.CreateUser)
	r.Get("/", c.GetUsers)
	r.Get("/:id", c.GetUser)
	r.Put("/:id", c.UpdateUser)
	r.Delete("/:id", c.DeleteUser)
}
