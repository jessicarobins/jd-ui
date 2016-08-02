class User < ActiveRecord::Base
  rolify
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
      create_personal_org
      add_domain_org
    end
    
    def create_personal_org
      org = Organization.create!(:name => 'Personal')
      self.organizations << org
      
      user.add_role :write, org
      
      Project.create!(
        :name => 'Demo Project', 
        :organization_id => org.id,
        :created_by_id => self.id)
    end
    
    def add_domain_org
      domain = self.email.split('@')
      org = Organization.find_by(:domain => domain)
      if org
        self.organizations << org
        
        user.add_role :read, org
      end
    end
end
