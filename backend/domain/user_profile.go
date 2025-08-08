package domain

import "time"

type UserProfile struct {
	UserProfileID int64     `json:"user_profile_id"`
	FirebaseUID   string    `json:"firebase_uid"`
	Role          string    `json:"role"`
	Email         string    `json:"email"`
	DisplayName   string    `json:"display_name"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}
