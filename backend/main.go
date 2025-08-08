package main

import (
	"context"
	"time"

	"github.com/jacksen-ng/personal-blog/backend/db"

	"github.com/gin-gonic/gin"
)

func main() {
	pool := db.Connect()
	defer db.Close()

	router := gin.Default()

	router.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	api := router.Group("/api")
	{
		api.GET("/health", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"message": "Hello, World",
			})
		})
		api.GET("/db", func(c *gin.Context) {
			var currentTime time.Time
			err := pool.QueryRow(context.Background(), "SELECT NOW()").Scan(&currentTime)
			if err != nil {
				c.JSON(500, gin.H{"error": err.Error()})
				return
			}
			c.JSON(200, gin.H{
				"message":      "Database connected successfully",
				"current_time": currentTime.Format("2006-01-02 15:04:05"),
			})
		})
	}
	router.Run(":8080")
}
