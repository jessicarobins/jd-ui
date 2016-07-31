class Project < ActiveRecord::Base
    has_many :specs, dependent: :destroy
    belongs_to :created_by, class_name: "User"
    belongs_to :organization
    
    validates_presence_of :name
    validates_presence_of :organization_id
    
    default_scope { order('lower(name)') }
    scope :for_user, -> (user) { where(:created_by => user) }
    scope :for_org, -> (org_id) { where(:organization_id => org_id) }
end