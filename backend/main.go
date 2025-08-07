package main

import "github.com/gin-gonic/gin"

type Request struct {
	Name string `json:"name"`
}

func main() {
	router := gin.Default()
	router.POST("/hello", func(c *gin.Context) {
		var request Request
		if err := c.ShouldBindBodyWithJSON(&request); err != nil {
			c.JSON(400, gin.H{"error": "Invalid request body"})
			return
		}
		c.JSON(200, gin.H{
			"message": "Hello, " + request.Name,
		})
	})
	router.Run(":8080")
}
