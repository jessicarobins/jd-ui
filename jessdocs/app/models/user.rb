class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User
  
  devise :omniauthable
  
  validates_uniqueness_of :email
  
  has_many :user_organizations
  has_many :organizations, through: :user_organizations
  
  before_create :set_up_user
  after_create :add_user_defaults
  
  def personal_org
    self.organizations.where(:name => 'Personal').first
  end
  
  private
    def set_up_user
      #devise stuff
      skip_confirmation!
    end
    
    def add_user_defaults
      create_default_project
      create_personal_org
      add_domain_org
    end
    
    def create_default_project
      Project.create!(:name => 'Demo Project', :created_by_id => self.id)
    end
    
    def create_personal_org
      org = Organization.create!(:name => 'Personal')
      self.organizations << org
    end
    
    def add_domain_org
      domain = self.email.split('@')
      org = Organization.find_by(:domain => domain)
      if org
        self.organizations << org
      end
    end
end
