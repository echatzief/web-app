package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username  string `json:"username"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
}

type Metric struct {
	gorm.Model
	UserId uint   `json:"userId"`
	Data   string `json:"data"`
}
