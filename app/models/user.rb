class User < ApplicationRecord
  has_secure_password
  has_many :journals, dependent: :destroy
  validates :email, presence: true, uniqueness: true
  validates :username, presence: true
  validates :password, presence: true, length: { minimum: 8 }
end
