package controllers

import (
	"strconv"
	"webapp-backend/models"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type UserController struct {
	DB *gorm.DB
}

func (c UserController) CreateUser(ctx *fiber.Ctx) error {
	user := new(models.User)

	if err := ctx.BodyParser(user); err != nil {
		return ctx.Status(400).JSON(fiber.Map{"errors": [1]string{"Bad Request. Please check your request."}})
	}

	c.DB.Create(&user)
	return ctx.JSON(fiber.Map{"message": "A user has successfully created"})
}

func (c UserController) GetUsers(ctx *fiber.Ctx) error {
	var users []models.User
	c.DB.Find(&users)
	return ctx.JSON(fiber.Map{"users": users})
}

func (c UserController) GetUser(ctx *fiber.Ctx) error {
	id, err := strconv.ParseInt(ctx.Params("id"), 10, 64)

	if err != nil {
		return ctx.Status(422).JSON(fiber.Map{"errors": [1]string{"Bad Request. Please check your request."}})
	}

	var user models.User
	user.ID = uint(id)
	c.DB.First(&user)

	return ctx.JSON(fiber.Map{"user": user})
}

func (c UserController) UpdateUser(ctx *fiber.Ctx) error {
	newUser := new(models.User)

	if err := ctx.BodyParser(newUser); err != nil {
		return ctx.Status(422).JSON(fiber.Map{"errors": [1]string{"Bad Request. Please check your request."}})
	}

	id, err := strconv.ParseInt(ctx.Params("id"), 10, 64)

	if err != nil {
		return ctx.Status(422).JSON(fiber.Map{"errors": [1]string{"Bad Request. Please check your request."}})
	}

	var user models.User
	c.DB.First(&user, id)
	c.DB.Model(&user).Updates(map[string]interface{}{
		"username":   newUser.Username,
		"first_name": newUser.FirstName,
		"last_name":  newUser.LastName,
	})

	return ctx.JSON(fiber.Map{"message": "A user has updated successfully"})
}

func (c UserController) DeleteUser(ctx *fiber.Ctx) error {
	id, err := strconv.ParseInt(ctx.Params("id"), 10, 64)

	if err != nil {
		return ctx.Status(422).JSON(fiber.Map{"errors": [1]string{"Bad Request. Please check your request."}})
	}

	var user models.User
	user.ID = uint(id)
	c.DB.Delete(&user)

	return ctx.JSON(fiber.Map{"message": "A user has successfully removed"})
}
