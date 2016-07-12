class Tag < ActiveRecord::Base
    acts_as_paranoid
    
    belongs_to :spec
    belongs_to :tag_type
    
    validates_presence_of :spec_id
    validates_presence_of :tag_type_id
    validates_as_paranoid
    validates_uniqueness_of_without_deleted :spec_id, :scope => :tag_type_id
    
    def name
        TagType.find(tag_type_id).name
    end
    
    def color
        TagType.find(tag_type_id).color
    end
    
    def to_hash
    {
        :id => self.id,
        :name => self.name,
        :color => self.color
     }
    end
end
