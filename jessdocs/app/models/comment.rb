class Comment < ActiveRecord::Base
    has_ancestry
    
    belongs_to :spec
    belongs_to :user
    
    validates_presence_of :spec_id
    validates_presence_of :user_id
    validates_presence_of :text
    
    default_scope { order(created_at: :asc) }
    scope :by_resolved, -> { all.group_by(&:resolved) }
end
