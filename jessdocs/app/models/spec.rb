class Spec < ActiveRecord::Base
    
    before_save :format
    
    alias_attribute :name, :description
    
    validates_presence_of :description
    validates_presence_of :project_id
    validates_presence_of :bookmarked
    validates_presence_of :spec_order
    
    private
        def format
            self.name.downcase!
            self.name.squish!
        end
end
