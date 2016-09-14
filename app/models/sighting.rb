class Sighting < ActiveRecord::Base
  belongs_to :animal
  validates :animal, presence: true
end
