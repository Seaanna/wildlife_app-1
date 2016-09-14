class Animal < ActiveRecord::Base
  has_many :sightings
  
  validates :common_name, :latin_name, :kingdom, presence: true
  validates :common_name, :latin_name, uniqueness: true
end
