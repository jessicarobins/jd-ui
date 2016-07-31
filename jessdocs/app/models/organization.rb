# organization
# name          string
# domain        string
# created_at    datetime
# updated_at    datetime

class Organization < ActiveRecord::Base
  resourcify
  
  has_many :user_organizations
  has_many :users, through: :user_organizations
  has_many :tag_types
  has_many :tag_type_groups
  has_many :projects
  
  validates_uniqueness_of :domain, allow_nil: true, allow_blank: true
  
  after_create :create_default_project
  
  private
    def create_default_project
      Project.create!(:name => 'Demo Project', :organization_id => self.id)
    end
end