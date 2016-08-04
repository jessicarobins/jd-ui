class Comment < ActiveRecord::Base
    has_ancestry
    
    belongs_to :spec
    belongs_to :user
    
    validates_presence_of :spec_id
    validates_presence_of :user_id
    validates_presence_of :text
    
    default_scope { order(:resolved, created_at: :desc) }
end
