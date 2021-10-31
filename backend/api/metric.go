package api

import (
	"webapp-backend/controllers"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func Metric(app *fiber.App, db *gorm.DB) {
	c := &controllers.MetricController{
		DB: db,
	}
	r := app.Group("/metrics")
	r.Post("/", c.CreateMetric)
	r.Get("/", c.GetMetrics)
	r.Get("/:id", c.GetMetric)
	r.Put("/:id", c.UpdateMetric)
	r.Delete("/:id", c.DeleteMetric)
}
