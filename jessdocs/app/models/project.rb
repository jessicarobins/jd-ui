class Project < ActiveRecord::Base
    has_many :specs, dependent: :destroy
    belongs_to :created_by, class_name: "User"
    validates_presence_of :name
    validates_uniqueness_of :name
end
