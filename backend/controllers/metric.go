package controllers

import (
	"strconv"
	"webapp-backend/models"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type MetricController struct {
	DB *gorm.DB
}

func (c MetricController) CreateMetric(ctx *fiber.Ctx) error {
	metric := new(models.Metric)

	if err := ctx.BodyParser(metric); err != nil {
		return ctx.Status(400).JSON(fiber.Map{"errors": [1]string{"Bad Request. Please check your request."}})
	}

	c.DB.Create(&metric)
	return ctx.JSON(fiber.Map{"message": "A metric has successfully created"})
}

func (c MetricController) GetMetrics(ctx *fiber.Ctx) error {
	var metrics []models.Metric
	c.DB.Find(&metrics)
	return ctx.JSON(fiber.Map{"metrics": metrics})
}

func (c MetricController) GetMetric(ctx *fiber.Ctx) error {
	id, err := strconv.ParseInt(ctx.Params("id"), 10, 64)

	if err != nil {
		return ctx.Status(422).JSON(fiber.Map{"errors": [1]string{"Bad Request. Please check your request."}})
	}

	var metric models.Metric
	metric.ID = uint(id)
	c.DB.First(&metric)

	return ctx.JSON(fiber.Map{"metric": metric})
}

func (c MetricController) UpdateMetric(ctx *fiber.Ctx) error {
	newMetric := new(models.Metric)

	if err := ctx.BodyParser(newMetric); err != nil {
		return ctx.Status(422).JSON(fiber.Map{"errors": [1]string{"Bad Request. Please check your request."}})
	}

	id, err := strconv.ParseInt(ctx.Params("id"), 10, 64)

	if err != nil {
		return ctx.Status(422).JSON(fiber.Map{"errors": [1]string{"Bad Request. Please check your request."}})
	}

	var metric models.Metric
	c.DB.First(&metric, id)
	c.DB.Model(&metric).Updates(map[string]interface{}{
		"user_id": newMetric.UserId,
		"data":    newMetric.Data,
	})

	return ctx.JSON(fiber.Map{"message": "A metric has updated successfully"})
}

func (c MetricController) DeleteMetric(ctx *fiber.Ctx) error {
	id, err := strconv.ParseInt(ctx.Params("id"), 10, 64)

	if err != nil {
		return ctx.Status(422).JSON(fiber.Map{"errors": [1]string{"Bad Request. Please check your request."}})
	}

	var metric models.Metric
	metric.ID = uint(id)
	c.DB.Delete(&metric)

	return ctx.JSON(fiber.Map{"message": "A metric has successfully removed"})
}
