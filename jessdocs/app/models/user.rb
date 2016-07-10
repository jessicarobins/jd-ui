class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User
  
  devise :omniauthable
  
  belongs_to :organization
  
  before_create :set_up_user
  
  private
    def set_up_user
      #devise stuff
      self.uid = SecureRandom.uuid
      skip_confirmation!
    
      #set org
      domain = self.email.split('@')
      org = Organization.find_by(:domain => domain)
      self.organization_id = org ? org.id : nil
    end
end
