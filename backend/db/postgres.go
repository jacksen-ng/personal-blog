package db

import (
	"context"
	"log"
	"os"
	"sync"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

var (
	pool *pgxpool.Pool
	once sync.Once
)

func Connect() *pgxpool.Pool {
	once.Do(func() {
		godotenv.Load("../.env")

		dbUrl := os.Getenv("DATABASE_URL")
		log.Printf("DATABASE_URL: %s", dbUrl)
		if dbUrl == "" {
			log.Fatal("DATABASE_URL is not set")
		}

		var err error
		pool, err = pgxpool.New(context.Background(), dbUrl)
		if err != nil {
			log.Fatal("Error creating pool: ", err)
		}
		log.Println("Connected to database")
	})
	return pool
}

func GetPool() *pgxpool.Pool {
	if pool == nil {
		Connect()
	}
	return pool
}

func Close() {
	if pool != nil {
		pool.Close()
	}
}
