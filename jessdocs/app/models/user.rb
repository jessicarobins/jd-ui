class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User
  
  devise :omniauthable
  
  validates_uniqueness_of :email
  
  belongs_to :organization
  
  before_create :set_up_user
  
  private
    def set_up_user
      #devise stuff
      skip_confirmation!
    
      #set org
      domain = self.email.split('@')
      org = Organization.find_by(:domain => domain)
      #todo: set this with has_and_belongs_to_many
      # self.organization_id = org ? org.id : nil
    end
end
