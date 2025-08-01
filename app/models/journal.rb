
class Journal < ApplicationRecord
  belongs_to :user
  has_many :tags, dependent: :destroy

  validates :title, presence: true
  validates :content, presence: true
end
